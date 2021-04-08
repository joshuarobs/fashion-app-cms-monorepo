import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function updateCompanyTranslation() {
  try {
    const data = await client.query({
      query: gql`
        mutation updateCompanyTranslation(
          $id: uuid!
          $changes: company_translations_set_input
        ) {
          update_company_translations_by_pk(
            pk_columns: { id: $id }
            _set: $changes
          ) {
            id
            revision_id
            is_release
            stylised_name
            short_name
            bio
          }
        }
      `,
    });
    return data.data.update_company_translations_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateCompanyTranslation };
