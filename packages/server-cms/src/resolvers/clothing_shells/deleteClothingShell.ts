/* eslint-disable @typescript-eslint/no-unused-vars */
import { logger } from '../../logger';
import { deleteItemTranslationRevisionChangesForItem } from '../item_translation_revision_changes/deleteItemTranslationRevisionChangesForItem';
import { deleteItemTranslationsForItem } from '../item_translations/deleteItemTranslationsForItem';
import { deleteItemTranslationRevisionsForItem } from '../item_translation_revisions/deleteItemTranslationRevisionsForItem';
import { deleteItemMaindataRevisionChangesForItem } from '../item_maindata_revision_changes/deleteItemMaindataRevisionChangesForItem';
import { deleteItemMaindataForItem } from '../item_maindata/deleteItemMaindataForItem';
import { deleteItemMaindataRevisionsForItem } from '../item_maindata_revisions/deleteItemMaindataRevisionsForItem';
import { deleteClothingShellByPk } from './deleteClothingShellByPk';
import { deleteClothingShellMaindataRevisionChangesForClothingShell } from '../clothing_shell_maindata_revision_changes/deleteClothingShellMaindataRevisionChangesForClothingShell';
import { deleteClothingShellMaindataForClothingShell } from '../clothing_shell_maindata/deleteClothingShellMaindataForClothingShell';
import { deleteClothingShellMaindataRevisionsForClothingShell } from '../clothing_shell_maindata_revisions/deleteClothingShellMaindataRevisionsForClothingShell';
import { deleteClothingShellCountsForClothingShell } from '../clothing_shell_counts/deleteClothingShellCountsForClothingShell';

/**
 * Deletes an Item entry with all of it's required dependent rows
 * (maindata revisions, maindata, revision changes, etc.).
 *
 * This will typically be called from the Settings tab, or on the Item's
 * list page, usually as an admin action.
 * @param id
 */
async function deleteClothingShell(id: number) {
  try {
    logger.info(`graphql > deleteClothingShell() :: args: id: ${id}`);

    /*
     * 1. Check for user permission
     */

    /*
     * 2. Delete maindata revision changes
     */
    const data2 =
      await deleteClothingShellMaindataRevisionChangesForClothingShell(id);

    /*
     * 3. Delete maindata
     */
    const data3 = await deleteClothingShellMaindataForClothingShell(id);

    /*
     * 4. Delete maindata revisions
     */
    const data4 = await deleteClothingShellMaindataRevisionsForClothingShell(
      id
    );

    // 2-D. Update the company's unique item count
    // (Won't be possible) Go through all the revision's possible brands and
    // update their counts
    // Instead, look through and find the latest most production revision
    // and use that brand
    // if (brand_id) {
    //   await getProductionItemCountForCompany({
    //     variables: {
    //       id: brand_id,
    //     },
    //   });
    // }
    // 2-E. Update the clothing shell's unique item count
    // if (
    //   dataProdClothingShellMaindataRev
    //     .getAllClothingShellMaindataRevisionsForClothingShell[0]
    // ) {
    //   await getItemCountForClothingShell({
    //     variables: {
    //       id: dataProdClothingShellMaindataRev
    //         .clothing_shell_maindata_revisions[0].item_maindata[0]
    //         .clothing_shell_id,
    //     },
    //   });
    // }

    /*
     * 5. Delete Clothing Shell Counts
     */
    const data5 = await deleteClothingShellCountsForClothingShell(id);

    /*
     * 6. Delete Clothing Shell
     */
    const data6 = await deleteClothingShellByPk(id);
    console.log('data6:', data6);
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
     * ============================================================
     * Return the result
     * ============================================================
     */
    logger.info(
      `graphql > deleteClothingShell() :: Successfully returned data`
    );
    return data6;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteClothingShell };
