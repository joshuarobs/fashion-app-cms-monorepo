import React from 'react';
import { Table, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useQuery, gql } from '@apollo/client';
import { addKeysToArrayObjects } from '../../../utils/addKeysToArrayObjects';
import { Routes } from '../../../routes';
import { Link } from 'react-router-dom';
import { Get_Staff_Users } from '../../../queries/staff_users/getStaffUsers';

const size = 'small';

const styles = {
  cell: {
    padding: '16px !important',
  },
};

interface UsersTableProps {
  showActualValues?: boolean;
}

function UsersTable({ showActualValues }: UsersTableProps) {
  const { loading, error, data } = useQuery(Get_Staff_Users);

  if (loading) return <div />;
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }
  console.log('data:', data);

  // Iterate through all data and set keys
  const newData = addKeysToArrayObjects(data.staff_users);

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar_url',
      key: 'avatar',
      width: 100,
      render: (text: any) => {
        return (
          <span role="enum" style={styles.cell}>
            <Avatar icon={<UserOutlined />} />
          </span>
        );
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 150,
      render: (text: any) => {
        return (
          <span role="enum" style={styles.cell}>
            {text}
          </span>
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 210,
      render: (text: any) => {
        return (
          <span role="enum" style={styles.cell}>
            {text}
          </span>
        );
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 150,
      render: (text: any) => {
        return (
          <span role="enum" style={styles.cell}>
            {text}
          </span>
        );
      },
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 150,
      render: (text: any) => {
        return (
          <span role="enum" style={styles.cell}>
            {text}
          </span>
        );
      },
    },
    {
      title: 'Last Online',
      dataIndex: 'last_online',
      key: 'last_online',
      width: 120,
      render: (text: any) => {
        return (
          <span role="enum" style={styles.cell}>
            {text}
          </span>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      render: () => {
        return (
          <Link
            to={Routes.Items__Clothing__Item}
            role={size}
            style={{
              marginLeft: 8,
            }}
          >
            View
          </Link>
        );
      },
    },
  ];

  return (
    <Table
      style={{
        width: '100%',
        // calc(100vw - 304px)
      }}
      columns={columns}
      dataSource={newData}
      pagination={false}
    />
  );
}

export { UsersTable };
