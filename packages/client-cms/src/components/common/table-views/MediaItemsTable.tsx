import React, { useState } from 'react';
// @ts-ignore
import Values from 'values.js';
import { Table, Row, Button, Avatar, Tooltip, message, Col } from 'antd';
import { TableType } from './TableType';
import { CopyOutlined } from '@ant-design/icons';
import { DateLastUpdatedAgo } from '../DateLastUpdatedAgo';
import { Common } from '../../../strings';

const key = 'media-items-table';

interface MediaItemsTableProps {
  data: any;
  currentFabricLayerId?: number;
  selectFabricLayer?: Function;
  type: TableType;
}

function MediaItemsTable({
  data,
  currentFabricLayerId,
  selectFabricLayer = () => {},
  type,
}: MediaItemsTableProps) {
  // console.log("selectedFabricLayerTypes:", selectedFabricLayerTypes);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text: any, record: any) => {
        console.log('record:', record);

        return (
          <a
            style={{
              marginLeft: 16,
              padding: 0,
              paddingTop: 4,
              paddingBottom: 4,
            }}
          >
            <Avatar shape="square" size={48} src={record.url} />
            <span style={{ marginLeft: 8 }}>{text}</span>
          </a>
        );
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
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
      // We put it like this, so it appears as such:
      // Entries
      // Used In
      // We don't want Entries + Used on the same line as it looks bad
      title: (
        <div>
          <div>Entries</div> Used In
        </div>
      ),
      dataIndex: 'entries',
      // key: 'entries',
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
      title: 'UUID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (text: any) => (
        <Row
          style={{
            marginLeft: 16,
          }}
        >
          <Col span={17}>{`${text.slice(0, 6)}......${text.slice(
            30,
            36
          )}`}</Col>
          <Col span={7}>
            <Tooltip title="Copy to clipboard">
              <Button
                size="small"
                shape="circle"
                icon={
                  <CopyOutlined
                    style={{ opacity: 0.5 }}
                    onClick={async () => {
                      await navigator.clipboard.writeText(text);
                      message
                        .success(
                          { content: Common.Copied_To_Clipboard, key },
                          2
                        )
                        .then();
                    }}
                  />
                }
              />
            </Tooltip>
          </Col>
        </Row>
      ),
    },
    {
      title: 'Uploaded',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 64,
      render: (text: any) => (
        <div
          style={{
            marginLeft: 16,
          }}
        >
          <DateLastUpdatedAgo text={text} />
        </div>
      ),
    },
    {
      title: 'Last Updated',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: 64,
      render: (text: any, record: any) => {
        const newlyCreated = record.created_at === record.updated_at;
        return (
          <div
            style={{
              marginLeft: 16,
            }}
          >
            {newlyCreated ? '' : <DateLastUpdatedAgo text={text} />}
          </div>
        );
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
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
  ];

  // const [selectedRows, setSelectedRows] = useState([]);
  //
  // const rowSelection = {
  //   selectedRows,
  //   onChange: (selectedRows: any) => {
  //     setSelectedRows(selectedRows);
  //   },
  // };

  return (
    <Table
      style={{
        width: '100%',
        minWidth: 1000,
        // calc(100vw - 304px)
      }}
      // rowSelection={rowSelection}
      size="small"
      columns={columns}
      dataSource={data}
      expandedRowRender={(record) => <p style={{ margin: 0 }}>{record.name}</p>}
      scroll={{ x: 300 }}
      pagination={{ pageSize: 20 }}
    />
  );
}

export { MediaItemsTable };
