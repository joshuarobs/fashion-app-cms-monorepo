import React from 'react';
import { ColumnOfFrames } from '../../components/common/frames/ColumnOfFrames';
import { DetailsFrame } from '../../components/company/overview/DetailsFrame/_DetailsFrame';
import { MiniItemsFrameCompany } from '../../components/company/overview/MiniItemsFrameCompany';
import { StateFrame } from '../../components/common/frames/StateFrame/_StateFrame';
import { LatestActivityFrame } from '../../components/common/activity/LatestActivityFrame';
import { companies } from '../../utils/gql-interfaces/companies';

interface OverviewTabProps {
  company: companies;
}

function OverviewTab({ company }: OverviewTabProps) {
  return (
    <>
      <ColumnOfFrames>
        <DetailsFrame data={company} />
      </ColumnOfFrames>
      <ColumnOfFrames>
        <MiniItemsFrameCompany company={company} />
      </ColumnOfFrames>
      <ColumnOfFrames>
        <StateFrame />
        <LatestActivityFrame />
      </ColumnOfFrames>
    </>
  );
}

export { OverviewTab };
