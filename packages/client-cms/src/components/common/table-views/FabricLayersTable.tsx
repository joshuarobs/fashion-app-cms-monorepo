import React, { useState } from 'react';
import { Table, Row, Button } from 'antd';
import { generateOverviewTreeFabricLayerData } from '../../../utils/generateOverviewTreeFabricLayerData';
import { Base_Colours } from '../../../utils/baseColours';
import { enumToCamelCase } from '../../../utils/enumToCamelCase';
import { TableType } from './TableType';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { RouteStrings } from '../../../routeStrings';

interface FabricLayersTableProps {
  data: any;
  currentFabricLayerId?: number;
  selectFabricLayer?: Function;
  type: TableType;
}

function FabricLayersTable({
  data,
  currentFabricLayerId,
  selectFabricLayer = () => {},
  type,
}: FabricLayersTableProps) {
  // console.log("selectedFabricLayerTypes:", selectedFabricLayerTypes);

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

        console.log('record:', record);

        // @ts-ignore
        return colours.map((colour) => {
          let circleColour = '#000';
          const colorName = colour.baseColour;
          const colorTitle = colour.title;
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
                minHeight: 32,
                alignContent: 'center',
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
                {colorTitle}
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
          {text && text > 0 ? text : ''}
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
      title: 'Type',
      dataIndex: 'fabric_layer_type',
      key: 'fabric_layer_type',
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
  ];

  // const [selectedRows, setSelectedRows] = useState([]);
  //
  // const rowSelection = {
  //   selectedRows,
  //   onChange: (selectedRows: any) => {
  //     setSelectedRows(selectedRows);
  //   },
  // };

  switch (type) {
    case TableType.All_List:
      columns.push({
        title: 'Action',
        key: 'action',
        width: 80,
        // Can't be put with expandedRowRender unfortunately
        // fixed: 'right',
        render: (text, record) => (
          <Link
            to={`${RouteStrings.Fabric_Layers__Fabric_Layer}/${record.id}`}
            style={{ padding: 0 }}
          >
            <Button type="link">View Colour</Button>
          </Link>
        ),
      });
      break;
    case TableType.Select_One:
      columns.push({
        title: 'Action',
        key: 'action',
        width: 80,
        // Can't be put with expandedRowRender unfortunately
        // fixed: 'right',
        render: (text, record) =>
          record.id === currentFabricLayerId ? (
            <a
              style={{
                cursor: 'default',
                visibility: 'hidden',
              }}
            >
              Test
            </a>
          ) : (
            <a onClick={() => selectFabricLayer(record.id)}>Select</a>
          ),
      });
      break;
  }

  return (
    <Table
      style={{
        width: '100%',
        minWidth: 1000,
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

export { FabricLayersTable };
