import { client } from '../graphql-client';
import { gql } from 'apollo-server-express';
import { logger } from '../logger';

async function getBaseColours() {
  try {
    const data = await client.query({
      query: gql`
        query getBaseColours {
          base_colours {
            value
            description
          }
        }
      `,
    });
    return data.data.base_colours;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getBaseColours };
