import React from 'react';
import { useQuery } from '@apollo/client';
import { LatestActivityFrame } from '../../../common/activity/LatestActivityFrame';
import { Layout } from 'antd';
import { Get_Item_Translation_Revision_Changes_For_Locale } from '../../../../queries/item_translation_revision_changes/getItemTranslationRevisionChangesForLocale';
import { Get_Item_Global_Media_Revision_Changes_Given_Item_Id } from '../../../../queries/item_global_media_revision_changes/getItemGlobalMediaRevisionChangesGivenItemId';

const { Content } = Layout;

interface GlobalMediaActivityFrameProps {
  itemId?: string;
  currentTab: string;
}

function GlobalMediaActivityFrame({
  itemId,
  currentTab,
}: GlobalMediaActivityFrameProps) {
  const { loading, error, data } = useQuery(
    Get_Item_Global_Media_Revision_Changes_Given_Item_Id,
    {
      variables: {
        item_id: Number.parseInt(String(itemId)),
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

  const { getItemGlobalMediaRevisionChangesGivenItemId } = data;

  console.log(
    'Global Media Activity Frame - loaded data:',
    getItemGlobalMediaRevisionChangesGivenItemId
  );

  return (
    <LatestActivityFrame
      changes={getItemGlobalMediaRevisionChangesGivenItemId}
      showType
    />
  );
}

export { GlobalMediaActivityFrame };
