/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { deleteItemTranslationsForItem } from '../item_translations/deleteItemTranslationsForItem';
import { deleteItemTranslationRevisionsForItem } from '../item_translation_revisions/deleteItemTranslationRevisionsForItem';
import { deleteItemMaindataRevisionChangesForItem } from '../item_maindata_revision_changes/deleteItemMaindataRevisionChangesForItem';
import { deleteItemMaindataForItem } from '../item_maindata/deleteItemMaindataForItem';
import { deleteItemMaindataRevisionsForItem } from '../item_maindata_revisions/deleteItemMaindataRevisionsForItem';
import { deleteItemByPk } from './deleteItemByPk';

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
    // console.log('data2:', data2);

    /*
     * 3. Delete translations
     */
    const data3 = await deleteItemTranslationsForItem(id);
    // console.log('data3:', data3);

    /*
     * 4. Delete translations revisions
     */
    const data4 = await deleteItemTranslationRevisionsForItem(id);
    // console.log('data4:', data4);

    /*
     * 5. Delete maindata revision changes
     */
    const data5 = await deleteItemMaindataRevisionChangesForItem(id);

    /*
     * 6. Delete maindata
     */
    const data6 = await deleteItemMaindataForItem(id);

    /*
     * 7. Delete maindata revisions
     */
    const data7 = await deleteItemMaindataRevisionsForItem(id);

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
    const data11 = await deleteItemByPk(id);
    console.log('data11:', data11);
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
