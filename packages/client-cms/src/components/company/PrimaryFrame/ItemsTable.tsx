import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Table, Button, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { RouteStrings } from '../../../routeStrings';
import { useQuery } from '@apollo/client';
import { addKeysToArrayObjects } from '../../../utils/addKeysToArrayObjects';
import { Get_Companies } from '../../../queries/companies/getCompanies';

const columns = [
  {
    title: 'Image',
    dataIndex: 'logo_url',
    key: 'logo_url',
    // fixed: 'left',
    width: 84,
    /*render: () => <Empty style={{
      backgroundColor: 'white',
      borderRadius: 4,
    }} description={false} image={Empty.PRESENTED_IMAGE_SIMPLE}/>*/
    render: (value: any) =>
      value ? (
        <Avatar
          shape="square"
          size="large"
          // src="https://pm1.narvii.com/6923/24e9471327fea2908547acc8593d945e06b7e1e9r1-620-435v2_128.jpg"
          src={value}
        />
      ) : (
        <></>
      ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // fixed: 'left',
    width: 156,
    render: (text: any, record: any) => {
      // console.log('record:', record);
      return (
        <Link to={RouteStrings.Items__Clothing__Item + '/' + record.id}>
          {text}
        </Link>
      );
    },
  },
  {
    title: 'Is Affiliate',
    dataIndex: 'is_affiliate',
    key: 'is_affiliate',
    width: 110,
    render: (text: any) => <span>{text === true ? 'True' : 'False'}</span>,
  },
  {
    title: 'Is Reseller',
    dataIndex: 'is_reseller',
    key: 'is_reseller',
    width: 110,
    render: (text: any) => <span>{text === true ? 'True' : 'False'}</span>,
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
  },
  {
    title: 'Clothing',
    dataIndex: 'items_aggregate.aggregate.count',
    key: 'num_clothing',
    width: 90,
  },
  {
    title: 'Collections',
    dataIndex: 'collections_aggregate.aggregate.count',
    key: 'num_collections',
    width: 110,
  },
  {
    title: 'Rev.',
    dataIndex: 'revision',
    key: 'revision',
    width: 64,
  },
  {
    title: 'Closets',
    dataIndex: 'num_closets',
    key: 'num_closets',
    width: 101,
  },
  {
    title: 'Action',
    key: 'action',
    width: 80,
    // Can't be put with expandedRowRender unfortunately
    // fixed: 'right',
    render: (text: any, record: any) => (
      <Link to={RouteStrings.Items}>
        <Button shape="circle" icon={<SearchOutlined />} />
      </Link>
    ),
  },
];

const placeholderDataItem = {
  key: 1,
  image: '',
  name: 'adidas',
  is_affiliate: false,
  is_reseller: false,
  id: 10,
  clothing: 10578,
  collections: 195,
  revision: 1,
  num_closets: '10,000 (0.01%)',
};

interface ItemsTableProps {
  show: number;
}

function ItemsTable({ show }: ItemsTableProps) {
  const { loading, error, data } = useQuery(Get_Companies);

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
  const newData = addKeysToArrayObjects(data.companies);

  return (
    <Table
      style={{
        width: '100%',
        // calc(100vw - 304px)
      }}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={newData}
      expandedRowRender={(record) => <p style={{ margin: 0 }}>{record.name}</p>}
      scroll={{ x: 300 }}
      pagination={{ pageSize: show }}
    />
  );
}

export { ItemsTable };
