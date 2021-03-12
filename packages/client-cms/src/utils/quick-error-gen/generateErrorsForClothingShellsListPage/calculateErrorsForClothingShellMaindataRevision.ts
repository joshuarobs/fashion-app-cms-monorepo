import { QuickErrorSetItemsPage } from '../QuickErrorSetItemsPage';
import { clothing_shells } from '../../gql-interfaces/clothing_shells';
import { VersionablePageErrors } from '../VersionablePageErrors';

/**
 * @param errors
 * @param clothingShell
 * @param isLatestProd
 * @param isSubGroupForItem - Should we put these errors in their own group?
 * This is for the items list page, as errors will be put under a sub-group
 * under a `Maindata - Latest` or `Maindata - Revision` group. This should
 * be `false` or `null` for the clothing shells list page, because we are
 * using the `maindataLatestX` variable instead (no sub-group).
 */
function calculateErrorsForClothingShellMaindataRevision(
  errors: QuickErrorSetItemsPage,
  clothingShell: clothing_shells,
  isLatestProd: boolean,
  isSubGroupForItem?: boolean
) {
  console.log('***clothingShell:', clothingShell);
  // const { latest_prod } = clothingShell;
  const maindata_revisions = isLatestProd
    ? clothingShell.latest_prod
    : clothingShell.latest_revision;
  let errorLocation = isLatestProd
    ? errors.maindataLatestProductionRevision
    : errors.maindataLatestRevision;
  if (isSubGroupForItem) {
    errorLocation = isLatestProd
      ? errors.maindataLatestProductionRevisionClothingShells
      : errors.maindataLatestRevisionClothingShells;
  }

  if (
    (!maindata_revisions || maindata_revisions.length === 0) &&
    !isSubGroupForItem
  ) {
    errorLocation.add(
      VersionablePageErrors.Clothing_Shell_No_Maindata_Revisions
    );
  } else {
    // clothing_shell_maindata_revisions
    let clothing_shell_maindata = null;
    if (!isSubGroupForItem) {
      clothing_shell_maindata = maindata_revisions[0].clothing_shell_maindata;
    } else if (clothingShell.clothing_shell_maindata_revisions[0]) {
      clothing_shell_maindata =
        clothingShell.clothing_shell_maindata_revisions[0]
          .clothing_shell_maindata;
    }
    // const clothing_shell_maindata = !isSubGroupForItem
    //   ? maindata_revisions[0].clothing_shell_maindata
    //   : // If we are passing in an item, get the maindata directly
    //     clothingShell.clothing_shell_maindata_revisions[0]
    //       .clothing_shell_maindata;
    if (!clothing_shell_maindata || clothing_shell_maindata.length === 0) {
      errorLocation.add(VersionablePageErrors.Clothing_Shell_No_Maindata);
    } else {
      const {
        name,
        clothing_segment_data_id,
        clothing_segment_data,
        default_shell_layer_id,
        default_fill_layer_id,
        default_lining_layer_id,
        // default_interlining_layer_id,
      } = clothing_shell_maindata[0];
      console.log('clothing_shell_maindata[0]:', clothing_shell_maindata[0]);
      if (!name) {
        errorLocation.add(VersionablePageErrors.Clothing_Shell_No_Name);
      }
      // TODO: Check inside clothing segment data that each body group part
      //  has a shell layer if this is null
      if (!default_shell_layer_id) {
        errorLocation.add(
          VersionablePageErrors.Clothing_Shell_No_Shell_Fabric_Layer
        );
      } else {
        // TODO: Check inside the object to see if its contents are null
      }
      // If we have fill, check to see we have lining
      // TODO: Ensure that this also considers the clothing segment data,
      //  since we can have it set, but no default
      if (default_fill_layer_id && !default_lining_layer_id) {
        errorLocation.add(
          VersionablePageErrors.Clothing_Shell_No_Lining_Fabric_Layer
        );
      }
      if (!clothing_segment_data_id) {
        errorLocation.add(
          VersionablePageErrors.Clothing_Shell_No_Clothing_Segment_Data
        );
      } else {
        const {
          right_sleeve_start_front,
          right_sleeve_end_front,
          right_sleeve_start_back,
          right_sleeve_end_back,
          left_sleeve_start_front,
          left_sleeve_end_front,
          left_sleeve_start_back,
          left_sleeve_end_back,
          right_body_start_front,
          right_body_end_front,
          right_body_start_back,
          right_body_end_back,
          left_body_start_front,
          left_body_end_front,
          left_body_start_back,
          left_body_end_back,
          sleeves_is_symmetrical,
          sleeves_front_back_is_same,
          body_is_symmetrical,
          body_front_back_is_same,
        } = clothing_segment_data;
        // ========================================
        // Sleeves are invalid
        // ========================================
        const rightSleeveFrontValid =
          Boolean(right_sleeve_start_front) == Boolean(right_sleeve_end_front);
        const rightSleeveBackValid =
          Boolean(right_sleeve_start_back) == Boolean(right_sleeve_end_back);
        const leftSleeveFrontValid =
          Boolean(left_sleeve_start_front) == Boolean(left_sleeve_end_front);
        const leftSleeveBackValid =
          Boolean(left_sleeve_start_back) == Boolean(left_sleeve_end_back);
        if (!rightSleeveFrontValid) {
          errorLocation.add(
            VersionablePageErrors.Clothing_Segment_Data_Invalid_Right_Front_Sleeve_Bounds
          );
        }
        if (!rightSleeveBackValid) {
          errorLocation.add(
            VersionablePageErrors.Clothing_Segment_Data_Invalid_Right_Back_Sleeve_Bounds
          );
        }
        if (!leftSleeveFrontValid) {
          errorLocation.add(
            VersionablePageErrors.Clothing_Segment_Data_Invalid_Left_Front_Sleeve_Bounds
          );
        }
        if (!leftSleeveBackValid) {
          errorLocation.add(
            VersionablePageErrors.Clothing_Segment_Data_Invalid_Left_Back_Sleeve_Bounds
          );
        }
        // ========================================
        // Body is invalid
        // ========================================
        const rightBodyFrontValid =
          Boolean(right_body_start_front) == Boolean(right_body_end_front);
        const rightBodyBackValid =
          Boolean(right_body_start_back) == Boolean(right_body_end_back);
        const leftBodyFrontValid =
          Boolean(left_body_start_front) == Boolean(left_body_end_front);
        const leftBodyBackValid =
          Boolean(left_body_start_back) == Boolean(left_body_end_back);
        if (!rightBodyFrontValid) {
          errorLocation.add(
            VersionablePageErrors.Clothing_Segment_Data_Invalid_Right_Front_Body_Bounds
          );
        }
        if (!rightBodyBackValid) {
          errorLocation.add(
            VersionablePageErrors.Clothing_Segment_Data_Invalid_Right_Back_Body_Bounds
          );
        }
        if (!leftBodyFrontValid) {
          errorLocation.add(
            VersionablePageErrors.Clothing_Segment_Data_Invalid_Left_Front_Body_Bounds
          );
        }
        if (!leftBodyBackValid) {
          errorLocation.add(
            VersionablePageErrors.Clothing_Segment_Data_Invalid_Left_Back_Body_Bounds
          );
        }
      }
    }
  }
}

export { calculateErrorsForClothingShellMaindataRevision };
