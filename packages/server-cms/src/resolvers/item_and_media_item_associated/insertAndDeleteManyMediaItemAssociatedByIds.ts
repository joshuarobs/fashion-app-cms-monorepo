import { gql } from '@apollo/client';
import _ from 'lodash';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { getItemBaseDataByPk } from '../items/getItemBaseDataByPk';
import { getMediaItemByPk } from '../media_items/getMediaItemByPk';
import { insertItemAndMediaItemAssociatedOne } from './insertItemAndMediaItemAssociatedOne';
import { deleteItemAndMediaItemAssociatedByPk } from './deleteItemAndMediaItemAssociatedByPk';
import { getItemAndMediaItemAssociatedForItemId } from './getItemAndMediaItemAssociatedForItemId';

/**
 * This function will take an item's id, and a list of media item ids. It
 * will then obtain the current list of relationship table data, and get the
 * difference. Rows that have their id not present in the given array, will
 * be removed. If a media id doesn't have a row inserted, then a new one
 * will be inserted. Rows that have the id present and already exist, will
 * have no change done to them.
 *
 * For use in the Localisations Dashboard tab.
 * @param item_id - The id of the item we are editing this for
 * @param media_item_ids - An array of the new client side-saved media items ids
 * @param context - Apollo context
 * @param loggerPrefix
 */
async function insertAndDeleteManyMediaItemAssociatedByIds(
  item_id: number,
  media_item_ids: string[],
  context: any,
  loggerPrefix = ''
) {
  logger.info(
    `${loggerPrefix}graphql > insertAndDeleteManyMediaItemAssociatedByIds() :: args: item_id: ${item_id} | media_item_ids: ${media_item_ids} | context: ${context}`
  );

  try {
    /*
     * ============================================================
     * 1. Get user permissions
     * ============================================================
     */

    /*
     * ============================================================
     * 2. Get the item
     * ============================================================
     */
    // Check that the item_id is a valid id with an inserted row
    const data2 = await getItemBaseDataByPk(item_id);
    console.log('data2:', data2);

    if (!data2) {
      logger.info(
        `${loggerPrefix}graphql > insertAndDeleteManyMediaItemAssociatedByIds() :: No item found given item_id: ${item_id}`
      );
      return null;
    }

    /*
     * ============================================================
     * 3. Get the diff of the current ids list and
     *    the argument ids
     * ============================================================
     */
    const currentIds = data2.item_and_media_item_associations.map(
      ({ media_item_id }: any) => media_item_id
    );
    console.log('currentIds:', currentIds);

    const idsToAdd = _.differenceWith(media_item_ids, currentIds);
    const idsToRemove = _.differenceWith(currentIds, media_item_ids);
    console.log('idsToAdd:', idsToAdd);
    console.log('idsToRemove:', idsToRemove);

    /*
     * ============================================================
     * 4. Insert any new relationships
     * ============================================================
     */
    for (const idToAdd of idsToAdd) {
      // ------------------------------------------------------------
      //  1. Ensure that the id to add is a valid media item id
      // ------------------------------------------------------------
      const data4a1 = await getMediaItemByPk(idToAdd);
      console.log('data4a1:', data4a1);
      // ------------------------------------------------------------
      //  2. Add the new relationship
      // ------------------------------------------------------------
      if (data4a1) {
        const data4a2 = await insertItemAndMediaItemAssociatedOne(
          item_id,
          idToAdd,
          context
        );
      }
    }

    /*
     * ============================================================
     * 5. Remove any obsolete relationships
     * ============================================================
     */
    for (const idToRemove of idsToRemove) {
      // ------------------------------------------------------------
      //  1. Ensure that the id to add is a valid media item id
      // ------------------------------------------------------------
      const data5a1 = await getMediaItemByPk(idToRemove);
      console.log('data4a1:', data5a1);
      // ------------------------------------------------------------
      //  2. Add the new relationship
      // ------------------------------------------------------------
      if (data5a1) {
        // console.log('to remove');
        const data5a2 = await deleteItemAndMediaItemAssociatedByPk(
          item_id,
          idToRemove,
          context
        );
      }
    }

    /*
     * ============================================================
     * 6. Add an activity change
     * ============================================================
     */

    /*
     * ============================================================
     * 7. Get the item's new associated media ids
     * ============================================================
     */

    const data7 = await getItemAndMediaItemAssociatedForItemId(item_id, 0, 0);
    console.log('data7:', data7);

    // const data = await client.mutate({
    //   mutation: gql`
    //     mutation insertItemMaindataRevisionChange(
    //       $revision_id: uuid!
    //       $change_type: data_change_types_enum!
    //       $to_state: data_states_enum
    //       $action: data_actions_enum
    //       $user_id: Int!
    //     ) {
    //       insert_item_maindata_revision_changes_one(
    //         object: {
    //           item_maindata_revision_id: $revision_id
    //           change_type: $change_type
    //           to_state: $to_state
    //           action: $action
    //           user_id: $user_id
    //         }
    //       ) {
    //         id
    //         date
    //         action
    //         change_type
    //         to_state
    //         item_maindata_revision_id
    //         user_id
    //       }
    //     }
    //   `,
    //   variables: {
    //     revision_id,
    //     user_id,
    //     change_type,
    //     to_state,
    //     // action: DATA_ACTIONS.CREATE
    //   },
    // });

    /*
     * ============================================================
     * Return the result
     * ============================================================
     */
    logger.info(
      `${loggerPrefix}graphql > insertAndDeleteManyMediaItemAssociatedByIds() :: Successfully returned data`
    );
    // return true;
    if (idsToAdd || idsToRemove) {
      return data7;
    } else {
      return null;
    }
    // return data.data.insert_item_maindata_revision_changes_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertAndDeleteManyMediaItemAssociatedByIds };
