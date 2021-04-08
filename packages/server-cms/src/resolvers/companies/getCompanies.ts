import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getCompanies() {
  try {
    const data = await client.query({
      query: gql`
        query getCompanies {
          companies(order_by: { updated_at: desc }, limit: 20) {
            id
            name
            is_reseller
            is_affiliate
            logo_url
            items_aggregate {
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

export { getCompanies };
