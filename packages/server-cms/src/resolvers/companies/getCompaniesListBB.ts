import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getCompaniesListBB() {
  try {
    const data = await client.query({
      query: gql`
        query getCompaniesListBB($limit: Int, $offset: Int) {
          companies(
            order_by: { updated_at: desc }
            limit: $limit
            offset: $offset
          ) {
            id
            name
            is_reseller
            is_affiliate
            logo_url
            updated_at
            counts {
              id
              item_count
            }
            item_maindata_aggregate {
              aggregate {
                count
              }
            }
            collections_aggregate {
              aggregate {
                count
              }
            }
          }
        }
      `,
    });
    return data.data.companies;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getCompaniesListBB };
