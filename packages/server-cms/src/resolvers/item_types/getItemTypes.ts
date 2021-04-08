import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getItemTypes() {
  try {
    const data = await client.query({
      query: gql`
        query getItemTypes {
          item_types(order_by: { value: desc }) {
            value
            description
          }
        }
      `,
    });
    return data.data.item_types;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getItemTypes };
