import React, { useState } from 'react';
import {
  useLocation,
  useSearchParams,
  useNavigate,
  createSearchParams,
} from 'react-router-dom';
import { FilterOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Select, Input, Button } from 'antd';
import { CompaniesTable } from './CompaniesTable';
import { useQuery } from '@apollo/client';
import * as _ from 'lodash';
import { Get_Companies_List_BB } from '../../../queries/companies/getCompaniesListBB';
import { TableType } from './TableType';

const { Content } = Layout;
const { Option } = Select;
const { Search } = Input;

const SETTINGS = {
  SHOW_ROWS: [20, 50, 100],
};

const cssStyles = {
  inputSelectSection: {
    marginLeft: 12,
    textAlign: 'start',
  },
  inputSelectText: {
    marginRight: 8,
  },
  searchAndFilterButtons: {
    verticalAlign: 'middle',
    marginRight: 8,
  },
};

interface CompaniesTableViewProps {
  selectCompany?: Function;
  currentCompanyId?: number;
  type: TableType;
}

function CompaniesTableView({
  selectCompany,
  currentCompanyId,
  type,
}: CompaniesTableViewProps) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  console.log('location:', location, '| searchParams:', searchParams);

  // TODO: Load from user's settings, default: most highest option
  const [settingShow, setSettingShow] = useState(SETTINGS.SHOW_ROWS[0]);
  const [currentTablePage, setCurrentTablePage] = useState(1);

  const { loading, error, data } = useQuery(Get_Companies_List_BB, {
    variables: {
      limit: settingShow,
      offset: (currentTablePage - 1) * settingShow,
    },
  });

  // const [selectedRows, setSelectedRows] = useState([]);

  if (loading) return <div />;
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }
  console.log('data2:', data);

  // Iterate through all data and set keys
  const newData = _.cloneDeep(data.getCompaniesListBB.companies);
  newData.forEach((item: any, index: number) => {
    item.key = index;
  });

  // Get the number of all fabric layers
  const numTotalEntries =
    data.getCompaniesListBB.companies_aggregate.aggregate.count;

  // Functions to handle table page state
  const setTablePage = (page: number) => {
    setCurrentTablePage(page);
    navigate({
      pathname: location.pathname,
      search: createSearchParams({
        page: page.toString(),
        show: settingShow.toString(),
      }).toString(),
    });
  };

  return (
    <Content
      style={{
        background: '#fff',
        marginLeft: 12,
        marginRight: 12,
        padding: 16,
        height: 'fit-content',
      }}
    >
      <Row>
        <Col span={14}>
          Showing 1-{Math.min(numTotalEntries, 20)} of {numTotalEntries} results
        </Col>
        <Col
          span={10}
          style={{
            textAlign: 'end',
          }}
        >
          {/* @ts-ignore */}
          <span style={cssStyles.inputSelectSection}>
            <span style={cssStyles.inputSelectText}>Show:</span>
            <Select
              value={settingShow}
              size="small"
              style={{ width: 64 }}
              onChange={(value) => setSettingShow(value)}
              className="not-bold"
            >
              {SETTINGS.SHOW_ROWS.map((value, index) => {
                return (
                  <Option key={index} value={value}>
                    {value}
                  </Option>
                );
              })}
            </Select>
          </span>
          {/* @ts-ignore */}
          <span style={cssStyles.inputSelectSection}>
            <span style={cssStyles.inputSelectText}>Sort by:</span>
            <Select
              defaultValue="newest"
              size="small"
              style={{ width: 120 }}
              className="not-bold"
            >
              <Option value="newest">Newest</Option>
              <Option value="name-a-z">Name (A-Z)</Option>
              <Option value="name-z-a">Name (Z-A)</Option>
              <Option value="popular">Popular</Option>
            </Select>
          </span>
        </Col>
      </Row>
      <Row style={{ marginTop: 12, minHeight: 32 }}>
        <Search
          placeholder="Search"
          onSearch={(value) => console.log(value)}
          style={{
            ...cssStyles.searchAndFilterButtons,
            width: 240,
          }}
          className="not-bold"
        />
        <Button
          style={cssStyles.searchAndFilterButtons}
          icon={<FilterOutlined />}
          onClick={() => {
            // setShowFiltersPopup(true);
          }}
        >
          Filter
        </Button>
        {/*{tagData.tags}*/}
      </Row>
      <Row
        style={{
          marginTop: 12,
        }}
      >
        <CompaniesTable
          data={newData}
          currentCompanyId={currentCompanyId}
          selectCompany={selectCompany}
          type={type}
          currentTablePage={currentTablePage}
          setTablePage={setTablePage}
          settingShow={settingShow}
          numTotalEntries={numTotalEntries}
        />
      </Row>
    </Content>
  );
}

export { CompaniesTableView };
