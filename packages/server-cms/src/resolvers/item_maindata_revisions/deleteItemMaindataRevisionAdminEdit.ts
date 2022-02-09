import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import {
  DataChangeType,
  DataState,
  ItemType,
  Gender,
} from '@joshuarobs/clothing-framework';
import { getItemMaindataRevision } from './getItemMaindataRevision';

/**
 * A function intended for deleting a single Item Maindata Revision and any
 * dependents (e.g. Maindata, activities, etc.). Usually only called by
 * the admins for testing or fixing purposes as deleting a whole revision
 * isn't advised.
 *
 * This function should function similar to
 * `deleteItemMaindataRevisionsForItem` but that deletes all of an item's
 * revisions, and that function is called from the settings tab.
 * @param id
 * @param loggerPrefix
 */
async function deleteItemMaindataRevisionAdminEdit(
  id: string,
  loggerPrefix = ''
) {
  logger.info(
    `graphql > deleteItemMaindataRevisionAdminEdit() :: args: id: ${id}`
  );
  const userId = 1;

  try {
    /*
     * ============================================================
     * 1. Check the user's permissions
     * ============================================================
     */
    // TODO: Ensure that the current user token (not a passed in id since it
    //  can be frauded) has enough permissions to do this action

    /*
     * ============================================================
     * 2. Get the item maindata revision itself
     * ============================================================
     */
    // Somehow we can't abstract the code below into a reusable function and
    // we can only paste it in here as is (without reusing)
    // The line below doesn't work, even though we are calling the same
    // function code (const data = await client.query...)
    // const data2 = await getItemMaindataRevision(id);
    const data2 = await client.query({
      query: gql`
        query getItemMaindataRevision($id: uuid!) {
          item_maindata_revisions_by_pk(id: $id) {
            id
            item_id
            state
            revision
            item_maindata(order_by: { is_release: desc }) {
              id
              is_release
              name
              for_gender
              brand_id
              clothing_shell_id
              item_family_id
              revision_id
              short_id
              type
            }
          }
        }
      `,
      variables: {
        id,
      },
      fetchPolicy: 'network-only',
    });
    // console.log('data2:', data2.data.item_maindata_revisions_by_pk);
    const itemId = data2.data.item_maindata_revisions_by_pk.item_id;
    // console.log('itemId:', itemId);
    // return null;

    // This is so we can use it later to update the item's updated_at or do
    // anything else with the id (e.g. log it that we did such an admin
    // action with this related item, by x user on y time & date)

    /*
     * ============================================================
     * 3. Delete the maindata
     * ============================================================
     */
    const data3 = await client.mutate({
      mutation: gql`
        mutation deleteItemMaindataByItsRevisionId($id: uuid!) {
          delete_item_maindata(where: { revision_id: { _eq: $id } }) {
            returning {
              id
              name
            }
          }
        }
      `,
      variables: { id },
    });

    /*
     * ============================================================
     * 4. Delete the maindata revision changes
     * ============================================================
     */
    const data4 = await client.mutate({
      mutation: gql`
        mutation deleteItemMaindataRevisionChangesByRevisionId($id: uuid!) {
          delete_item_maindata_revision_changes(
            where: { item_maindata_revision_id: { _eq: $id } }
          ) {
            returning {
              id
            }
          }
        }
      `,
      variables: { id },
    });

    /*
     * ============================================================
     * 5. Delete the maindata revision
     * ============================================================
     */
    const data5 = await client.mutate({
      mutation: gql`
        mutation deleteItemMaindataRevision($id: uuid!) {
          delete_item_maindata_revisions_by_pk(id: $id) {
            id
          }
        }
      `,
      variables: { id },
    });

    /*
     * ============================================================
     * 6. Update the item updated_at
     * ============================================================
     */
    const data6 = await client.mutate({
      mutation: gql`
        mutation updateItemUpdatedAt($id: Int!) {
          update_items_by_pk(
            pk_columns: { id: $id }
            _set: { updated_at: "now()" }
          ) {
            updated_at
            id
          }
        }
      `,
      variables: {
        id: itemId,
      },
    });

    /*
     * ============================================================
     * Return the result
     * ============================================================
     */
    logger.info(
      `${loggerPrefix}graphql > deleteItemMaindataRevisionAdminEdit() :: Successfully returned data`
    );
    return data5.data.delete_item_maindata_revisions_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteItemMaindataRevisionAdminEdit };
