import React, { useState } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Select, Input, Button } from 'antd';
import { useQuery } from '@apollo/client';
import * as _ from 'lodash';
// import { Get_Clothing_Shells_List_BB } from '../../../queries/clothing_shells/getClothingShellsListBB';
import { ClothingShellsTable } from './ClothingShellsTable';
import { TableType } from './TableType';
import { Get_Items_For_Items_Table_Latest } from '../../../queries/items/getItemsForItemsTableLatest';
import { Get_Clothing_Shells_For_Clothing_Shells_Table_Latest } from '../../../queries/clothing_shells/getClothingShellsForClothingShellsTableLatest';
import { addKeysToArrayObjects } from '../../../utils/addKeysToArrayObjects';

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

/**
 * We need this as a hacky work around to make the table display properly on
 * the page. This number should be total width of all fixed elements on the
 * page such as:
 * - App Shell Sidebar (200px)
 * - Content Padding (24 + 24px)
 * - Item Category Menu (240px)
 * - Item Category Margin Right (24px)
 * - Primary Frame Padding (24 + 24px)
 * - Somehow minus 32px to make refreshing not bugged
 * Current total: 572 - 32
 */
const MAGIC_NUMBER_TO_MINUS = 572 - 32;

interface ClothingShellsTableViewProps {
  selectClothingShell?: Function;
  currentClothingShellId?: number | null;
  type?: TableType;
}

function ClothingShellsTableView({
  selectClothingShell,
  currentClothingShellId = null,
  type,
}: ClothingShellsTableViewProps) {
  // TODO: Load from user's settings, default: most highest option
  const [settingShow, setSettingShow] = useState(
    SETTINGS.SHOW_ROWS[SETTINGS.SHOW_ROWS.length - 1]
  );

  const { loading, error, data } = useQuery(
    Get_Clothing_Shells_For_Clothing_Shells_Table_Latest,
    {
      variables: {
        limit: 20,
        offset: 0,
      },
    }
  );

  // const [selectedRows, setSelectedRows] = useState([]);

  if (loading)
    return (
      <Content
        style={{
          background: '#fff',
          // marginLeft: 12,
          // marginRight: 12,
          padding: 16,
          height: 'fit-content',
          width: `calc(100vw - ${MAGIC_NUMBER_TO_MINUS}px)`,
        }}
      />
    );
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }
  console.log('data2:', data);

  // Iterate through all data and set keys
  const newData = addKeysToArrayObjects(
    data.getClothingShellsForClothingShellsTableLatest
  );

  // Get the number of all clothing shells
  const numResults = data.getClothingShellsForClothingShellsTableLatest.length;

  return (
    <Content
      style={{
        // marginLeft: 12,
        // marginRight: 12,
        background: '#fff',
        padding: 24,
        minWidth: '100%',
        width: 'fit-content',
        height: 'fit-content',
        // width: `calc(100 - ${MAGIC_NUMBER_TO_MINUS}px)`,
      }}
    >
      <Row>
        <Col span={14}>
          Showing 1-{Math.min(numResults, 20)} of {numResults} results
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
        <ClothingShellsTable
          data={newData}
          currentClothingShellId={currentClothingShellId}
          selectClothingShell={selectClothingShell}
          type={type}
        />
      </Row>
    </Content>
  );
}

export { ClothingShellsTableView };
