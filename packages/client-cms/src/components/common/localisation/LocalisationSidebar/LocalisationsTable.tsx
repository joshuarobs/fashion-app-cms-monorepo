import React, { useState } from 'react';
import { Table, Divider, Tag, Button, Avatar, Progress } from 'antd';
import { useQuery, gql } from '@apollo/client';
import { addKeysToArrayObjects } from '../../../../utils/addKeysToArrayObjects';
import { Locale_Sidebar_Order } from './localeSidebarOrders';
import { Get_Locales } from '../../../../queries/locales/getLocales';

const size = 'small';

const styles = {
  cell: {
    padding: '16px !important',
  },
};

interface LocalisationsTableProps {
  selectLocale: any;
  locales: any;
}

function LocalisationsTable({
  selectLocale,
  locales,
}: LocalisationsTableProps) {
  const { loading, error, data } = useQuery(Get_Locales);

  if (loading) return <div />;
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }
  console.log('data:', data);

  console.log('locales:', locales);

  // Iterate through all data and set keys
  const newData = addKeysToArrayObjects(data.getLocales);

  // Add whether the item has the locale already or not
  // const newData2 = _.cloneDeep(newData);
  const newData2 = newData.map((data: any) => {
    const alreadyAdded =
      // @ts-ignore
      locales.find(({ code }) => code === data.code) !== undefined;

    // Add ordering to it
    // @ts-ignore
    const order = Locale_Sidebar_Order[data.code];

    return {
      ...data,
      alreadyAdded,
      order,
    };
  });
  console.log('newData2:', newData2);

  // Sort the data by putting those that aren't yet selected at the top
  const sortedLocales = newData2
    .sort((a: any, b: any) => (a.order > b.order ? 1 : -1))
    .sort((a: any, b: any) => a.alreadyAdded - b.alreadyAdded);
  console.log('sortedLocales:', sortedLocales);

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      width: 100,
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
          <div
            style={{
              // padding: "16px important!",
              margin: '12px',
            }}
          >
            <span style={{ color: 'rgba(0, 0, 0, 1)' }}>
              {text.substring(0, 4)}
            </span>
            <span style={{ paddingLeft: '4px' }}> </span>
            <span>{text.substring(4, text.length)}</span>
          </div>
        );
      },
    },
    {
      title: 'Language',
      dataIndex: ['language', 'description'],
      key: 'language',
      width: 150,
      render: (text: any) => {
        return (
          <span role="enum" style={styles.cell}>
            <span>{text.substring(4, text.length)}</span>
          </span>
        );
      },
      // render: text => {
      //   return showActualValues ? text : enumToCamelCase(text);
      // }
    },
    {
      title: 'Country',
      dataIndex: ['country', 'description'],
      key: 'code',
      width: 150,
      render: (text: any) => {
        return (
          <span role="enum" style={styles.cell}>
            <span>{text.substring(4, text.length)}</span>
          </span>
        );
      },
      // render: text => {
      //   return showActualValues ? text : enumToCamelCase(text);
      // }
    },
    {
      title: 'Progress',
      dataIndex: 'code',
      key: 'code',
      width: 250,
      render: (text: any) => {
        return (
          <div
            role="enum"
            style={{
              marginLeft: 16,
              marginRight: 16,
              marginTop: 12,
              marginBottom: 12,
            }}
          >
            <Progress percent={30} size="small" />
          </div>
        );
      },
      // render: text => {
      //   return showActualValues ? text : enumToCamelCase(text);
      // }
    },
    {
      title: 'Action',
      key: 'action',
      width: 80,
      // Can't be put with expandedRowRender unfortunately
      // fixed: 'right',
      // render: (text, record) =>
      //   record.id === currentClothingShellId ? (
      //     <div />
      //   ) : (
      //     <a onClick={() => selectClothingShell(record.id)}>Select</a>
      //   )
      render: (text: any, record: any) => {
        console.log('record:', record);
        // @ts-ignore
        if (locales.find(({ code }) => code === record.code)) {
          return <div />;
        } else {
          return <a onClick={() => selectLocale(record.code)}>Select</a>;
        }
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
      dataSource={sortedLocales}
      pagination={false}
      // size={size}
    />
  );
}

export { LocalisationsTable };
