import React from 'react';
import { ColumnOfFrames } from '../../../common/frames/ColumnOfFrames';
import { LocalisationDashboardFrame } from './LocalisationDashboardFrame/_LocalisationDashboardFrame';
import { OverviewActivityFrame } from '../../../common/activity/OverviewActivityFrame';
import { Get_Item_Translation_Revision_Changes } from '../../../../queries/item_translation_revision_changes/getItemTranslationRevisionChanges';

interface LocalisationDashboardTabProps {
  itemId?: string;
  latestTranslations: any;
  // mediaItemAssociated: [];
  defaultMediaItemAssociated: [];
  // refetchMediaItemAssociated: Function;
  tabPath: any;
  urlNumberOfParts: number;
  // setMediaItemIds: Function;
}

function LocalisationDashboardTab({
  itemId,
  latestTranslations,
  // mediaItemAssociated,
  defaultMediaItemAssociated,
  // refetchMediaItemAssociated,
  tabPath,
  urlNumberOfParts,
}: // setMediaItemIds,
LocalisationDashboardTabProps) {
  const id = Number.parseInt(String(itemId));

  console.log('itemId:', itemId);
  return (
    <>
      <ColumnOfFrames freeWidth>
        <LocalisationDashboardFrame
          id={id}
          latestTranslations={latestTranslations}
          defaultMediaItemAssociated={defaultMediaItemAssociated}
          // mediaItemAssociated={mediaItemAssociated}
          // refetchMediaItemAssociated={refetchMediaItemAssociated}
          tabPath={tabPath}
          // setMediaItemIds={setMediaItemIds}
        />
      </ColumnOfFrames>
      <ColumnOfFrames>
        {/*<LocaleDashboardActivityFrame itemId={itemId} />*/}
        <OverviewActivityFrame
          id={id}
          query={Get_Item_Translation_Revision_Changes}
          childObjectString={'getItemTranslationRevisionChanges'}
        />
      </ColumnOfFrames>
    </>
  );
}

export { LocalisationDashboardTab };
