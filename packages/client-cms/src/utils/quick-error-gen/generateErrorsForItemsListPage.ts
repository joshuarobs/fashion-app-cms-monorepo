import { items } from '../gql-interfaces/items';
import { VersionablePageErrors } from './VersionablePageErrors';
import { QuickErrorSetItemsPage } from './QuickErrorSetItemsPage';
import { calculateErrorsForClothingShellMaindataRevision } from './generateErrorsForClothingShellsListPage/calculateErrorsForClothingShellMaindataRevision';

function calculateErrorsForItemMaindataRevision(
  errors: QuickErrorSetItemsPage,
  item: items,
  isLatestProd: boolean
) {
  const maindata_revisions = isLatestProd
    ? item.latest_prod
    : item.latest_revision;
  let errorLocation = isLatestProd
    ? errors.maindataLatestProductionRevision
    : errors.maindataLatestRevision;
  if (!maindata_revisions || maindata_revisions.length === 0) {
    errorLocation.add(VersionablePageErrors.Item_No_Maindata_Revisions);
  } else {
    const { item_maindata } = maindata_revisions[0];
    if (!item_maindata || item_maindata.length === 0) {
      errorLocation.add(VersionablePageErrors.Item_No_Maindata);
    } else {
      const { name, clothing_shell_id } = item_maindata[0];
      if (!name) {
        errorLocation.add(VersionablePageErrors.Item_No_Database_Name);
      }
      if (!clothing_shell_id) {
        errorLocation.add(VersionablePageErrors.Item_No_Clothing_Shell);
      }
    }
  }
}

function generateErrorsForItemsListPage(item: items) {
  console.log('~~~item:', item);
  const errors: QuickErrorSetItemsPage = {
    // maindata: new Set<VersionablePageErrors>(),
    maindataLatestRevision: new Set<VersionablePageErrors>(),
    maindataLatestProductionRevision: new Set<VersionablePageErrors>(),
    maindataLatestRevisionClothingShells: new Set<VersionablePageErrors>(),
    maindataLatestProductionRevisionClothingShells: new Set<VersionablePageErrors>(),
    // translation: new Set<VersionablePageErrors>(),
    translationLatestRevisionEnglishUS: new Set<VersionablePageErrors>(),
    translationLatestProductionRevisionEnglishUS: new Set<VersionablePageErrors>(),
  };
  // @ts-ignore
  // Latest production revision
  calculateErrorsForItemMaindataRevision(errors, item, true);
  // Latest version (in development or review)
  calculateErrorsForItemMaindataRevision(errors, item, false);
  // Latest production maindata revision's clothing shell
  if (
    item.latest_prod[0] &&
    item.latest_prod[0].item_maindata[0] &&
    item.latest_prod[0].item_maindata[0].clothing_shell_id
  ) {
    calculateErrorsForClothingShellMaindataRevision(
      errors,
      item.latest_prod[0].item_maindata[0].clothing_shell,
      true,
      true
    );
  }
  // Latest maindata revision's clothing shell
  if (
    item.latest_revision[0] &&
    item.latest_revision[0].item_maindata[0] &&
    item.latest_revision[0].item_maindata[0].clothing_shell_id
  ) {
    // Latest production revision of the clothing shell
    calculateErrorsForClothingShellMaindataRevision(
      errors,
      item.latest_revision[0].item_maindata[0].clothing_shell,
      false,
      true
    );
  }
  return errors;
}

export { generateErrorsForItemsListPage };
