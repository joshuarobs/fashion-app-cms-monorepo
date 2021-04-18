import React from 'react';
import { useQuery } from '@apollo/client';
import { LatestActivityFrame } from '../../../../common/activity/LatestActivityFrame';
import { Layout } from 'antd';
import { Get_Item_Translation_Revision_Changes } from '../../../../../queries/item_translation_revision_changes/getItemTranslationRevisionChanges';

const { Content } = Layout;

interface LocaleDashboardActivityFrameProps {
  itemId: number;
}

function LocaleDashboardActivityFrame({
  itemId,
}: LocaleDashboardActivityFrameProps) {
  const { loading, error, data } = useQuery(
    Get_Item_Translation_Revision_Changes,
    {
      variables: {
        itemId: Number.parseInt(String(itemId)),
        limit: 10,
      },
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
  if (error) return <div>Error! ${JSON.stringify(error, null, 2)}</div>;

  const { item_translation_revision_changes } = data;

  // console.log('Activity - loaded data:', item_translation_revision_changes);

  return (
    <LatestActivityFrame changes={item_translation_revision_changes} showType />
  );
}

export { LocaleDashboardActivityFrame };
