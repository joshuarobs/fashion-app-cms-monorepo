import React from 'react';
import { useQuery } from '@apollo/client';
import { LatestActivityFrame } from './LatestActivityFrame';
import { Layout } from 'antd';

const { Content } = Layout;

interface OverviewActivityFrameProps {
  id: number | null;
  query?: any;
  childObjectString: string;
  overrideLoading?: any;
  overrideError?: any;
  overrideData?: any;
}

function OverviewActivityFrame({
  id,
  query,
  childObjectString,
  overrideLoading,
  overrideError,
  overrideData,
}: OverviewActivityFrameProps) {
  // if (errorLatestActivity) {
  //   return (
  //     <div>
  //       Error (Latest Activity) ${JSON.stringify(errorLatestActivity, null, 2)}
  //     </div>
  //   );
  // }

  const { loading, error, data } = useQuery(query, {
    variables: {
      id,
      limit: 10,
    },
    fetchPolicy: 'cache-and-network',
    // skip: !query || overrideLoading !== null,
  });
  //
  // console.log('should skip:', !query || overrideLoading !== null);
  //
  if (loading)
    return (
      <Content
        style={{
          background: '#fff',
          minHeight: 400,
        }}
      />
    );
  // if (overrideError) {
  //   return <div>Error! ${JSON.stringify(overrideError, null, 2)}</div>;
  // }
  if (error) return <div>Error! ${JSON.stringify(error, null, 2)}</div>;

  // console.log('OverviewActivityFrame#data:', data);

  // const { item_maindata_revision_changes } = data;
  // console.log('Activity - loaded data:', item_maindata_revision_changes);

  // const changes = overrideData
  //   ? overrideData[`${childObjectString}`]
  //   : data[`${childObjectString}`];

  return (
    <LatestActivityFrame changes={data[`${childObjectString}`]} showType />
  );
}

export { OverviewActivityFrame };
