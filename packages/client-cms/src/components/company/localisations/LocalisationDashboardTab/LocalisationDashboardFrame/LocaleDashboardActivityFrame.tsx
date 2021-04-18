import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { LatestActivityFrame } from '../../../../common/activity/LatestActivityFrame';
import { Layout } from 'antd';
import { Get_Company_Translation_Revision_Changes } from '../../../../../queries/company_translation_revision_changes/getCompanyTranslationRevisionChanges';

const { Content } = Layout;

interface LocaleDashboardActivityFrameProps {
  companyId: number;
}

function LocaleDashboardActivityFrame({
  companyId,
}: LocaleDashboardActivityFrameProps) {
  const { loading, error, data } = useQuery(
    Get_Company_Translation_Revision_Changes,
    {
      variables: {
        companyId: Number.parseInt(String(companyId)),
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

  console.log('Activity - loaded data:', company_translation_revision_changes);

  return (
    <LatestActivityFrame
      changes={company_translation_revision_changes}
      showType
    />
  );
}

export { LocaleDashboardActivityFrame };
