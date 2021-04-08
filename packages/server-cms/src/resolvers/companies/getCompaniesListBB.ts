import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { Max_Limit_Data_Entry_Query_Amount } from '../../settings';

async function getCompaniesListBB(limit: number, offset: number) {
  if (limit > Max_Limit_Data_Entry_Query_Amount)
    limit = Max_Limit_Data_Entry_Query_Amount;

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
      variables: {
        limit,
        offset,
      },
    });
    // console.log('data:', data);
    return data.data.companies;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getCompaniesListBB };
