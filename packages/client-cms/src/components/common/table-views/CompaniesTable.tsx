import React, { useState } from 'react';
import {
  SearchOutlined,
  CheckCircleOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { Table, Divider, Tag, Button, Avatar, Tooltip, Typography } from 'antd';
import { Link, useLocation, useParams } from 'react-router-dom';
import { RouteStrings } from '../../../routeStrings';
import dayjs from 'dayjs';
import { TableType } from './TableType';
import { DateLastUpdatedAgo } from '../DateLastUpdatedAgo';
import { companies } from '../../../utils/gql-interfaces/companies';

const { Text } = Typography;

interface CompaniesTableProps {
  data: companies[];
  currentCompanyId?: number;
  selectCompany?: Function;
  type: TableType;
}

function CompaniesTable({
  data,
  currentCompanyId,
  selectCompany = () => {},
  type,
}: CompaniesTableProps) {
  const columns = [
    {
      title: 'Image',
      dataIndex: 'logo_url',
      key: 'logo_url',
      // fixed: 'left',
      width: 84,
      render: (value: string) =>
        value ? (
          <Avatar
            shape="square"
            size="large"
            // src="https://pm1.narvii.com/6923/24e9471327fea2908547acc8593d945e06b7e1e9r1-620-435v2_128.jpg"
            src={value}
            style={{
              marginLeft: 16,
            }}
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
      render: (text: string, record: any) => {
        // console.log('record:', record);
        return (
          <Link to={RouteStrings.Companies__Company + '/' + record.id}>
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
      render: (text: any) => (
        <span
          style={{
            marginLeft: 16,
          }}
        >
          {text === true ? (
            <Tag icon={<CheckCircleOutlined />} color="green">
              <strong>Yes</strong>
            </Tag>
          ) : (
            <Tag>No</Tag>
          )}
        </span>
      ),
    },
    {
      title: 'Is Reseller',
      dataIndex: 'is_reseller',
      key: 'is_reseller',
      width: 110,
      render: (text: boolean) => (
        <span
          style={{
            marginLeft: 16,
          }}
        >
          {text === true ? (
            <Tag icon={<ShopOutlined />} color="cyan">
              <strong>Yes</strong>
            </Tag>
          ) : (
            <Tag>No</Tag>
          )}
        </span>
      ),
    },
    {
      title: 'Clothing',
      dataIndex: ['counts', 'item_count'],
      key: 'num_clothing',
      width: 90,
      render: (text: number) => (
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
      title: 'Collections',
      dataIndex: ['collections_aggregate', 'aggregate', 'count'],
      key: 'num_collections',
      width: 110,
      render: (text: number) => (
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
    //   title: "Rev.",
    //   dataIndex: "revision",
    //   key: "revision",
    //   width: 64
    // },
    {
      title: 'Closets',
      dataIndex: 'num_closets',
      key: 'num_closets',
      width: 101,
    },
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
      title: 'Last Updated',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: 140,
      render: (text: string) => (
        <div
          style={{
            marginLeft: 16,
          }}
        >
          <DateLastUpdatedAgo text={text} />
        </div>
      ),
    },
  ];

  switch (type) {
    case TableType.All_List:
      // columns.push({
      //   title: "Action",
      //   key: "action",
      //   width: 80,
      //   // Can't be put with expandedRowRender unfortunately
      //   // fixed: 'right',
      //   render: (text, record) => (
      //     <Link to={`${ROUTES.COMPANIES__COMPANY}/${record.id}`}>
      //       <Button shape="circle" icon={<SearchOutlined />} />
      //     </Link>
      //   )
      // });
      break;
    case TableType.Select_One:
      // @ts-ignore
      columns.push({
        title: 'Action',
        key: 'action',
        width: 80,
        // Can't be put with expandedRowRender unfortunately
        // fixed: 'right',
        render: (text, record) =>
          record.id === currentCompanyId ? (
            <div />
          ) : (
            <a onClick={() => selectCompany(record.id)}>Select</a>
          ),
      });
      break;
  }

  return (
    <Table
      style={{
        width: '100%',
        // calc(100vw - 304px)
      }}
      columns={columns}
      dataSource={data}
      expandedRowRender={(record) => <p style={{ margin: 0 }}>{record.name}</p>}
      pagination={{ pageSize: 20 }}
    />
  );
}

export { CompaniesTable };
