import React, { useEffect, useState } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Select, Input, Checkbox, Button } from 'antd';
import { useQuery } from '@apollo/client';
import * as _ from 'lodash';
import { Get_Fabric_Layers_List_BB } from '../../../queries/fabric_layers/getFabricLayersListBB';
import { MediaItemsTable } from './MediaItemsTable';
import { FabricLayerType } from '@joshuarobs/clothing-framework';
import { enumToCamelCase } from '../../../utils/enumToCamelCase';
import { TableType } from './TableType';
import { Get_Media_List_BB } from '../../../queries/media_items/getMediaListBB';

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

// Prepare the enum fabric layer types to be displayed and used in a group
// of Checkboxes
const fabricLayerTypes = Object.keys(FabricLayerType).map((key) => {
  // console.log("key:", key);
  return {
    value: key,
    label: enumToCamelCase(key),
  };
});

interface FabricLayersTableViewProps {
  layerType?: any;
  currentFabricLayerId?: number;
  selectFabricLayer?: Function;
  type?: TableType;
}

function MediaItemsTableView({
  layerType,
  selectFabricLayer,
  currentFabricLayerId,
  type = TableType.All_List,
}: FabricLayersTableViewProps) {
  // TODO: Load from user's settings, default: most highest option
  const [settingShow, setSettingShow] = useState(
    SETTINGS.SHOW_ROWS[SETTINGS.SHOW_ROWS.length - 1]
  );

  // const [selectedRows, setSelectedRows] = useState([]);

  // Used in place of `selectedFabricLayerTypes` if that array is empty. In
  // practical application, if the user hasn't clicked on any of the
  // checkboxes for wanting to filter for a fabric layer type, then it's
  // assumed that they want to see all types
  const ALL_FABRIC_LAYER_TYPES = [
    FabricLayerType.Shell,
    FabricLayerType.Fill,
    FabricLayerType.Interlining,
    FabricLayerType.Lining,
  ];

  const [selectedFabricLayerTypes, setSelectedFabricLayerTypes] = useState([]);
  useEffect(() => {
    if (layerType) {
      // @ts-ignore
      setSelectedFabricLayerTypes([layerType]);
    }
  }, [layerType]);
  console.log('selectedFabricLayerTypes:', selectedFabricLayerTypes);

  const { loading, error, data } = useQuery(Get_Media_List_BB, {
    variables: {
      limit: 20,
      offset: 0,
    },
  });

  if (loading) return <div />;
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }
  console.log('data2:', data);

  // Iterate through all data and set keys
  const newData = _.cloneDeep(data.getMediaListBB);
  newData.forEach((item: any, index: any) => {
    item.key = index;
  });

  // Get the number of all fabric layers
  const numResults = data.getMediaListBB.length;

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
        <Col span={8}>
          Showing 1-{Math.min(numResults, 20)} of {numResults} results
        </Col>
        <Col span={8}>
          <Checkbox.Group
            className="unselectable"
            // @ts-ignore
            style={cssStyles.inputSelectSection}
            options={fabricLayerTypes}
            defaultValue={selectedFabricLayerTypes}
            onChange={(checkedValues) =>
              // @ts-ignore
              setSelectedFabricLayerTypes(checkedValues)
            }
          />
        </Col>
        <Col
          span={8}
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
        <MediaItemsTable
          data={newData}
          currentFabricLayerId={currentFabricLayerId}
          selectFabricLayer={selectFabricLayer}
          type={type}
        />
      </Row>
    </Content>
  );
}

export { MediaItemsTableView };
