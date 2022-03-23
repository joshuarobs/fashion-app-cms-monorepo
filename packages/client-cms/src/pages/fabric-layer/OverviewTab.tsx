import React from 'react';
import { ColumnOfFrames } from '../../components/common/frames/ColumnOfFrames';
import { DetailsFrame } from '../../components/fabric-layer/overview/DetailsFrame/_DetailsFrame';
// import { MiniItemsFrameCompany } from '../../components/company/overview/MiniItemsFrameCompany';
import { StateFrame } from '../../components/common/frames/StateFrame/_StateFrame';
import { LatestActivityFrame } from '../../components/common/activity/LatestActivityFrame';
import { fabric_layers } from '../../utils/gql-interfaces/fabric_layers';

interface OverviewTabProps {
  fabricLayer: fabric_layers;
}

function OverviewTab({ fabricLayer }: OverviewTabProps) {
  console.log('fabricLayer:', fabricLayer);

  return (
    <>
      <ColumnOfFrames fullWidth={true}>
        {<DetailsFrame data={fabricLayer} />}
      </ColumnOfFrames>
      <ColumnOfFrames>
        <StateFrame />
        <LatestActivityFrame />
      </ColumnOfFrames>
    </>
  );
}

export { OverviewTab };
