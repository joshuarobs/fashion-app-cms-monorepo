/* eslint-disable @typescript-eslint/no-unused-vars */
import { logger } from '../../logger';
import { deleteItemTranslationRevisionChangesForItem } from '../item_translation_revision_changes/deleteItemTranslationRevisionChangesForItem';
import { deleteItemTranslationsForItem } from '../item_translations/deleteItemTranslationsForItem';
import { deleteItemTranslationRevisionsForItem } from '../item_translation_revisions/deleteItemTranslationRevisionsForItem';
import { deleteItemMaindataRevisionChangesForItem } from '../item_maindata_revision_changes/deleteItemMaindataRevisionChangesForItem';
import { deleteItemMaindataForItem } from '../item_maindata/deleteItemMaindataForItem';
import { deleteItemMaindataRevisionsForItem } from '../item_maindata_revisions/deleteItemMaindataRevisionsForItem';
import { deleteItemByPk } from './deleteItemByPk';
import { deleteItemGlobalMediaRevisionChangesForItem } from '../item_global_media_revision_changes/deleteItemGlobalMediaRevisionChangesForItem';
import { deleteItemGlobalMediaForItem } from '../item_global_media/deleteItemGlobalMediaForItem';
import { deleteItemGlobalMediaRevisionsForItem } from '../item_global_media_revisions/deleteItemGlobalMediaRevisionsForItem';
import { deleteItemAndMediaItemAssociatedForItemId } from '../item_and_media_item_associated/deleteItemAndMediaItemAssociatedForItemId';

/**
 * Deletes an Item entry with all of it's required dependent rows
 * (maindata revisions, maindata, revision changes, etc.).
 *
 * This will typically be called from the Settings tab, or on the Item's
 * list page, usually as an admin action.
 * @param id - The id of the item to delete
 * @param context - Apollo context
 */
async function deleteItem(id: number, context?: any) {
  try {
    logger.info(
      `graphql > deleteItem() :: args: id: ${id} | context: ${JSON.stringify(
        context,
        null,
        2
      )}`
    );

    /*
     * ============================================================
     * 1. Check for user permission
     * ============================================================
     */

    /*
     * ============================================================
     * 2. Delete translations revision changes
     * ============================================================
     */
    const data2 = await deleteItemTranslationRevisionChangesForItem(id);
    // console.log('data2:', data2);

    /*
     * ============================================================
     * 3. Delete translations
     * ============================================================
     */
    const data3 = await deleteItemTranslationsForItem(id);
    // console.log('data3:', data3);

    /*
     * ============================================================
     * 4. Delete translations revisions
     * ============================================================
     */
    const data4 = await deleteItemTranslationRevisionsForItem(id);
    // console.log('data4:', data4);

    /*
     * ============================================================
     * 5. Delete maindata revision changes
     * ============================================================
     */
    const data5 = await deleteItemMaindataRevisionChangesForItem(id);

    /*
     * ============================================================
     * 6. Delete maindata
     * ============================================================
     */
    const data6 = await deleteItemMaindataForItem(id);

    /*
     * ============================================================
     * 7. Delete maindata revisions
     * ============================================================
     */
    const data7 = await deleteItemMaindataRevisionsForItem(id);

    /*
     * ============================================================
     * 8. Delete global media revision changes
     * ============================================================
     */
    const data8 = await deleteItemGlobalMediaRevisionChangesForItem(id);

    /*
     * ============================================================
     * 9. Delete global media
     * ============================================================
     */
    const data9 = await deleteItemGlobalMediaForItem(id);

    /*
     * ============================================================
     * 10. Delete global media revisions
     * ============================================================
     */
    const data10 = await deleteItemGlobalMediaRevisionsForItem(id);
    console.log('data10:', data10);

    /*
     * ============================================================
     * 11. Delete all associated media
     * ============================================================
     */
    const data11 = await deleteItemAndMediaItemAssociatedForItemId(id, context);
    console.log('data11:', data11);

    /*
     * ============================================================
     * 8. Update the company's unique item count
     * ============================================================
     */
    // (Won't be possible) Go through all the revision's possible brands and
    // update their counts
    // Instead, look through and find the latest most production revision
    // and use that brand

    /*
     * ============================================================
     * 9. Update the clothing shell's unique item count
     * ============================================================
     */

    /*
     * ============================================================
     * 10. Delete settings
     * ============================================================
     */

    /*
     * ============================================================
     * 11. Delete Item
     * ============================================================
     */
    const data20 = await deleteItemByPk(id);
    console.log('data20:', data20);
    // TODO: We can put the code inside `getItemCountForClothingShell` but
    //  then we get callback hell with lots of duplicates of function calls,
    //  since if statements dont play nicely. For now, deleting an item will
    //  not update the clothing shell count, as we need to refactor this
    //  code for a server

    /*
     * ============================================================
     * Return the result
     * ============================================================
     */
    logger.info(`graphql > deleteItem() :: Successfully returned data`);
    return data11.data.delete_items_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteItem };
