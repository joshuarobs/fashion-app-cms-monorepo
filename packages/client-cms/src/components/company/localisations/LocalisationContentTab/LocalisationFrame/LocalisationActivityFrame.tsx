import React from 'react';
import { useQuery } from '@apollo/client';
import { LatestActivityFrame } from '../../../../common/activity/LatestActivityFrame';
import { Layout } from 'antd';
import { Get_Company_Translation_Revision_Changes_For_Locale } from '../../../../../queries/company_translation_revision_changes/getCompanyTranslationRevisionChangesForLocale';

const { Content } = Layout;

interface LocalisationActivityFrameProps {
  companyId?: string;
  currentTab: string;
}

function LocalisationActivityFrame({
  companyId,
  currentTab,
}: LocalisationActivityFrameProps) {
  const { loading, error, data } = useQuery(
    Get_Company_Translation_Revision_Changes_For_Locale,
    {
      variables: {
        companyId: Number.parseInt(String(companyId)),
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

  const { company_translation_revision_changes } = data;

  console.log(
    'Localisation Activity Frame - loaded data:',
    company_translation_revision_changes
  );

  return <LatestActivityFrame changes={company_translation_revision_changes} />;
}

export { LocalisationActivityFrame };
