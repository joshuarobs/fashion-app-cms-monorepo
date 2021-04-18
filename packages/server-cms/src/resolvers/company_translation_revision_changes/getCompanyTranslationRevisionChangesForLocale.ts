import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import {
  Data_Entry_Query_Amount_Max_Limit,
  Data_Entry_Query_Amount_Min_Half,
} from '../../settings';

async function getCompanyTranslationRevisionChangesForLocale(
  companyId: number,
  localeCode: string,
  limit = Data_Entry_Query_Amount_Min_Half,
  offset: number
) {
  if (limit > Data_Entry_Query_Amount_Max_Limit)
    limit = Data_Entry_Query_Amount_Max_Limit;

  try {
    const data = await client.query({
      query: gql`
        query getCompanyTranslationRevisionChangesForLocale(
          $companyId: Int!
          $localeCode: String!
          $limit: Int
          $offset: Int
        ) {
          company_translation_revision_changes(
            where: {
              company_translation_revision: {
                company_id: { _eq: $companyId }
                locale_code: { _eq: $localeCode }
              }
            }
            order_by: { date: desc }
            limit: $limit
            offset: $offset
          ) {
            id
            to_state
            date
            change_type
            action
            user {
              id
              name
            }
            company_translation_revision {
              id
              company_id
              revision
              locale {
                code
                name
                country {
                  description
                }
                language {
                  description
                }
              }
              company {
                id
                name
              }
            }
          }
        }
      `,
      variables: {
        companyId,
        localeCode,
        limit,
        offset,
      },
    });
    return data.data.company_translation_revision_changes;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getCompanyTranslationRevisionChangesForLocale };
