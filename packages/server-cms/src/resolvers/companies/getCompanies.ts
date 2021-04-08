import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import {
  Data_Entry_Query_Amount_Max_Limit,
  Data_Entry_Query_Amount_Min_Standard,
} from '../../settings';

async function getCompanies(
  limit = Data_Entry_Query_Amount_Min_Standard,
  offset: number
) {
  if (limit > Data_Entry_Query_Amount_Max_Limit)
    limit = Data_Entry_Query_Amount_Max_Limit;

  try {
    const data = await client.query({
      query: gql`
        query getCompanies($limit: Int, $offset: Int) {
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
      variables: {
        limit,
        offset,
      },
    });
    return data.data.companies;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getCompanies };
