import React from 'react';
import { ColumnOfFrames } from '../../../common/frames/ColumnOfFrames';
import { LocalisationDashboardFrame } from './LocalisationDashboardFrame/_LocalisationDashboardFrame';
import { LocaleDashboardActivityFrame } from './LocalisationDashboardFrame/LocaleDashboardActivityFrame';
import { OverviewActivityFrame } from '../../../common/activity/OverviewActivityFrame';
import { Get_Item_Maindata_Revision_Changes } from '../../../../queries/item_maindata_revision_changes/getItemMaindataRevisionChanges';
import { Get_Item_Translation_Revision_Changes } from '../../../../queries/item_translation_revision_changes/getItemTranslationRevisionChanges';

interface LocalisationDashboardTabProps {
  itemId: number;
  latestTranslations: any;
  tabPath: any;
  urlNumberOfParts: number;
}

function LocalisationDashboardTab({
  itemId,
  latestTranslations,
  tabPath,
  urlNumberOfParts,
}: LocalisationDashboardTabProps) {
  console.log('itemId:', itemId);
  return (
    <>
      <ColumnOfFrames freeWidth>
        <LocalisationDashboardFrame
          latestTranslations={latestTranslations}
          tabPath={tabPath}
        />
      </ColumnOfFrames>
      <ColumnOfFrames>
        {/*<LocaleDashboardActivityFrame itemId={itemId} />*/}
        <OverviewActivityFrame
          id={Number.parseInt(String(itemId))}
          query={Get_Item_Translation_Revision_Changes}
          childObjectString={'getItemTranslationRevisionChanges'}
        />
      </ColumnOfFrames>
    </>
  );
}

export { LocalisationDashboardTab };
