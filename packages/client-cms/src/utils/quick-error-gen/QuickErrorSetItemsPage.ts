import { VersionablePageErrors } from './VersionablePageErrors';

interface QuickErrorSetItemsPage {
  // maindata: Set<VersionablePageErrors>;
  maindataLatestRevision: Set<VersionablePageErrors>;
  maindataLatestProductionRevision: Set<VersionablePageErrors>;
  maindataLatestRevisionClothingShells: Set<VersionablePageErrors>;
  maindataLatestProductionRevisionClothingShells: Set<VersionablePageErrors>;
  // translation: Set<VersionablePageErrors>;
  translationLatestRevisionEnglishUS: Set<VersionablePageErrors>;
  translationLatestProductionRevisionEnglishUS: Set<VersionablePageErrors>;
}

export type { QuickErrorSetItemsPage };
