import React, { useState } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Input, Button } from 'antd';
import { useQuery } from '@apollo/client';
import * as _ from 'lodash';
import { ClothingShellsTable } from '../../common/table-views/ClothingShellsTable';
import { TableType } from '../../common/table-views/TableType';
import { Get_Clothing_Shells_For_Clothing_Shells_Table_Latest } from '../../../queries/clothing_shells/getClothingShellsForClothingShellsTableLatest';

const { Content } = Layout;
const { Search } = Input;

// Prepare the enum fabric layer types to be displayed and used in a group
// of Checkboxes
// const fabricLayerTypes = Object.keys(FABRIC_LAYER_TYPES).map(key => {
//   return {
//     value: key,
//     label: enumToCamelCase(key)
//   };
// });

const cssStyles = {
  inputSelectSection: {
    marginLeft: 12,
  },
  inputSelectText: {
    marginRight: 8,
  },
  searchAndFilterButtons: {
    verticalAlign: 'middle',
    marginRight: 8,
  },
};

interface PrimaryFrameProps {
  layerType?: any;
  selectClothingShell: Function;
  currentClothingShellId?: number | null;
}

function PrimaryFrame({
  layerType,
  selectClothingShell,
  currentClothingShellId,
}: PrimaryFrameProps) {
  const [selectedFabricLayerTypes, setSelectedFabricLayerTypes] = useState([
    layerType,
  ]);

  const { loading, error, data } = useQuery(
    Get_Clothing_Shells_For_Clothing_Shells_Table_Latest
  );

  const [selectedRows, setSelectedRows] = useState([]);

  const rowSelection = {
    selectedRows,
    onChange: (selectedRows: any) => {
      setSelectedRows(selectedRows);
    },
  };

  if (loading) return <div />;
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }
  console.log('data2:', data);

  // Iterate through all data and set keys
  const newData = _.cloneDeep(
    data.getClothingShellsForClothingShellsTableLatest
  );
  newData.forEach((item: any, index: number) => {
    item.key = index;
  });

  // Get the number of all fabric layers
  // const totalNumber = data.fabric_layers_aggregate.aggregate.count;
  const numResults = data.getClothingShellsForClothingShellsTableLatest.length;

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
          Showing 1-{Math.min(numResults, 20)} of {numResults} results
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
        {/*<FabricLayersTable*/}
        {/*  data={newData}*/}
        {/*  currentFabricLayerId={currentFabricLayerId}*/}
        {/*  layerType={layerType}*/}
        {/*  selectedFabricLayerTypes={selectedFabricLayerTypes}*/}
        {/*  selectFabricLayer={selectFabricLayer}*/}
        {/*/>*/}
        {/*<ClothingShellsTable*/}
        {/*  currentClothingShellId={currentClothingShellId}*/}
        {/*  selectClothingShell={selectClothingShell}*/}
        {/*/>*/}
        <ClothingShellsTable
          data={newData}
          currentClothingShellId={currentClothingShellId}
          selectClothingShell={selectClothingShell}
          type={TableType.Select_One}
        />
      </Row>
    </Content>
  );
}

export { PrimaryFrame };
