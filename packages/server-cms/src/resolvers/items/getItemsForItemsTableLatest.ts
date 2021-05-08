import { client } from '../../graphql-client';
import { gql } from 'apollo-server-express';
import { logger } from '../../logger';
import {
  Data_Entry_Query_Amount_Max_Limit,
  Data_Entry_Query_Amount_Min_Standard,
} from '../../settings';

async function getItemsForItemsTableLatest(limit: number) {
  if (!limit) limit = Data_Entry_Query_Amount_Min_Standard;
  if (limit > Data_Entry_Query_Amount_Max_Limit)
    limit = Data_Entry_Query_Amount_Max_Limit;

  try {
    const data = await client.query({
      query: gql`
        query getItemsForItemsTableLatest($limit: Int) {
          items(order_by: { updated_at: desc }, limit: $limit) {
            id
            short_id
            updated_at
            item_maindata_revisions_aggregate {
              aggregate {
                count
              }
            }
            latest_revision: item_maindata_revisions(
              order_by: { revision: desc }
              limit: 1
            ) {
              id
              revision
              state
              item_maindata(order_by: { is_release: desc }, limit: 1) {
                id
                name
                clothing_shell_id
                brand {
                  id
                  name
                }
                clothing_shell {
                  id
                  clothing_shell_maindata_revisions(
                    where: { state: { _eq: Production } }
                    order_by: { revision: desc }
                    limit: 1
                  ) {
                    id
                    revision
                    clothing_shell_maindata(
                      order_by: { is_release: desc }
                      limit: 1
                    ) {
                      id
                      name
                      clothing_segment_data_id
                      default_shell_layer_id
                      default_fill_layer_id
                      default_lining_layer_id
                      clothing_segment_data {
                        id
                        left_body_end_back
                        left_body_end_front
                        left_body_start_back
                        left_body_start_front
                        left_sleeve_end_back
                        left_sleeve_end_front
                        left_sleeve_start_back
                        left_sleeve_start_front
                        right_body_end_back
                        right_body_end_front
                        right_body_start_back
                        right_body_start_front
                        right_sleeve_end_back
                        right_sleeve_end_front
                        right_sleeve_start_back
                        right_sleeve_start_front
                      }
                    }
                  }
                }
              }
            }
            latest_prod: item_maindata_revisions(
              where: { state: { _eq: Production } }
              order_by: { revision: desc }
              limit: 1
            ) {
              id
              revision
              state
              item_maindata(order_by: { is_release: desc }, limit: 1) {
                id
                name
                clothing_shell_id
                brand {
                  id
                  name
                }
                clothing_shell {
                  id
                  clothing_shell_maindata_revisions(
                    where: { state: { _eq: Production } }
                    order_by: { revision: desc }
                    limit: 1
                  ) {
                    id
                    clothing_shell_maindata(
                      order_by: { is_release: desc }
                      limit: 1
                    ) {
                      id
                      name
                      clothing_segment_data_id
                      default_shell_layer_id
                      default_fill_layer_id
                      default_lining_layer_id
                      clothing_segment_data {
                        id
                        left_body_end_back
                        left_body_end_front
                        left_body_start_back
                        left_body_start_front
                        left_sleeve_end_back
                        left_sleeve_end_front
                        left_sleeve_start_back
                        left_sleeve_start_front
                        right_body_end_back
                        right_body_end_front
                        right_body_start_back
                        right_body_start_front
                        right_sleeve_end_back
                        right_sleeve_end_front
                        right_sleeve_start_back
                        right_sleeve_start_front
                      }
                    }
                    revision
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        limit,
      },
      fetchPolicy: 'network-only',
    });
    // logger.trace(JSON.stringify(data.data, null, 2));
    // console.log('data.data:', JSON.stringify(data.data, null, 2));
    return data.data.items;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getItemsForItemsTableLatest };
