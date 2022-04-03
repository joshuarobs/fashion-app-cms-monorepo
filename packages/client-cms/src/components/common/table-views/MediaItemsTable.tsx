import React from 'react';
// @ts-ignore
import Values from 'values.js';
import { Avatar, Button, Col, message, Row, Table, Tooltip } from 'antd';
import { TableType } from './TableType';
import { CopyOutlined } from '@ant-design/icons';
import { DateLastUpdatedAgo } from '../DateLastUpdatedAgo';
import { Common } from '../../../strings';
import _ from 'lodash';

const key = 'media-items-table';

interface MediaItemsTableProps {
  data: any;
  currentFabricLayerId?: number;
  selectFabricLayer?: Function;
  type: TableType;
  isPopup?: boolean;
  onSelectEntry?: Function;
  onDeselectEntry?: Function;
  rowSelection: any;
  selectedRowKeys?: number[];
}

function MediaItemsTable({
  data,
  currentFabricLayerId,
  selectFabricLayer = () => {},
  type,
  isPopup,
  onSelectEntry = () => {},
  onDeselectEntry = () => {},
  rowSelection = {},
  selectedRowKeys = [],
}: MediaItemsTableProps) {
  // const marginLeft = size === 'middle' ? 16 : 8;
  const marginLeft = 16;
  // console.log("selectedFabricLayerTypes:", selectedFabricLayerTypes);

  const scroll = {
    x: 300,
  };

  if (isPopup) {
    Object.assign(scroll, { y: 400 });
  }

  /**
   * This variable makes the splicing of UUID from default of 6 characters
   * each side, to 4, for a popup table, where the width of the modal is
   * small, and we want the UUID to be on a single line instead of two lines.
   */
  const uuidSpliceDiff = !isPopup ? 0 : 2;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text: any, record: any) => {
        // console.log('record:', record);

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
          <Col span={17}>{`${text.slice(
            0,
            6 - uuidSpliceDiff
          )}......${text.slice(30 + uuidSpliceDiff, 36)}`}</Col>
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
    // {
    //   title: 'Actions',
    //   dataIndex: 'actions',
    //   width: 80,
    //   render: (text: any) => (
    //     <span
    //       style={{
    //         marginLeft: 16,
    //       }}
    //     >
    //       {text}
    //     </span>
    //   ),
    // },
  ];

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
    case TableType.Select_Multiple:
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
                display: 'block',
                userSelect: 'none',
              }}
            >
              {!rowIsSelected ? (
                <a onClick={(e) => onSelectEntry(record, e)}>Select</a>
              ) : (
                <a onClick={(e) => onDeselectEntry(record, e)}>Deselect</a>
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
      size="small"
      columns={columns}
      dataSource={data}
      expandedRowRender={(record) => <p style={{ margin: 0 }}>{record.name}</p>}
      scroll={scroll}
      pagination={{ pageSize: 20 }}
    />
  );
}

export { MediaItemsTable };
