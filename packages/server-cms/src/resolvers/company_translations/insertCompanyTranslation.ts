import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function insertCompanyTranslation() {
  try {
    const data = await client.query({
      query: gql`
        mutation insertCompanyTranslation(
          $revision_id: uuid!
          $is_release: Boolean!
          $stylised_name: String!
          $short_name: String!
          $bio: String
        ) {
          insert_company_translations_one(
            object: {
              revision_id: $revision_id
              is_release: $is_release
              stylised_name: $stylised_name
              short_name: $short_name
              bio: $bio
            }
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
    return data.data.insert_company_translations_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertCompanyTranslation };
