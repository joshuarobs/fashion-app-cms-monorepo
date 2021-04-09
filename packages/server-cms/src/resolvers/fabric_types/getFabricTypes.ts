import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getFabricTypes() {
  try {
    const data = await client.query({
      query: gql`
        query getFabricTypes {
          fabric_types(order_by: { id: asc }) {
            id
            name
          }
        }
      `,
    });
    return data.data.fabric_types;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getFabricTypes };
