import React from 'react';
import { Table } from 'antd';
import { enumToCamelCase } from '../../../../utils/enumToCamelCase';
import { useQuery, gql } from '@apollo/client';
import { addKeysToArrayObjects } from '../../../../utils/addKeysToArrayObjects';
import { Get_Materials } from '../../../../queries/materials/getMaterials';

const styles = {
  cell: {
    margin: 8,
    marginLeft: 16,
  },
};

interface MaterialsTableProps {
  showActualValues: boolean;
}

function MaterialsTable({ showActualValues }: MaterialsTableProps) {
  const { loading, error, data } = useQuery(Get_Materials);

  if (loading) return <div />;
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }
  console.log('data:', data);

  // Iterate through all data and set keys
  const newData = addKeysToArrayObjects(data.getMaterials);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (text: any) => {
        return <div style={styles.cell}>{text}</div>;
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      render: (text: any) => {
        return (
          <div style={styles.cell}>
            {showActualValues ? text : enumToCamelCase(text)}
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

export { MaterialsTable };
