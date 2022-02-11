import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import {
  DataChangeType,
  DataState,
  ItemType,
} from '@joshuarobs/clothing-framework';
import { insertItemMaindataBarebones } from '../item_maindata/insertItemMaindataBarebones';
import { insertItemMaindataRevisionChange } from '../item_maindata_revision_changes/insertItemMaindataRevisionChange';
import { deleteItemTranslationRevisionChangesForItem } from '../item_translation_revision_changes/deleteItemTranslationRevisionChangesForItem';

/**
 * Deletes an Item entry with all of it's required dependent rows
 * (maindata revisions, maindata, revision changes, etc.).
 *
 * This will typically be called from the Settings tab, or on the Item's
 * list page, usually as an admin action.
 * @param id
 */
async function deleteItem(id: number) {
  try {
    logger.info(`graphql > deleteItem() :: args: id: ${id}`);

    /*
     * 1. Check for user permission
     */

    /*
     * 2. Delete translations revision changes
     */
    const data2 = await deleteItemTranslationRevisionChangesForItem(id);
    // const data2 = await client.mutate({
    //   mutation: gql`
    //     mutation deleteItemTranslationRevisionChangesForItem($item_id: Int!) {
    //       delete_item_translation_revision_changes(
    //         where: { item_translation_revision: { item_id: { _eq: $item_id } } }
    //       ) {
    //         returning {
    //           id
    //         }
    //       }
    //     }
    //   `,
    //   variables: { item_id: id },
    // });
    console.log('data2:', data2);

    /*
     * 3. Delete translations
     */

    /*
     * 4. Delete translations revisions
     */

    /*
     * 5. Delete maindata revision changes
     */

    /*
     * 6. Delete maindata
     */

    /*
     * 7. Delete maindata revisions
     */

    /*
     * 8. Update the company's unique item count
     */
    // (Won't be possible) Go through all the revision's possible brands and
    // update their counts
    // Instead, look through and find the latest most production revision
    // and use that brand

    /*
     * 9. Update the clothing shell's unique item count
     */

    /*
     * 10. Delete settings
     */

    /*
     * 11. Delete Item
     */
    // TODO: We can put the code inside `getItemCountForClothingShell` but
    //  then we get callback hell with lots of duplicates of function calls,
    //  since if statements dont play nicely. For now, deleting an item will
    //  not update the clothing shell count, as we need to refactor this
    //  code for a server
    // const data1 = await client.mutate({
    //   mutation: gql`
    //     mutation insertItemsOne {
    //       insert_items_one(object: {}) {
    //         id
    //         created_at
    //         updated_at
    //       }
    //     }
    //   `,
    // });
    // console.log('data1:', data1.data.insert_items_one);
    // const itemId = data1.data.insert_items_one.id;

    /*
     * 2. Insert a (Item) maindata revision
     */
    // const data2 = await client.mutate({
    //   mutation: gql`
    //     mutation insertItemMaindataRevision(
    //       $item_id: Int!
    //       $revision: Int!
    //       $state: data_states_enum
    //     ) {
    //       insert_item_maindata_revisions_one(
    //         object: { item_id: $item_id, revision: $revision, state: $state }
    //       ) {
    //         id
    //         item_id
    //         revision
    //         state
    //       }
    //     }
    //   `,
    //   variables: {
    //     item_id: itemId,
    //     revision: 1,
    //     state: DataState.Development,
    //   },
    // });
    // console.log('data2:', data2.data.insert_item_maindata_revisions_one);
    // const revisionId = data2.data.insert_item_maindata_revisions_one.id;

    /*
     * 3. Insert a (Item) maindata
     */
    // const data3 = await insertItemMaindataBarebones(
    //   revisionId,
    //   true,
    //   name,
    //   item_type
    // );
    // console.log('data3:', data3);

    /*
     * 4. Insert a (Item) maindata revision change
     */
    // const data4 = await insertItemMaindataRevisionChange(
    //   revisionId,
    //   1,
    //   DataChangeType.Promotion,
    //   DataState.Development,
    //   '--'
    // );
    // console.log('data4:', data4);

    /*
     * ============================================================
     * Return the result
     * ============================================================
     */
    logger.info(`graphql > deleteItem() :: Successfully returned data`);
    // return data1.data.insert_items_one;
    return null;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteItem };
