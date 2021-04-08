import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function updateCompanyCount() {
  try {
    const data = await client.query({
      query: gql`
        mutation updateCompanyCount(
          $id: Int!
          $changes: company_counts_set_input
        ) {
          update_company_counts_by_pk(pk_columns: { id: $id }, _set: $changes) {
            id
            company_id
            item_count
          }
        }
      `,
    });
    return data.data.update_company_counts_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateCompanyCount };
