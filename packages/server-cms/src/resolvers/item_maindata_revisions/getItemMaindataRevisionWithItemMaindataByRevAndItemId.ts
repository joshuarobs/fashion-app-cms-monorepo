import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Obtains an Item Maindata Revision, and it's Item Maindata.
 *
 * This is for the item page, where an item's revision is loaded.
 * @param itemId
 * @param revision
 */
async function getItemMaindataRevisionWithItemMaindataByRevAndItemId(
  itemId: number,
  revision: number
) {
  try {
    const data = await client.query({
      query: gql`
        query getItemMaindataRevisionWithItemMaindataByRevAndItemId(
          $itemId: Int!
          $revision: Int!
        ) {
          item_maindata_revisions(
            where: { item_id: { _eq: $itemId }, revision: { _eq: $revision } }
            limit: 1
          ) {
            id
            item_id
            revision
            state
            item_maindata(order_by: { is_release: desc }) {
              id
              is_release
              name
              type
              brand_id
              for_gender
              brand {
                id
                logo_url
                name
                counts {
                  id
                  item_count
                }
              }
              clothing_shell_id
              clothing_shell {
                id
                # name
                counts {
                  id
                  item_count
                }
                clothing_shell_maindata_revisions(
                  limit: 1
                  order_by: { revision: desc }
                ) {
                  id
                  revision
                  clothing_shell_maindata(
                    limit: 1
                    order_by: { is_release: desc }
                  ) {
                    id
                    is_release
                    name
                    uniform_thickness
                    default_shell_layer_id
                    default_fill_layer_id
                    default_lining_layer_id
                    default_interlining_layer_id
                    item_type
                    clothing_segment_data {
                      id
                      right_sleeve_start_front
                      right_sleeve_end_front
                      right_sleeve_start_back
                      right_sleeve_end_back
                      left_sleeve_start_front
                      left_sleeve_end_front
                      left_sleeve_start_back
                      left_sleeve_end_back
                      right_body_start_front
                      right_body_end_front
                      right_body_start_back
                      right_body_end_back
                      left_body_start_front
                      left_body_end_front
                      left_body_start_back
                      left_body_end_back
                      sleeves_is_symmetrical
                      sleeves_front_back_is_same
                      body_is_symmetrical
                      body_front_back_is_same
                    }
                  }
                }
              }
              made_in_id
              made_in {
                value
                description
              }
            }
          }
        }
      `,
      variables: {
        itemId,
        revision,
      },
      fetchPolicy: 'network-only',
    });
    return data.data.item_maindata_revisions;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getItemMaindataRevisionWithItemMaindataByRevAndItemId };
