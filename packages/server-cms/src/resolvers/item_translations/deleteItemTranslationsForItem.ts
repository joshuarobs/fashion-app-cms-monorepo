import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function deleteItemTranslationsForItem() {
  try {
    const data = await client.query({
      query: gql`
        mutation deleteItemTranslationsForItem($id: Int!) {
          delete_item_translations(
            where: { revision: { item_id: { _eq: $id } } }
          ) {
            returning {
              id
            }
          }
        }
      `,
    });
    return data.data.delete_item_translations;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteItemTranslationsForItem };
