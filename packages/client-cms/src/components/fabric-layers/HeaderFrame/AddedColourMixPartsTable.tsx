import React, { useState } from 'react';
import { Table, Row } from 'antd';
import { generateOverviewTreeFabricLayerData } from '../../../utils/generateOverviewTreeFabricLayerData';
import { Base_Colours } from '../../../utils/baseColours';
import { enumToCamelCase } from '../../../utils/enumToCamelCase';

interface FabricLayersTableProps {
  data: any;
}

function AddedColourMixPartsTable({ data }: FabricLayersTableProps) {
  // console.log("selectedFabricLayerTypes:", selectedFabricLayerTypes);

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
          {text}
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
      title: 'Colour Group',
      dataIndex: 'colour_group',
      key: 'colour_group',
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
      title: 'Colour Code',
      dataIndex: 'colour_code',
      key: 'colour_code',
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
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
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

  // switch (type) {
  //   case TableType.All_List:
  //     // columns.push({
  //     //   title: "Action",
  //     //   key: "action",
  //     //   width: 80,
  //     //   // Can't be put with expandedRowRender unfortunately
  //     //   // fixed: 'right',
  //     //   render: (text, record) => (
  //     //     <Link to={`${ROUTES.COMPANIES__COMPANY}/${record.id}`}>
  //     //       <Button shape="circle" icon={<SearchOutlined />} />
  //     //     </Link>
  //     //   )
  //     // });
  //     break;
  //   case TableType.Select_One:
  //     columns.push({
  //       title: 'Action',
  //       key: 'action',
  //       width: 80,
  //       // Can't be put with expandedRowRender unfortunately
  //       // fixed: 'right',
  //       render: (text, record) =>
  //         record.id === currentFabricLayerId ? (
  //           <a
  //             style={{
  //               cursor: 'default',
  //               visibility: 'hidden',
  //             }}
  //           >
  //             Test
  //           </a>
  //         ) : (
  //           <a onClick={() => selectFabricLayer(record.id)}>Select</a>
  //         ),
  //     });
  //     break;
  // }

  return (
    <Table
      size="small"
      style={{
        width: '100%',
        minWidth: 932,
        // calc(100vw - 304px)
      }}
      // rowSelection={rowSelection}
      columns={columns}
      dataSource={data}
      scroll={{ x: 300 }}
      pagination={{ pageSize: 20 }}
    />
  );
}

export { AddedColourMixPartsTable };
