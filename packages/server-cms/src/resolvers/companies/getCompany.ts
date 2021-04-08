import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getCompany() {
  try {
    const data = await client.query({
      query: gql`
        query getCompany($id: Int!) {
          companies_by_pk(id: $id) {
            id
            name
            logo_url
            website_url
            is_reseller
            is_affiliate
            created_at
            updated_at
            short_id
            affiliate_start_date
            founded_in_id
            founded_in {
              value
              description
            }
            counts {
              id
              item_count
            }
            #items_aggregate {
            #  aggregate {
            #    count
            #  }
            #}
            collections_aggregate {
              aggregate {
                count
              }
            }
            company_translations_aggregate(distinct_on: locale_code) {
              aggregate {
                count
              }
            }
          }
        }
      `,
    });
    return data.data.companies_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getCompany };
