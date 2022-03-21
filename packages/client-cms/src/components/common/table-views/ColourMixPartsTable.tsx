import React, { useState } from 'react';
import { Table, Row, Button } from 'antd';
import { TableType } from './TableType';
import _ from 'lodash';
// @ts-ignore
import Values from 'values.js';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

const color = new Values('#FFFFFF');
console.error('COLOR:', color);
console.log('getBrightness:', color.getBrightness());

interface ColourMixPartsTableProps {
  data: any;
  currentColourId?: number;
  selectColour?: Function;
  type?: TableType;
  size?: SizeType;
  onSelectEntry?: Function;
  onDeselectEntry?: Function;
  rowSelection: any;
  selectedRowKeys?: number[];
}

function ColourMixPartsTable({
  data,
  currentColourId,
  selectColour = () => {},
  type = TableType.All_List,
  size,
  onSelectEntry = () => {},
  onDeselectEntry = () => {},
  rowSelection = {},
  selectedRowKeys = [],
}: ColourMixPartsTableProps) {
  // console.log("selectedFabricLayerTypes:", selectedFabricLayerTypes);
  const marginLeft = size === 'middle' ? 16 : 8;

  console.log('data44:', data);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
      render: (text: any) => (
        <span
          style={{
            marginLeft,
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: 'Colour',
      dataIndex: '',
      key: 'colour',
      width: 100,
      render: (text: any, record: any) => {
        // console.log('text:', text);
        // console.log('record:', record);
        // console.log('record.colour.colour_code:', record.colour.colour_code);

        // Get the brightness of the colour
        const color = new Values(record.colour.colour_code);
        const brightness = color.getBrightness();

        // Should we draw a border or not, if the colour doesn't have enough
        // contrast with the background? (e.g. yellows, whites)
        const notEnoughContrast = brightness > 65;

        return (
          <Row
            style={{
              // display: "flex"
              marginLeft,
              minHeight: 32,
              alignContent: 'center',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                backgroundColor: record.colour.colour_code,
                borderRadius: '50%',
                border: notEnoughContrast ? '0.5px solid #d4d4d4' : '',
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
              {record.colour.name}
            </div>
          </Row>
        );
      },
    },
    // {
    //   title: 'Opacity',
    //   dataIndex: 'opacity',
    //   key: 'opacity',
    //   width: 40,
    //   render: (text: any, record: any) => {
    //     const opacity = record.colour.opacity;
    //     return (
    //       <span
    //         style={{
    //           marginLeft: 16,
    //         }}
    //       >
    //         {opacity}
    //       </span>
    //     );
    //   },
    // },
    {
      title: 'Colour ID',
      dataIndex: 'colour_id',
      key: 'colour_id',
      width: 40,
      render: (text: any) => (
        <span
          style={{
            marginLeft,
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: 'Percent Proportion',
      dataIndex: 'percent',
      key: 'percent',
      width: 40,
      render: (text: any) => (
        <span
          style={{
            marginLeft,
          }}
        >
          {_.round(text * 100, 2)}%
        </span>
      ),
    },
    {
      title: 'Fabric Layers Used In',
      dataIndex: '',
      key: 'fabric_layers',
      width: 70,
      render: (text: any, record: any) => {
        const count =
          record.fabric_layer_and_colour_mix_parts_aggregate.aggregate.count;
        return (
          <span
            style={{
              marginLeft,
            }}
          >
            {count > 0 ? count : ''}
          </span>
        );
      },
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
        title: 'Actions',
        dataIndex: '',
        key: 'actions',
        width: 64,
        render: (text: any) => (
          <span
            style={{
              marginLeft: marginLeft - 17,
            }}
          >
            <Button type="link">View Colour</Button>
          </span>
        ),
      });
      break;
    case TableType.Select_One:
      columns.push({
        title: 'Actions',
        dataIndex: '',
        key: 'actions',
        width: 64,
        render: (text: any, record: any) => {
          // console.log('RECORD:', record);
          const rowIsSelected = _.includes(selectedRowKeys, record.key);
          // console.log('rowIsSelected:', rowIsSelected);

          return (
            <span
              style={{
                marginLeft: marginLeft - 17,
              }}
            >
              <Button type="link">View Colour</Button> |
              {!rowIsSelected ? (
                <Button type="link" onClick={(e) => onSelectEntry(record, e)}>
                  Select
                </Button>
              ) : (
                <Button type="link" onClick={(e) => onDeselectEntry(record)}>
                  Deselect
                </Button>
              )}
            </span>
          );
        },
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
      rowSelection={rowSelection}
      columns={columns}
      dataSource={data}
      expandedRowRender={(record) => <p style={{ margin: 4 }}>{record.name}</p>}
      scroll={{ x: 300 }}
      pagination={{ pageSize: 20 }}
      size={size}
    />
  );
}

export { ColourMixPartsTable };
