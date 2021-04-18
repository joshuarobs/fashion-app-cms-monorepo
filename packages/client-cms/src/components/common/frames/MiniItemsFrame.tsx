import React from 'react';
import { Layout, Row, Col, Button, Typography, Table, Avatar } from 'antd';

import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Routes } from '../../../routes';
import { FrameTitle } from '../typography/FrameTitle';
import { addKeysToArrayObjects } from '../../../utils/addKeysToArrayObjects';
import { SyncOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Content } = Layout;

const size = 'small';

const itemsOverviewColumns = [
  {
    title: 'Image',
    key: 'image',
    width: 84,
    render: (record: any) => {
      // console.log("record 1:", record);
      return (
        <Link
          to={Routes.Items__Clothing__Item + '/' + record.item_id}
          role={size}
        >
          <Avatar
            shape="square"
            size="large"
            src="https://pm1.narvii.com/6923/24e9471327fea2908547acc8593d945e06b7e1e9r1-620-435v2_128.jpg"
          />
        </Link>
      );
    },
  },
  {
    title: 'Name',
    key: 'name',
    width: 180,
    render: (record: any) => {
      // console.log("record 2:", record);
      return (
        <Link
          to={`${Routes.Items__Clothing__Item}/${record.item_id}?rev=${record.revision}`}
          role={size}
        >
          {record.item_maindata[0].name}
        </Link>
      );
    },
  },
  {
    title: 'Short ID',
    key: 'short_id',
    render: (record: any) => {
      // console.log("record 2:", record);
      return (
        <Link
          to={`${Routes.Items__Clothing__Item}/${record.item_id}?rev=${record.revision}`}
          role={size}
        >
          {record.item_maindata[0].short_id}
        </Link>
      );
    },
  },
];

interface MiniItemsFrameProps {
  id: number;
  count: number;
  query: any;
  viewAll?: boolean;
  updateCount?: any;
  queryChildObjectName: string;
}

function MiniItemsFrame({
  id,
  count,
  query,
  viewAll,
  updateCount,
  queryChildObjectName = '',
}: MiniItemsFrameProps) {
  const { loading, error, data } = useQuery(query, {
    variables: { id },
  });

  if (loading) return <div />;
  if (error) return <div>Error! ${error}</div>;
  // console.log("MiniItemsFrame > data:", data);

  // const items = addKeysToArrayObjects(data.items);
  const items = addKeysToArrayObjects(data[queryChildObjectName]);
  console.log('items:', items);
  // const items = [];

  return (
    <Content
      style={{
        minHeight: 280,
        maxWidth: 412,
      }}
    >
      <div
        style={{
          padding: 16,
          background: '#fff',
          borderRadius: 4,
        }}
      >
        <Row>
          <FrameTitle text="Items" count={count} />
          <Col
            span={8}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            {updateCount && (
              <Button
                size={size}
                onClick={updateCount}
                icon={<SyncOutlined />}
                style={{
                  marginRight: 8,
                }}
              >
                Update Count
              </Button>
            )}
            {/* @ts-ignore */}
            <Button size={size} onClick={viewAll}>
              View All
            </Button>
          </Col>
        </Row>
        <Row
          style={{
            marginTop: 16,
          }}
        >
          <Table
            dataSource={items}
            columns={itemsOverviewColumns}
            size="small"
            pagination={false}
            style={{
              width: '100%',
            }}
          />
        </Row>
      </div>
    </Content>
  );
}

export { MiniItemsFrame };
