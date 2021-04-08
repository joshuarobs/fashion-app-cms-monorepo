import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getMaterials() {
  try {
    const data = await client.query({
      query: gql`
        query getMaterials {
          materials(order_by: { id: asc }) {
            id
            name
          }
        }
      `,
    });
    return data.data.materials;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getMaterials };
