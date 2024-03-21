import {ConversationMessage, EndOfCallReportPayload} from "../../types/vapi.types";
import prisma from "../../lib/prisma";
import {Prisma} from "@prisma/client";
import openai from "../../lib/openai";

export const endOfCallReportHandler = async (
    payload?: EndOfCallReportPayload
): Promise<void> => {
    /**
     * Handle Business logic here.
     * You can store the information like summary, typescript, recordingUrl or even the full messages list in the database.
     */

    console.log("End of Call Report", payload);

    if (!payload?.call?.customer?.number) {
        console.error("User ID is required");
        throw new Error("User ID is required");
    }

    const data = {
        phone: payload?.call?.customer?.number
    }
    console.log("Saving call report for", data);

    try {
        const report = await prisma.call_report.create({
            data: {
                user: {connect: {phone: data.phone}},
                data: payload as Object as Prisma.JsonObject
            }
        })
        if (!report) {
            console.error("No report saved");
            return
        }
        if (payload?.messages?.length > 2) {
            await callClassification(report.id, payload.transcript);
        }
    } catch (e) {
        console.error(e);
        throw new Error("Failed to save call report");
    }

    return;
};

async function callClassification(callId: number, transcript: string) {
    console.log("Adding labels to call report", callId);
    const labels = await prisma.label.findMany()
    console.log("Labels", labels);
    // use openai function calling with transcript and enum labels
    const chatCompletion = await openai.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: `Please return appropriate classifications that suit best the provided transcript.`
            },
            {role: 'user', content: transcript}
        ],
        model: 'gpt-4-0125-preview',
        temperature: 0,
        max_tokens: 4096,
        function_call: {name: 'classifications'},
        functions: [{
            name: 'classifications',
            parameters: {
                type: 'object',
                required: ['labels'],
                properties: {
                    labels: {
                        type: 'array',
                        items: {
                            type: 'number',
                            enum: labels.map(label => label.id),
                            description:
                                `The label ids that best suit the provided transcript. If you are not sure or none really fits, you can leave it empty.
                                Labels with id and description:
            
            ${labels.map(label => `${label.id}: ${label.name} - ${label.description}`).join('\n\n')
                                }`,
                        },
                    },
                    create_ticket_func: {
                        type: 'object',
                        description: 'The function to call to create a ticket in the call agent backoffice. This must be called if the ai agent mentioned that it will forward the inquiry to a human agent. If not called the system will assume that the ai agent resolved the call without the need of human intervention.',
                        properties: {
                            description: {
                                type: 'string',
                                description: 'The description of the ticket explaining the issue that the human agent needs to solve. Note that the call transcript and a conversation summary will be automatically added to the ticket as a reference, so you do not need to include it here.'
                            }
                        }
                    }
                },
            },
        }]
    });

    console.log("Chat completion", chatCompletion);
    const object = JSON.parse(chatCompletion.choices[0].message.function_call?.arguments!);

    const labelIds: number[] = object.labels;
    if (labelIds) {
        console.log("Labels for transcript", labelIds);
        await prisma.call_report.update({
            where: {id: callId},
            data: {
                labels: {
                    connect: labelIds.map(id => ({id}))
                }
            },
        })
    } else {
        console.log("No labels for transcript");
    }

    const createTicketFunc = object.create_ticket_func;
    if (createTicketFunc) {
        console.log("Creating ticket for transcript", createTicketFunc);
        await prisma.ticket.create({
            data: {
                description: createTicketFunc.description,
                call_report_id: callId
            }
        })
    } else {
        console.log("No ticket for transcript");
    }
}