import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getClothingShell() {
  try {
    const data = await client.query({
      query: gql`
        query getClothingShell($id: Int!) {
          clothing_shells_by_pk(id: $id) {
            id
            created_at
            updated_at
          }
        }
      `,
      fetchPolicy: 'network-only',
    });
    return data.data.clothing_shells_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getClothingShell };
