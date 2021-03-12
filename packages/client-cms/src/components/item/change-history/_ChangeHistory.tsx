import React from 'react';
import { useQuery } from '@apollo/client';
import { Layout } from 'antd';
import { AllActivityFrame } from '../../common/activity/AllActivityFrame';
import { Get_Item_Maindata_Revision_Changes } from '../../../queries/item_maindata_revision_changes/getItemMaindataRevisionChanges';

const { Content } = Layout;

interface ItemChangeHistoryFrameProps {
  id: number;
}

function ItemChangeHistoryFrame({ id }: ItemChangeHistoryFrameProps) {
  const { loading, error, data } = useQuery(
    Get_Item_Maindata_Revision_Changes,
    {
      variables: {
        id,
        limit: 50,
      },
      skip: !id,
    }
  );

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

  const { item_maindata_revision_changes } = data;

  console.log('Activity - loaded data:', item_maindata_revision_changes);

  return (
    <AllActivityFrame
      changes={item_maindata_revision_changes}
      showType
      isAllActivity
    />
  );
}

export { ItemChangeHistoryFrame };
