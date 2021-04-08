import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function updateCompany() {
  try {
    const data = await client.query({
      query: gql`
        mutation updateCompany($id: Int!, $changes: companies_set_input) {
          update_companies_by_pk(pk_columns: { id: $id }, _set: $changes) {
            id
            name
            website_url
            is_affiliate
            is_reseller
            affiliate_start_date
            logo_url
            short_id
            updated_at
            counts {
              item_count
            }
          }
        }
      `,
    });
    return data.data.update_companies_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateCompany };
