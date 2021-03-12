import { QuickErrorSetMessagesItemsPage } from './QuickErrorSetMessagesItemsPage';
import { QuickErrorSetItemsPage } from './QuickErrorSetItemsPage';
import { generateElementsListFromErrors } from './generateElementsListFromErrors';

function generateElementsListFromErrorsItemPage(
  errors: QuickErrorSetItemsPage
) {
  const result: QuickErrorSetMessagesItemsPage = {
    // maindata: generateElementsListFromErrors(errors.maindataLatestRevision),
    maindataLatestRevision: generateElementsListFromErrors(
      errors.maindataLatestRevision
    ),
    maindataLatestProductionRevision: generateElementsListFromErrors(
      errors.maindataLatestProductionRevision
    ),
    maindataLatestRevisionClothingShells: generateElementsListFromErrors(
      errors.maindataLatestRevisionClothingShells
    ),
    maindataLatestProductionRevisionClothingShells: generateElementsListFromErrors(
      errors.maindataLatestProductionRevisionClothingShells
    ),
    // translation: generateElementsListFromErrors(errors.maindataLatestRevision),
    translationLatestRevisionEnglishUS: generateElementsListFromErrors(
      errors.translationLatestRevisionEnglishUS
    ),
    translationLatestProductionRevisionEnglishUS: generateElementsListFromErrors(
      errors.translationLatestProductionRevisionEnglishUS
    ),
  };
  return result;
}

export { generateElementsListFromErrorsItemPage };
