import React from 'react';
import { ColumnOfFrames } from '../../../common/frames/ColumnOfFrames';
import { LocalisationDashboardFrame } from './LocalisationDashboardFrame/_LocalisationDashboardFrame';
import { LocaleDashboardActivityFrame } from './LocalisationDashboardFrame/LocaleDashboardActivityFrame';

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
  return (
    <>
      <ColumnOfFrames freeWidth>
        <LocalisationDashboardFrame
          latestTranslations={latestTranslations}
          tabPath={tabPath}
        />
      </ColumnOfFrames>
      <ColumnOfFrames>
        <LocaleDashboardActivityFrame itemId={itemId} />
      </ColumnOfFrames>
    </>
  );
}

export { LocalisationDashboardTab };
