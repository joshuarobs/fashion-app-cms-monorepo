import React from 'react';
import { Table } from 'antd';
import { enumToCamelCase } from '../../../utils/enumToCamelCase';
import { useQuery, gql } from '@apollo/client';
import { addKeysToArrayObjects } from '../../../utils/addKeysToArrayObjects';
import { Get_Genders } from '../../../queries/genders/getGenders';

const styles = {
  cell: {
    margin: 8,
    marginLeft: 16,
  },
};

interface GendersTableProps {
  showActualValues: boolean;
}

function GendersTable({ showActualValues }: GendersTableProps) {
  const { loading, error, data } = useQuery(Get_Genders);

  if (loading) return <div />;
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }
  // console.log("data:", data);

  // Iterate through all data and set keys
  const newData = addKeysToArrayObjects(data.getGenders);

  const columns = [
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      width: 250,
      render: (text: any) => {
        return (
          <div style={styles.cell}>
            {showActualValues ? text : enumToCamelCase(text)}
          </div>
        );
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 210,
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

export { GendersTable };
