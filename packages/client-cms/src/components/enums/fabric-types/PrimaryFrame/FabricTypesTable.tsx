import React from 'react';
import { Table } from 'antd';
import { enumToCamelCase } from '../../../../utils/enumToCamelCase';
import { useQuery, gql } from '@apollo/client';
import { addKeysToArrayObjects } from '../../../../utils/addKeysToArrayObjects';
import { Get_Fabric_Types } from '../../../../queries/fabric_types/getFabricTypes';

const styles = {
  cell: {
    margin: 8,
    marginLeft: 16,
  },
};

interface FabricTypesTableProps {
  showActualValues: boolean;
}

function FabricTypesTable({ showActualValues }: FabricTypesTableProps) {
  const { loading, error, data } = useQuery(Get_Fabric_Types);

  if (loading) return <div />;
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }
  console.log('data:', data);

  // Iterate through all data and set keys
  const newData = addKeysToArrayObjects(data.getFabricTypes);

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

export { FabricTypesTable };
