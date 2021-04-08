import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function deleteCompanyTranslationRevisionChangesForRevision() {
  try {
    const data = await client.query({
      query: gql`
        mutation deleteCompanyTranslationRevisionChangesForRevision(
          $id: uuid!
        ) {
          delete_company_translation_revision_changes(
            where: { company_translation_revision_id: { _eq: $id } }
          ) {
            returning {
              id
              date
              change_type
              action
              to_state
              company_translation_revision_id
              user_id
            }
          }
        }
      `,
    });
    return data.data.delete_company_translation_revision_changes;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteCompanyTranslationRevisionChangesForRevision };
