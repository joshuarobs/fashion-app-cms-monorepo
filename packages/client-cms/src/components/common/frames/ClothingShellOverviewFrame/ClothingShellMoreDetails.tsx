import React from 'react';
import { Row, Table } from 'antd';
import { BreakdownsColourway } from '../../BreakdownsColourway';
import { BreakdownsElement } from '../../BreakdownsElement';

interface ClothingShellMoreDetailsProps {
  bodyGroupsData?: any;
  bodyGroupsColumns?: any;
  currentDefaultShellLayerId: number | null;
  currentDefaultLiningLayerId: number | null;
  hasChanged?: any;
  pageIsItem?: boolean;
  materialsData?: any;
}

function ClothingShellMoreDetails({
  bodyGroupsData,
  bodyGroupsColumns,
  currentDefaultShellLayerId,
  currentDefaultLiningLayerId,
  hasChanged,
  pageIsItem,
  materialsData,
}: ClothingShellMoreDetailsProps) {
  return (
    <>
      <Row
        style={{
          marginTop: 16,
        }}
      >
        <Table
          dataSource={bodyGroupsData}
          columns={bodyGroupsColumns}
          size="small"
          pagination={false}
          style={{ width: '100%' }}
        />
      </Row>
      <Row>
        {/*<BreakdownsElement title={"Colourway"} data={colourwayData} />*/}
        <BreakdownsColourway
          default_shell_layer_id={currentDefaultShellLayerId}
          default_lining_layer_id={currentDefaultLiningLayerId}
          hasChanged={hasChanged}
          pageIsItem={pageIsItem}
        />
      </Row>
      <Row>
        <BreakdownsElement title={'Materials'} data={materialsData} />
      </Row>
    </>
  );
}

export { ClothingShellMoreDetails };
