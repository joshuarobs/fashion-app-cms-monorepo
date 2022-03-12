import React, { useState } from 'react';
import { Table, Row } from 'antd';
import { generateOverviewTreeFabricLayerData } from '../../../utils/generateOverviewTreeFabricLayerData';
import { Base_Colours } from '../../../utils/baseColours';
import { enumToCamelCase } from '../../../utils/enumToCamelCase';
import { TableType } from './TableType';
import { DateLastUpdatedAgo } from '../DateLastUpdatedAgo';

interface ColoursTableProps {
  data: any;
  currentColourId?: number;
  selectColour?: Function;
  type: TableType;
}

function ColoursTable({
  data,
  currentColourId,
  selectColour = () => {},
  type,
}: ColoursTableProps) {
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 80,
      render: (text: any, record: any) => {
        console.log('text:', text);
        console.log('record:', record);

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
                backgroundColor: record.colour_code,
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
              {text}
            </div>
          </Row>
        );
      },
    },
    {
      title: 'Colour Group',
      dataIndex: 'base_colour',
      key: 'base_colour',
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
      title: 'Colour Code',
      dataIndex: 'colour_code',
      key: 'colour_code',
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
      title: 'Opacity',
      dataIndex: 'opacity',
      key: 'opacity',
      width: 70,
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
      title: 'Last Updated',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: 64,
      render: (text: any) => (
        <span
          style={{
            marginLeft: 16,
          }}
        >
          <DateLastUpdatedAgo text={text} />
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
  //       // @ts-ignore
  //       render: (text: any, record: any) =>
  //         record.id === currentColourId ? (
  //           <a
  //             style={{
  //               cursor: 'default',
  //               visibility: 'hidden',
  //             }}
  //           >
  //             Test
  //           </a>
  //         ) : (
  //           <a onClick={() => selectColour(record.id)}>Select</a>
  //         ),
  //     });
  //     break;
  // }

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
      expandedRowRender={(record) => <p style={{ margin: 4 }}>{record.name}</p>}
      scroll={{ x: 300 }}
      pagination={{ pageSize: 20 }}
    />
  );
}

export { ColoursTable };
