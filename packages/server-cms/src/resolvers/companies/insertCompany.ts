import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function insertCompany() {
  try {
    const data = await client.query({
      query: gql`
        mutation insertCompany(
          $name: String!
          $isReseller: Boolean!
          $websiteUrl: String!
        ) {
          insert_companies_one(
            object: {
              name: $name
              is_reseller: $isReseller
              website_url: $websiteUrl
            }
          ) {
            id
            name
            is_reseller
            created_at
            updated_at
          }
        }
      `,
    });
    return data.data.insert_companies_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertCompany };
