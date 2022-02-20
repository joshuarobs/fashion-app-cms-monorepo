import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Inserts a new Company Count row. To be called as part of inserting a new
 * company under the `insertCompany` function.
 * @param company_id
 */
async function insertCompanyCount(company_id: number) {
  logger.info(
    `graphql > insertCompanyCount() :: args: company_id: ${company_id}`
  );

  try {
    const data = await client.mutate({
      mutation: gql`
        mutation insertCompanyCount($company_id: Int!) {
          insert_company_counts_one(object: { company_id: $company_id }) {
            id
            company_id
            item_count
          }
        }
      `,
      variables: {
        company_id,
      },
    });
    return data.data.insert_company_counts_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertCompanyCount };
