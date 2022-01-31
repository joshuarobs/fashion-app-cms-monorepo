import React from 'react';
import { HeaderFrame } from '../../components/company/HeaderFrame';
import { Footer } from '../../components/app-shell/Footer';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { RouteStrings } from '../../routeStrings';
import { ColumnOfFrames } from '../../components/common/frames/ColumnOfFrames';
import { pageStyles } from '../pageStyles';
import { OverviewTab } from './OverviewTab';
import { ItemsTab } from './ItemsTab';
import { LocalisationsTab } from './LocalisationsTab';
import { Get_Company } from '../../queries/companies/getCompany';
import { Button, Result } from 'antd';

function CompanyPage() {
  // const [item, setItem] = useState();
  // @ts-ignore
  const { id } = useParams();
  console.log('id:', id);

  const { loading, error, data } = useQuery(Get_Company, {
    variables: { id: Number.parseInt(String(id)) },
  });

  if (loading) return <div />;
  if (error) return <div>Error! ${JSON.stringify(error, null, 2)}</div>;
  console.log('data:', data);

  const company = data.getCompany;
  // useEffect(() => {
  //   setItem(data.items_by_pk);
  // });
  // setItem(data.items_by_pk);

  // 404 result if item doesn't exist in the database
  if (!company) {
    return (
      <Result
        status="404"
        title="404"
        subTitle={`Sorry, a company with id "${id}" does not exist.`}
        extra={
          <Link to={RouteStrings.Companies__Company}>
            <Button type="primary">Back to Companies</Button>
          </Link>
        }
        style={{
          paddingTop: 96,
        }}
      />
    );
  }

  return (
    <>
      <HeaderFrame data={company} />
      {/* @ts-ignore */}
      <div style={pageStyles.content}>
        <Routes>
          <Route path={''} element={<OverviewTab company={company} />} />
          <Route
            path={RouteStrings.Items + RouteStrings.Wildcard}
            element={<ItemsTab />}
          />
          <Route
            path={RouteStrings.Collections + RouteStrings.Wildcard}
            element={<ColumnOfFrames>Collections</ColumnOfFrames>}
          />
          <Route
            path={RouteStrings.Localisations + RouteStrings.Wildcard}
            element={<LocalisationsTab />}
          />
          <Route
            path={RouteStrings.Change_History + RouteStrings.Wildcard}
            element={<ColumnOfFrames>Change history</ColumnOfFrames>}
          />
          <Route
            path={RouteStrings.Settings}
            element={<ColumnOfFrames>Settings</ColumnOfFrames>}
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export { CompanyPage };
