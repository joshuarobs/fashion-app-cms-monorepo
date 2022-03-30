import React from 'react';
import { useQuery } from '@apollo/client';
import { LatestActivityFrame } from '../../../../common/activity/LatestActivityFrame';
import { Layout } from 'antd';
import { Get_Item_Translation_Revision_Changes_For_Locale } from '../../../../../queries/item_translation_revision_changes/getItemTranslationRevisionChangesForLocale';

const { Content } = Layout;

interface LocalisationActivityFrameProps {
  itemId?: string;
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
        itemId: Number.parseInt(String(itemId)),
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
  if (error) return <div>Error! ${JSON.stringify(error, null, 2)}</div>;

  const { getItemTranslationRevisionChangesForLocale } = data;

  console.log(
    'Localisation Activity Frame - loaded data:',
    getItemTranslationRevisionChangesForLocale
  );

  return (
    <LatestActivityFrame changes={getItemTranslationRevisionChangesForLocale} />
  );
}

export { LocalisationActivityFrame };
