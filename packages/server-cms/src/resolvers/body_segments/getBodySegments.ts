import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getBodySegments() {
  try {
    const data = await client.query({
      query: gql`
        query getBodySegments {
          body_segments(order_by: { id: asc }) {
            id
            name
            body_group
          }
        }
      `,
    });
    return data.data.body_segments;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getBodySegments };
