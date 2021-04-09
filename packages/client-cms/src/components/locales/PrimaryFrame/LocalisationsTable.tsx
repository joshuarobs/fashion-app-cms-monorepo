import React from 'react';
import { Table, Progress } from 'antd';
import { useQuery, gql } from '@apollo/client';
import { addKeysToArrayObjects } from '../../../utils/addKeysToArrayObjects';
import { Get_Locales } from '../../../queries/locales/getLocales';

const styles = {
  cell: {
    padding: '16px !important',
  },
};

interface LocalisationsTableProps {
  showActualValues?: boolean;
}

function LocalisationsTable({
  showActualValues = true,
}: LocalisationsTableProps) {
  const { loading, error, data } = useQuery(Get_Locales);

  if (loading) return <div />;
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }
  console.log('data:', data);

  // Iterate through all data and set keys
  const newData = addKeysToArrayObjects(data.getLocales);

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
      // size={size}
    />
  );
}

export { LocalisationsTable };
