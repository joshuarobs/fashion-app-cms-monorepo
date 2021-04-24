import React from 'react';
import { useQuery } from '@apollo/client';
import { LatestActivityFrame } from './LatestActivityFrame';
import { Layout } from 'antd';

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
  if (error) return <div>Error! ${JSON.stringify(error, null, 2)}</div>;

  console.log('OverviewActivityFrame#data:', data);

  // const { item_maindata_revision_changes } = data;
  // console.log('Activity - loaded data:', item_maindata_revision_changes);

  return (
    <LatestActivityFrame changes={data[`${childObjectString}`]} showType />
  );
}

export { OverviewActivityFrame };
