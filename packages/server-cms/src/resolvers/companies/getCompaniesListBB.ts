import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { Data_Entry_Query_Amount_Max_Limit } from '../../settings';

async function getCompaniesListBB(limit: number, offset: number) {
  if (limit > Data_Entry_Query_Amount_Max_Limit)
    limit = Data_Entry_Query_Amount_Max_Limit;

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
      fetchPolicy: 'network-only',
    });
    // console.log('data:', data);
    return data.data.companies;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getCompaniesListBB };
