import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { insertCompanyCount } from '../company_counts/insertCompanyCount';

/**
 * Insert a new Company entry with all of it's required dependent rows
 * (maindata revisions, maindata, revision changes, etc.)
 * @param name
 * @param website_url
 * @param is_reseller
 */
async function insertCompany(
  name: string,
  website_url: string,
  is_reseller: boolean
) {
  logger.info(
    `graphql > insertCompany() :: args: name: ${name} | website_url: ${website_url} | is_reseller: ${is_reseller}`
  );

  try {
    // 1. Get user permissions

    // 2. Insert a new company
    const data2 = await client.mutate({
      mutation: gql`
        mutation insertCompany(
          $name: String!
          $website_url: String!
          $is_reseller: Boolean!
        ) {
          insert_companies_one(
            object: {
              name: $name
              is_reseller: $is_reseller
              website_url: $website_url
            }
          ) {
            id
            name
            website_url
            is_reseller
            created_at
            updated_at
          }
        }
      `,
      variables: {
        name,
        website_url,
        is_reseller,
      },
    });
    console.log('data2:', data2);
    // 3. Insert a new company count
    const data3 = await insertCompanyCount(data2.data.insert_companies_one.id);

    // console.log(
    //   'data2.data.insert_companies_one:',
    //   data2.data.insert_companies_one
    // );
    return data2.data.insert_companies_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertCompany };
