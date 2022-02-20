import React from 'react';
import { ColumnOfFrames } from '../../components/common/frames/ColumnOfFrames';
import { DetailsFrame } from '../../components/company/overview/DetailsFrame/_DetailsFrame';
import { MiniItemsFrameCompany } from '../../components/company/overview/MiniItemsFrameCompany';
import { StateFrame } from '../../components/common/frames/StateFrame/_StateFrame';
import { LatestActivityFrame } from '../../components/common/activity/LatestActivityFrame';
import { companies } from '../../utils/gql-interfaces/companies';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import { RouteStrings } from '../../routeStrings';
import { ErrorPleaseFixThis } from '../../components/common/localisation/ErrorPleaseFixThis';

interface OverviewTabProps {
  company: companies;
}

function OverviewTab({ company }: OverviewTabProps) {
  console.log('company:', company);
  // 404 result if company's `counts` object doesn't exist in the database
  if (!company.counts) {
    return (
      <ErrorPleaseFixThis
        message={'This Company does not have a Company Counts.'}
        buttonText={'Add Company Counts'}
        isDelete={false}
        onClick={() => {}}
      />
      // <Result
      //   status="404"
      //   title="404"
      //   subTitle={`Sorry, the company's "counts" does not exist.`}
      //   extra={
      //     <Link to={RouteStrings.Companies__Company}>
      //       <Button type="primary">Back to Companies</Button>
      //     </Link>
      //   }
      //   style={{
      //     paddingTop: 96,
      //   }}
      // />
    );
  }

  return (
    <>
      <ColumnOfFrames>
        <DetailsFrame data={company} />
      </ColumnOfFrames>
      <ColumnOfFrames>
        <MiniItemsFrameCompany company={company} />
      </ColumnOfFrames>
      <ColumnOfFrames>
        <StateFrame />
        <LatestActivityFrame />
      </ColumnOfFrames>
    </>
  );
}

export { OverviewTab };
