import React from 'react';
import { useQuery } from '@apollo/client';
import { LatestActivityFrame } from '../../../../common/activity/LatestActivityFrame';
import { Layout } from 'antd';
import { Get_Item_Translation_Revision_Changes_For_Locale } from '../../../../../queries/item_translation_revision_changes/getItemTranslationRevisionChangesForLocale';

const { Content } = Layout;

interface LocalisationActivityFrameProps {
  itemId: number;
  currentTab: string;
}

function LocalisationActivityFrame({
  itemId,
  currentTab,
}: LocalisationActivityFrameProps) {
  const { loading, error, data } = useQuery(
    Get_Item_Translation_Revision_Changes_For_Locale,
    {
      variables: {
        itemId,
        localeCode: currentTab,
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
  if (error) return <div>Error! ${error}</div>;

  const { item_translation_revision_changes } = data;

  console.log(
    'Localisation Activity Frame - loaded data:',
    item_translation_revision_changes
  );

  return <LatestActivityFrame changes={item_translation_revision_changes} />;
}

export { LocalisationActivityFrame };
