import { items } from '../../gql-interfaces/items';
import { VersionablePageErrors } from '../VersionablePageErrors';
import { QuickErrorSetItemsPage } from '../QuickErrorSetItemsPage';
import { clothing_shells } from '../../gql-interfaces/clothing_shells';
import { calculateErrorsForClothingShellMaindataRevision } from './calculateErrorsForClothingShellMaindataRevision';

function generateErrorsForClothingShellsListPage(
  clothingShell: clothing_shells
) {
  console.log('@@@clothingShell:', clothingShell);
  // This uses the items page interface for now, since we can reuse the maindata
  const errors: QuickErrorSetItemsPage = {
    maindataLatestRevision: new Set<VersionablePageErrors>(),
    maindataLatestProductionRevision: new Set<VersionablePageErrors>(),
    maindataLatestRevisionClothingShells: new Set<VersionablePageErrors>(),
    maindataLatestProductionRevisionClothingShells: new Set<VersionablePageErrors>(),
    translationLatestRevisionEnglishUS: new Set<VersionablePageErrors>(),
    translationLatestProductionRevisionEnglishUS: new Set<VersionablePageErrors>(),
  };
  // Latest production revision
  calculateErrorsForClothingShellMaindataRevision(errors, clothingShell, true);
  // Latest version (in development or review)
  calculateErrorsForClothingShellMaindataRevision(errors, clothingShell, false);
  // const { latest_prod } = clothingShell;
  // if (!latest_prod || latest_prod.length === 0) {
  //   errors.maindataLatestProductionRevision.add(
  //     VersionablePageErrors.Clothing_Shell_No_Maindata_Revisions
  //   );
  // } else {
  //   const { clothing_shell_maindata } = latest_prod[0];
  //   if (!clothing_shell_maindata || clothing_shell_maindata.length === 0) {
  //     errors.maindataLatestProductionRevision.add(
  //       VersionablePageErrors.Clothing_Shell_No_Maindata
  //     );
  //   } else {
  //     const { name, clothing_segment_data_id } = clothing_shell_maindata[0];
  //     if (!name) {
  //       errors.maindataLatestProductionRevision.add(
  //         VersionablePageErrors.Clothing_Shell_No_Name
  //       );
  //     }
  //     if (!clothing_segment_data_id) {
  //       errors.maindataLatestProductionRevision.add(
  //         VersionablePageErrors.Clothing_Shell_No_Clothing_Segment_Data
  //       );
  //     }
  //   }
  // }
  // // Latest revision
  // const { latest_revision } = clothingShell;
  // if (!latest_revision || latest_revision.length === 0) {
  //   errors.maindataLatestRevision.add(
  //     VersionablePageErrors.Clothing_Shell_No_Maindata_Revisions
  //   );
  // } else {
  //   const { clothing_shell_maindata } = latest_revision[0];
  //   if (!clothing_shell_maindata || clothing_shell_maindata.length === 0) {
  //     errors.maindataLatestRevision.add(
  //       VersionablePageErrors.Clothing_Shell_No_Maindata
  //     );
  //   } else {
  //     const { name, clothing_segment_data_id } = clothing_shell_maindata[0];
  //     if (!name) {
  //       errors.maindataLatestRevision.add(
  //         VersionablePageErrors.Clothing_Shell_No_Name
  //       );
  //     }
  //     if (!clothing_segment_data_id) {
  //       errors.maindataLatestRevision.add(
  //         VersionablePageErrors.Clothing_Shell_No_Clothing_Segment_Data
  //       );
  //     }
  //   }
  // }
  return errors;
}

export { generateErrorsForClothingShellsListPage };
