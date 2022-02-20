import React from 'react';
import { QuickErrorSetMessagesItemsPage } from '../../utils/quick-error-gen/QuickErrorSetMessagesItemsPage';
import { getNumberOfQuickErrorsInSet } from '../../utils/quick-error-gen/getNumberOfQuickErrorsInSet';
import { VersionablePageErrors } from '../../utils/quick-error-gen/VersionablePageErrors';
import { VersionablePageErrorMessages } from '../../utils/quick-error-gen/VersionablePageErrorMessages';

function rowOfError(error: string, index: number, isSubError?: boolean) {
  const bullet = !isSubError ? '•' : '◦';
  return (
    <div
      key={index}
      style={{
        marginLeft: !isSubError ? 0 : '0.75em',
      }}
    >
      {bullet} {error}
      <br />
    </div>
  );
}

interface ErrorTooltipContentProps {
  itemsPageErrors?: QuickErrorSetMessagesItemsPage;
}

/**
 * Content for an error tooltip. This usually displays an unordered list of
 * errors in a tooltip box that appears when hovering over certain error icons.
 * Will only display one group of errors for now.
 * @param errors
 * @constructor
 */
function ErrorTooltipContent({ itemsPageErrors }: ErrorTooltipContentProps) {
  let totalErrors = 0;
  if (itemsPageErrors)
    totalErrors += getNumberOfQuickErrorsInSet(itemsPageErrors);

  if (itemsPageErrors) {
    // Calculate sub group errors for item maindata
    // if (itemsPageErrors?.maindataLatestProductionRevisionClothingShells)
    const hasErrorsForLatestProductionRevisionClothingShells =
      itemsPageErrors.maindataLatestProductionRevisionClothingShells &&
      itemsPageErrors.maindataLatestProductionRevisionClothingShells.length > 0;
    const hasErrorsForLatestRevisionClothingShells =
      itemsPageErrors.maindataLatestRevisionClothingShells &&
      itemsPageErrors.maindataLatestRevisionClothingShells.length > 0;

    const showErrorsForMaindataLatestProduction =
      // If there's general errors
      (itemsPageErrors.maindataLatestProductionRevision &&
        itemsPageErrors.maindataLatestProductionRevision.length > 0) ||
      // Or, if there's errors within the clothing shell
      hasErrorsForLatestProductionRevisionClothingShells;
    const showErrorsForMaindataLatest =
      // If there's general errors
      (itemsPageErrors.maindataLatestRevision &&
        itemsPageErrors.maindataLatestRevision.length > 0) ||
      // Or, if there's errors within the clothing shell
      hasErrorsForLatestRevisionClothingShells;

    //======================================================================
    // Special cases for overriding text to make them more readable
    //======================================================================
    // Production revision related
    if (itemsPageErrors.maindataLatestProductionRevision) {
      itemsPageErrors.maindataLatestProductionRevision.forEach(
        (string, index) => {
          switch (string) {
            case VersionablePageErrorMessages.get(
              VersionablePageErrors.Item_No_Maindata_Revisions
            ):
              // @ts-ignore
              itemsPageErrors.maindataLatestProductionRevision[index] =
                VersionablePageErrorMessages.get(
                  VersionablePageErrors.Item_No_Maindata_Revisions_Production_Readable
                );
              break;
          }
        }
      );
      // itemsPageErrors.maindataLatestProductionRevision[0] =
      //   VersionablePageErrorMessages.get(
      //     VersionablePageErrors.Item_No_Maindata_Revisions_Production_Readable
      //   );
      // console.log(
      //   'itemsPageErrors.maindataLatestProductionRevision[0]:',
      //   itemsPageErrors.maindataLatestProductionRevision[0]
      // );
    }

    return (
      <div>
        Errors present: {totalErrors}
        <br />
        {/* Maindata - Production */}
        {showErrorsForMaindataLatestProduction && 'Maindata - Production:'}
        {itemsPageErrors.maindataLatestProductionRevision &&
          itemsPageErrors.maindataLatestProductionRevision.map((error, index) =>
            rowOfError(error, index)
          )}
        {hasErrorsForLatestProductionRevisionClothingShells && (
          <div>
            • Clothing Shell
            <br />
            {/* @ts-ignore */}
            {itemsPageErrors.maindataLatestProductionRevisionClothingShells.map(
              (error, index) => rowOfError(error, index, true)
            )}
          </div>
        )}
        {/* Maindata - Latest */}
        {showErrorsForMaindataLatest && 'Maindata - Latest:'}
        {itemsPageErrors.maindataLatestRevision &&
          itemsPageErrors.maindataLatestRevision.map((error, index) =>
            rowOfError(error, index)
          )}
        {hasErrorsForLatestRevisionClothingShells && (
          <div>
            • Clothing Shell
            <br />
            {/* @ts-ignore */}
            {itemsPageErrors.maindataLatestRevisionClothingShells.map(
              (error, index) => rowOfError(error, index, true)
            )}
          </div>
        )}
        {/* TODO: Localisations - Production */}
        {/* TODO: Localisations - Latest */}
      </div>
    );
  } else {
    return <div />;
  }
}

export { ErrorTooltipContent };
