import React from 'react';
import { WarningFilled } from '@ant-design/icons';
import { Table, Typography, Avatar, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { Routes } from '../../../routes';
import { red } from '@ant-design/colors';
import { addKeysToArrayObjects } from '../../../utils/addKeysToArrayObjects';
// import { HEURISTIC_ITEMS } from "@joshuarobs/clothing-framework/src/heuristic-items";
import { HeuristicItemList } from '../../../draft-test-items';

const { Text } = Typography;

const columns = [
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    // fixed: 'left',
    width: 84,
    /*render: () => <Empty style={{
      backgroundColor: 'white',
      borderRadius: 4,
    }} description={false} image={Empty.PRESENTED_IMAGE_SIMPLE}/>*/
    render: () => (
      <Avatar
        shape="square"
        size="large"
        src="https://pm1.narvii.com/6923/24e9471327fea2908547acc8593d945e06b7e1e9r1-620-435v2_128.jpg"
        style={{
          marginLeft: 16,
        }}
      />
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // fixed: 'left',
    width: 200,
    render: (text: any, record: any) => {
      const name = record ? record.name : null;
      // const clothing_shell_id = mainData ? mainData.clothing_shell_id : null;
      // const state = mainData ? mainData.state : null;

      // Calculate any errors and whether to show an error icon or not
      let showError = false;
      const errors = [];
      if (!name) {
        errors.push('\nNo name');
      }

      const errorTooltip = (
        <div>
          Errors present ({errors.length}):
          <br />
          {errors.map((error) => {
            return (
              <>
                • {error}
                <br />
              </>
            );
          })}
        </div>
      );

      return (
        <Link to={`${Routes.Heuristic_Items__Clothing__Item}/${record.id}`}>
          <span
            style={{
              marginRight: 4,
            }}
          >
            {name}
          </span>
          {errors.length > 0 && (
            <Tooltip title={errorTooltip}>
              <WarningFilled
                style={{
                  color: red[3],
                }}
              />
            </Tooltip>
          )}
        </Link>
      );
    },
  },
  {
    title: 'Insulation Points',
    dataIndex: 'insulation_points',
    key: 'insulation_points',
    width: 100,
    render: (text: any) => (
      <div
        style={{
          marginLeft: 16,
        }}
      >
        <Text>{text}</Text>
      </div>
    ),
  },
  {
    title: 'Colours',
    // dataIndex: "featured_reseller",
    key: 'colours',
    width: 100,
    // render: text => <Link to={ROUTES.COMPANIES}>{text}</Link>
  },
  {
    title: 'Materials',
    // dataIndex: "featured_reseller",
    key: 'materials',
    width: 100,
    // render: text => <Link to={ROUTES.COMPANIES}>{text}</Link>
  },
  {
    title: 'Highly Insulating?',
    // dataIndex: "featured_reseller",
    key: 'colours',
    width: 100,
    // render: text => <Link to={ROUTES.COMPANIES}>{text}</Link>
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 86,
    render: (text: any) => (
      <div
        style={{
          marginLeft: 16,
        }}
      >
        <Text type="secondary">{text}</Text>
      </div>
    ),
  },
];

interface HeuristicItemsTableProps {
  show: number;
}

function HeuristicItemsTable({ show }: HeuristicItemsTableProps) {
  // Iterate through all data and set keys
  // const newData = _.cloneDeep(data.items);
  // newData.forEach((item, index) => {
  //   item.key = index;
  // });
  // // TODO: Replace with
  const newData = addKeysToArrayObjects(Array.from(HeuristicItemList.values()));

  console.log('newData:', newData);

  return (
    <Table
      style={{
        width: '100%',
        minWidth: 800,
      }}
      // rowSelection={rowSelection}
      columns={columns}
      dataSource={newData}
      // scroll={{ x: 100 }}
      pagination={{ pageSize: show }}
    />
  );
}

export { HeuristicItemsTable };
