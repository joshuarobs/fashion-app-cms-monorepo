import React, { useState } from 'react';
import { Table, Row } from 'antd';
import { generateOverviewTreeFabricLayerData } from '../../../utils/generateOverviewTreeFabricLayerData';
import { Base_Colours } from '../../../utils/baseColours';
import { enumToCamelCase } from '../../../utils/enumToCamelCase';
import _ from 'lodash';

interface FabricLayersTableProps {
  data: any;
  loading: boolean;
  isPopup?: boolean;
  isTwoColumns?: boolean;
}

function AddedColourMixPartsTable({
  data,
  loading,
  isPopup,
  isTwoColumns,
}: FabricLayersTableProps) {
  console.log('AddedColourMixPartsTable#data:', data);
  // console.log("selectedFabricLayerTypes:", selectedFabricLayerTypes);
  let minWidth = 0;
  if (isPopup) {
    minWidth = 932;
  } else if (isTwoColumns) {
    minWidth = 804;
  }

  const columns = [
    {
      title: 'Percent',
      dataIndex: 'percent',
      key: 'percent',
      width: 60,
      render: (text: any) => (
        <span
          style={{
            marginLeft: 16,
          }}
        >
          {_.round(text * 100, 2)}%
        </span>
      ),
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
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
      title: 'Name',
      key: 'name',
      width: 120,
      render: (text: any, record: any) => {
        // console.log('record:', record);

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
                backgroundColor: record.colour.colour_code,
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
              {record.colour.name}
            </div>
          </Row>
        );
      },
    },
    {
      title: 'Colour Group',
      dataIndex: 'colour_group',
      key: 'colour_group',
      width: 80,
      render: (text: any, record: any) => (
        <span
          style={{
            marginLeft: 16,
          }}
        >
          {record.colour.base_colour}
        </span>
      ),
    },
    {
      title: 'Colour Code',
      dataIndex: 'colour_code',
      key: 'colour_code',
      width: 80,
      render: (text: any, record: any) => (
        <span
          style={{
            marginLeft: 16,
          }}
        >
          {record.colour.colour_code}
        </span>
      ),
    },
    {
      title: 'Opacity',
      dataIndex: 'opacity',
      key: 'opacity',
      width: 60,
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
      title: 'Companies',
      dataIndex: 'companies',
      key: 'companies',
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
  ];

  return (
    <Table
      size="small"
      style={{
        width: '100%',
        minWidth,
        // calc(100vw - 304px)
      }}
      // rowSelection={rowSelection}
      columns={columns}
      dataSource={data}
      scroll={{ x: 300 }}
      pagination={{ pageSize: 20 }}
      loading={loading}
    />
  );
}

export { AddedColourMixPartsTable };
