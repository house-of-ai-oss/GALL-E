import { Client, HttpConnection } from '@elastic/elasticsearch'; // 8.11.0

const elastic = new Client({
  node: process.env.ELASTIC_API_URL,
  Connection: HttpConnection,
  auth: {
    apiKey: process.env.ELASTIC_API_KEY,
  }
})

export default elastic;
