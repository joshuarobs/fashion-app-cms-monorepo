import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Table, Divider, Tag, Button, Avatar, Row } from 'antd';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Routes } from '../../../routes';
import { generateOverviewTreeFabricLayerData } from '../../../utils/generateOverviewTreeFabricLayerData';
import { Base_Colours } from '../../../utils/baseColours';
import { enumToCamelCase } from '../../../utils/enumToCamelCase';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
    render: (text: any) => (
      <span
        style={{
          marginLeft: 16,
        }}
      >
        {text}
      </span>
    ),
  },
  {
    title: 'Fabric',
    dataIndex: 'fabric',
    key: 'fabric',
    width: 80,
    render: (text: any) => (
      <span
        style={{
          marginLeft: 16,
        }}
      >
        {text}
      </span>
    ),
  },
  {
    title: 'Materials',
    dataIndex: 'materials',
    key: 'materials',
    width: 120,
    render: (text: any) => (
      <span
        style={{
          marginLeft: 16,
        }}
      >
        {text}
      </span>
    ),
  },
  {
    title: 'Colours',
    key: 'colours',
    width: 120,
    render: (text: any, record: any) => {
      const colours = generateOverviewTreeFabricLayerData(
        record,
        null,
        0,
        true,
        false
      );
      console.log('colours:', colours);

      // @ts-ignore
      return colours.map((colour) => {
        let circleColour = '#000';
        const colorName = colour.baseColour;
        const matchingBaseColour = Base_Colours.find(
          ({ name }) => enumToCamelCase(name) === colorName
        );
        console.log('matchingBaseColour:', matchingBaseColour);
        if (matchingBaseColour) {
          circleColour = matchingBaseColour.color;
        }

        return (
          <Row
            style={{
              // display: "flex"
              marginLeft: 16,
            }}
          >
            <div
              style={{
                display: 'inline-block',
                backgroundColor: circleColour,
                borderRadius: '50%',
                width: 14,
                height: 14,
                margin: 4,
                marginRight: 5,
              }}
            />
            <div
              style={{
                display: 'inline-block',
              }}
            >
              {colorName}
            </div>
          </Row>
        );
      });
    },
  },
  {
    title: 'Colour Pattern',
    dataIndex: 'fabric',
    key: 'fabric',
    width: 100,
    render: (text: any) => (
      <span
        style={{
          marginLeft: 16,
        }}
      >
        {text}
      </span>
    ),
  },
  {
    title: 'Thickness (mm)',
    dataIndex: 'thickness',
    key: 'thickness',
    width: 80,
    render: (text: any) => (
      <span
        style={{
          marginLeft: 16,
        }}
      >
        {text}
      </span>
    ),
  },
  // {
  //   title: "icl",
  //   dataIndex: "insulation",
  //   key: "insulation",
  //   width: 80
  // },
  // {
  //   title: "Density",
  //   dataIndex: "density",
  //   key: "density",
  //   width: 80
  // },
  // {
  //   title: "Perm.",
  //   dataIndex: "permeability",
  //   key: "permeability",
  //   width: 80
  // },
  {
    title: 'Rev.',
    dataIndex: 'revision',
    key: 'revision',
    width: 64,
    render: (text: any) => (
      <span
        style={{
          marginLeft: 16,
        }}
      >
        {text}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    width: 80,
    // Can't be put with expandedRowRender unfortunately
    // fixed: 'right',
    render: (text: any, record: any) => (
      <Link to={Routes.Items}>
        <Button shape="circle" icon={<SearchOutlined />} />
      </Link>
    ),
  },
];

// console.log("fabricLayerTypes:", fabricLayerTypes);

interface FabricLayersTableProps {
  data: any;
  selectedFabricLayerTypes: any;
}

function FabricLayersTable22({
  data,
  selectedFabricLayerTypes,
}: FabricLayersTableProps) {
  console.log('selectedFabricLayerTypes:', selectedFabricLayerTypes);

  // const [selectedRows, setSelectedRows] = useState([]);
  //
  // const rowSelection = {
  //   selectedRows,
  //   onChange: (selectedRows) => {
  //     setSelectedRows(selectedRows);
  //   },
  // };

  return (
    <Table
      style={{
        width: '100%',
        // calc(100vw - 304px)
      }}
      // rowSelection={rowSelection}
      columns={columns}
      dataSource={data}
      expandedRowRender={(record) => <p style={{ margin: 0 }}>{record.name}</p>}
      scroll={{ x: 300 }}
      pagination={{ pageSize: 20 }}
    />
  );
}

export { FabricLayersTable22 };
