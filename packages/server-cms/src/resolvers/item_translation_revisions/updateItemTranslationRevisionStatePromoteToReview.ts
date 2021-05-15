import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function updateItemTranslationRevisionStatePromoteToReview(id: string) {
  try {
    const data = await client.query({
      query: gql`
        mutation updateItemTranslationRevisionStatePromoteToReview($id: uuid!) {
          update_item_translation_revisions_by_pk(
            pk_columns: { id: $id }
            _set: { state: Review }
          ) {
            id
            item_id
            locale_code
            revision
            state
          }
        }
      `,
      variables: {
        id,
      },
    });
    return data.data.update_item_translation_revisions_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateItemTranslationRevisionStatePromoteToReview };
