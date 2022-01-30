import React from 'react';
import { ColumnOfFrames } from '../../../common/frames/ColumnOfFrames';
import { LocalisationDashboardFrame } from './LocalisationDashboardFrame/_LocalisationDashboardFrame';
import { LocaleDashboardActivityFrame } from './LocalisationDashboardFrame/LocaleDashboardActivityFrame';

interface LocalisationDashboardTabProps {
  companyId?: string;
  latestTranslations: any;
  tabPath: string;
  urlNumberOfParts: number;
}

function LocalisationDashboardTab({
  companyId,
  latestTranslations,
  tabPath,
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
        <LocaleDashboardActivityFrame companyId={companyId} />
      </ColumnOfFrames>
    </>
  );
}

export { LocalisationDashboardTab };
