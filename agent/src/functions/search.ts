import elastic from "../lib/elastic";

export interface SearchParams {
    query: string;
}

export const search = async ({query}: SearchParams): Promise<any> => {
    console.log(`searching: ${query}`)

    try {
        // https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html#search-search-api-example
        const response = await elastic.search({
            min_score: 1,
            size: 3,
            index: "search-canton",
            query: {
                match: {
                    body_content: query
                }
            }
        });
        console.log(`${response.hits.total?.value} hits for query "${query}"`);

        const data = response.hits.hits.map((hit) => {
            const s = hit._source as any
            return {
                title: s.title as string,
                topic: s.topic as string,
                published_at: s.published_at as string,
                body: s.body_content as string
            }
        });

        return {
            result: JSON.stringify(data)
        }
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}