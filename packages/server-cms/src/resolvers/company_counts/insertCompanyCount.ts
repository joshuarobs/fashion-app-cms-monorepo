import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function insertCompanyCount() {
  try {
    const data = await client.query({
      query: gql`
        mutation insertCompanyCount($companyId: Int!) {
          insert_company_counts_one(object: { company_id: $companyId }) {
            id
            company_id
            item_count
          }
        }
      `,
    });
    return data.data.insert_company_counts_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertCompanyCount };
