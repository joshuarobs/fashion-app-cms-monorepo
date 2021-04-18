import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { LatestActivityFrame } from './LatestActivityFrame';
import { Layout } from 'antd';
import { Get_Item_Maindata_Revision_Changes } from '../../../queries/item_maindata_revision_changes/getItemMaindataRevisionChanges';

const { Content } = Layout;

interface OverviewActivityFrameProps {
  id: number | null;
  query: any;
  childObjectString: string;
}

function OverviewActivityFrame({
  id,
  query,
  childObjectString,
}: OverviewActivityFrameProps) {
  const { loading, error, data } = useQuery(query, {
    variables: {
      id,
      limit: 10,
    },
  });

  if (loading)
    return (
      <Content
        style={{
          background: '#fff',
          minHeight: 400,
        }}
      />
    );
  if (error) return <div>Error! ${error}</div>;

  console.log('OverviewActivityFrame#data:', data);

  // const { item_maindata_revision_changes } = data;
  // console.log('Activity - loaded data:', item_maindata_revision_changes);

  return (
    <LatestActivityFrame changes={data[`${childObjectString}`]} showType />
  );
}

export { OverviewActivityFrame };
