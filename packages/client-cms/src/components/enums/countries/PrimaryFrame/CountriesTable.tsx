import React from 'react';
import { Table } from 'antd';
import { useQuery, gql } from '@apollo/client';
import { addKeysToArrayObjects } from '../../../../utils/addKeysToArrayObjects';
import { Get_Countries } from '../../../../queries/countries/getCountries';

const styles = {
  cell: {
    margin: 8,
    marginLeft: 16,
  },
};

interface CountriesTableProps {
  showActualValues?: boolean;
}

function CountriesTable({ showActualValues }: CountriesTableProps) {
  const { loading, error, data } = useQuery(Get_Countries);

  if (loading) return <div />;
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }
  console.log('data:', data);

  // Iterate through all data and set keys
  const newData = addKeysToArrayObjects(data.countries);

  const columns = [
    {
      title: 'Code',
      dataIndex: 'value',
      key: 'code',
      width: 250,
      render: (text: any) => {
        return <div style={styles.cell}>{text}</div>;
      },
    },
    {
      title: 'Name',
      dataIndex: 'description',
      key: 'name',
      width: 210,
      render: (text: any) => {
        return (
          <div style={styles.cell}>
            <span style={{ color: 'rgba(0, 0, 0, 1)' }}>
              {text.substring(0, 4)}
            </span>
            <span style={{ paddingLeft: '4px' }}> </span>
            <span>{text.substring(4, text.length)}</span>
          </div>
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

export { CountriesTable };
