import React, { useState } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Input, Layout, Row, Select } from 'antd';
import { FabricLayerType } from '@joshuarobs/clothing-framework/build/enums';
import { enumToCamelCase } from '../../../utils/enumToCamelCase';
import { gql, useQuery } from '@apollo/client';
import { FabricLayersTableView } from '../../common/table-views/FabricLayersTableView';

const { Content } = Layout;
const { Option } = Select;
const { Search } = Input;

// Prepare the enum fabric layer types to be displayed and used in a group
// of Checkboxes
const fabricLayerTypes = Object.keys(FabricLayerType).map((key) => {
  // console.log("key:", key);
  return {
    value: key,
    label: enumToCamelCase(key),
  };
});

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

function PrimaryFrame() {
  // const [showActualValues, toggleShowActualValues] = useState(false);

  const [selectedFabricLayerTypes, setSelectedFabricLayerTypes] = useState([]);

  // console.log('selectedFabricLayerTypes:', selectedFabricLayerTypes);
  const selectedEnumArray = JSON.stringify(selectedFabricLayerTypes).replace(
    /"/g,
    ''
  );
  const filters =
    selectedFabricLayerTypes.length > 0
      ? `where: { fabric_layer_type: { _in: ${selectedEnumArray} } }`
      : '';

  const GET_FABRIC_LAYERS = gql`
      query getFabricLayers {
          fabric_layers_aggregate {
              aggregate {
                  count
              }
          }
          fabric_layers(
              order_by: { updated_at: desc }
              ${filters}
              limit: 20
          ) {
              id
              thickness
              insulation
              density
              permeability
              fabric_layer_and_colour_mix_parts {
                  fabric_layer_id
                  colour_mix_part_id
                  colour_mix_part {
                      id
                      percent
                      colour {
                          id
                          name
                      }
                  }
              }
          }
      }
  `;

  const { loading, error, data } = useQuery(GET_FABRIC_LAYERS);

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
  console.log('data:', data);

  // Iterate through all data and set keys
  // const newData = [...data.companies, ...placeholderData];
  // const newData = _.cloneDeep(data.fabric_layers);
  // newData.forEach((item, index) => {
  //   item.key = index;
  // });

  // Get the number of all fabric layers
  // const totalNumber = data.fabric_layers_aggregate.aggregate.count;
  const totalNumber = 1000;

  return (
    <Content
      style={{
        padding: 24,
        background: '#fff',
        minHeight: 280,
        margin: '0px 12px 0px 12px',
      }}
    >
      <Row>
        <Col span={14}>
          Showing 1-{Math.min(totalNumber, 20)} of {totalNumber} results
        </Col>
        <Col
          span={10}
          style={{
            textAlign: 'end',
          }}
        >
          <Checkbox.Group
            className="unselectable"
            style={cssStyles.inputSelectSection}
            options={fabricLayerTypes}
            defaultValue={selectedFabricLayerTypes}
            onChange={(checkedValues) =>
              // @ts-ignore
              setSelectedFabricLayerTypes(checkedValues)
            }
          />
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
        {/*  selectedFabricLayerTypes={selectedFabricLayerTypes}*/}
        {/*/>*/}
        <FabricLayersTableView />
      </Row>
    </Content>
  );
}

export default PrimaryFrame;
