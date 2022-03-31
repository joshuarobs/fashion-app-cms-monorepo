import React from 'react';
import { ColumnOfFrames } from '../../../common/frames/ColumnOfFrames';
import { LocalisationDashboardFrame } from './LocalisationDashboardFrame/_LocalisationDashboardFrame';
import { OverviewActivityFrame } from '../../../common/activity/OverviewActivityFrame';
import { Get_Item_Translation_Revision_Changes } from '../../../../queries/item_translation_revision_changes/getItemTranslationRevisionChanges';

interface LocalisationDashboardTabProps {
  itemId?: string;
  latestTranslations: any;
  mediaItemAssociated: [];
  tabPath: any;
  urlNumberOfParts: number;
}

function LocalisationDashboardTab({
  itemId,
  latestTranslations,
  mediaItemAssociated,
  tabPath,
  urlNumberOfParts,
}: LocalisationDashboardTabProps) {
  console.log('itemId:', itemId);
  return (
    <>
      <ColumnOfFrames freeWidth>
        <LocalisationDashboardFrame
          latestTranslations={latestTranslations}
          mediaItemAssociated={mediaItemAssociated}
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
