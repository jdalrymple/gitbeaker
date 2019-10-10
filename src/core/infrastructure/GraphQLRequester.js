import { GraphQLClient } from 'graphql-request'
import { Requester } from '.';

export GraphQLRequester = {
  async gqlQuery(service, endpoint, query) {
    let search = query;
    
    if (typeof query !== 'string') search = JSON.stringify(query);
    
    const client = new GraphQLClient(service.url + endpoint, {
      headers: service.headers
    });
    
    try {
      return client.request(search);
    } catch (e) {
      if (e.response) {
        const output = await e.response.json();

        e.description = output.error || output.message;
      }

      throw e;
    }
  }
} as Requester;
