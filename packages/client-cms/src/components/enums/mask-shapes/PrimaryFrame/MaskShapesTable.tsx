import React from 'react';
import { Table } from 'antd';
import { enumToCamelCase } from '../../../../utils/enumToCamelCase';
import { useQuery, gql } from '@apollo/client';
import { addKeysToArrayObjects } from '../../../../utils/addKeysToArrayObjects';
import { Get_Mask_Shapes } from '../../../../queries/mask_shapes/getMaskShapes';

const styles = {
  cell: {
    margin: 8,
    marginLeft: 16,
  },
};

interface MaskShapesTableProps {
  showActualValues: boolean;
}

function MaskShapesTable({ showActualValues }: MaskShapesTableProps) {
  const { loading, error, data } = useQuery(Get_Mask_Shapes);

  if (loading) return <div />;
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }
  console.log('data:', data);

  // Iterate through all data and set keys
  const newData = addKeysToArrayObjects(data.body_segment_mask_shapes);

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

export { MaskShapesTable };
