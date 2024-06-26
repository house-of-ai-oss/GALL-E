import {Hono} from "hono";
import {cors} from "hono/cors";
import {prettyJSON} from "hono/pretty-json";
import {customLLMRoute} from "./api/custom-llm";
import {functionCallRoute} from "./api/functions";
import {inboundRoute} from "./api/inbound";
import {outboundRoute} from "./api/outbound";
import {webhookRoute} from "./api/webhook";
import {Bindings} from "./types/hono.types";
import prisma from "./lib/prisma";

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", prettyJSON());
app.use("*", cors());
app.notFound((c) => c.json({message: "Not Found", ok: false}, 404));

app.get("/", async (c) => {
    const tickets = await prisma.ticket.findMany()
    return c.json(tickets);
});

app.route("/api/inbound", inboundRoute);
app.route("/api/outbound", outboundRoute);
app.route("/api/webhook", webhookRoute);

app.route("/api/functions", functionCallRoute);
app.route("/api/custom-llm", customLLMRoute);

export default {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    fetch: app.fetch,
};
