import React from 'react';
import { DataState } from '@joshuarobs/clothing-enums';
import { Table, Typography, Button, Avatar, Badge, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { Routes } from '../../../routes';
import { gql, useQuery } from '@apollo/client';
import { addKeysToArrayObjects } from '../../../utils/addKeysToArrayObjects';
import { Get_Items_For_Items_Table_Latest } from '../../../queries/items/getItemsForItemsTableLatest';
import { TagInProduction } from '../../common/localisation/TagInProduction';
import { TagError } from '../../common/localisation/TagError';
import { TagInDevelopment } from '../../common/localisation/TagInDevelopment';
import { TagInRetirement } from '../../common/localisation/TagInRetirement';
import { TagInReview } from '../../common/localisation/TagInReview';
import { DateLastUpdatedAgo } from '../../common/DateLastUpdatedAgo';
import { generateErrorsForItemsListPage } from '../../../utils/quick-error-gen/generateErrorsForItemsListPage';
import { QuickErrorSetItemsPage } from '../../../utils/quick-error-gen/QuickErrorSetItemsPage';
import { QuickErrorSetMessagesItemsPage } from '../../../utils/quick-error-gen/QuickErrorSetMessagesItemsPage';
import { generateElementsListFromErrorsItemPage } from '../../../utils/quick-error-gen/generateElementsListFromErrorsItemPage';
import { getNumberOfQuickErrorsInSet } from '../../../utils/quick-error-gen/getNumberOfQuickErrorsInSet';
import { WarningFilled } from '@ant-design/icons';
import { red } from '@ant-design/colors';
import { ErrorTooltipContent } from '../../common/ErrorTooltipContent';

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
    title: (
      <Tooltip title="Errors">
        <WarningFilled
          style={{
            color: red[3],
          }}
        />
      </Tooltip>
    ),
    // title: 'Errors',
    key: 'errors',
    // fixed: 'left',
    width: 40,
    /*render: () => <Empty style={{
      backgroundColor: 'white',
      borderRadius: 4,
    }} description={false} image={Empty.PRESENTED_IMAGE_SIMPLE}/>*/
    render: (text: any, record: any) => {
      if (record.id > 70) console.log('record:', record);

      const test = generateErrorsForItemsListPage(record);
      console.log('generateErrorsForItemsListPage:', test);

      // const { latest_revision } = record;
      // const mainData =
      //   latest_revision[0] && latest_revision[0].item_maindata[0]
      //     ? latest_revision[0].item_maindata[0]
      //     : null;
      // const revision = latest_revision[0] ? latest_revision[0].revision : 1;
      // const name = mainData ? mainData.name : null;

      // Calculate any errors and whether to show an error icon or not
      const errors: QuickErrorSetItemsPage = generateErrorsForItemsListPage(
        record
      );
      const errorDivs: QuickErrorSetMessagesItemsPage = generateElementsListFromErrorsItemPage(
        errors
      );
      const numErrors = getNumberOfQuickErrorsInSet(errorDivs);
      console.log('errors:', errors);
      // console.log('errorDivs:', errorDivs);

      if (numErrors > 0)
        return (
          <Tooltip title={<ErrorTooltipContent itemsPageErrors={errorDivs} />}>
            <div style={{ textAlign: 'center', cursor: 'default' }}>
              <Badge
                count={numErrors}
                style={{
                  display: 'inline-block',
                  marginRight: 8,
                  margin: '0 auto',
                }}
                title={''}
              />
            </div>
          </Tooltip>
        );
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // fixed: 'left',
    width: 200,
    render: (text: any, record: any) => {
      if (record.id > 70) console.log('record:', record);

      // const test = generateErrorsForItemsListPage(record);
      // console.log('generateErrorsForItemsListPage:', test);

      const { latest_revision } = record;
      const mainData =
        latest_revision[0] && latest_revision[0].item_maindata[0]
          ? latest_revision[0].item_maindata[0]
          : null;
      const revision = latest_revision[0] ? latest_revision[0].revision : 1;
      const name = mainData ? mainData.name : null;

      return (
        <Link
          to={`${Routes.Items__Clothing__Item}/${record.id}?rev=${revision}`}
        >
          <span
            style={{
              marginRight: 4,
            }}
          >
            {name}
          </span>
        </Link>
      );
    },
  },
  {
    title: 'Brand',
    dataIndex: ['company', 'name'],
    key: 'brand',
    width: 110,
    render: (text: any, record: any) => {
      // console.log("record:", record);
      const { latest_revision } = record;
      const mainData =
        latest_revision[0] && latest_revision[0].item_maindata[0]
          ? latest_revision[0].item_maindata[0]
          : null;
      const brand = mainData ? mainData.brand : null;
      const brandName = brand ? brand.name : null;
      const brandId = brand ? brand.id : null;

      if (brand) {
        return (
          <Link to={`${Routes.Companies__Company}/${brandId}`}>
            {brandName}
          </Link>
        );
      } else {
        return null;
      }
    },
  },
  {
    title: 'Resellers',
    // dataIndex: "featured_reseller",
    key: 'resellers',
    width: 100,
    // render: text => <Link to={ROUTES.COMPANIES}>{text}</Link>
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 86,
    render: (text: React.ReactNode) => (
      <div
        style={{
          marginLeft: 16,
        }}
      >
        <Text type="secondary">{text}</Text>
      </div>
    ),
  },
  // {
  //   title: "Price (USD)",
  //   dataIndex: "price",
  //   key: "price",
  //   width: 86
  // },
  {
    title: 'Rev.',
    key: 'revision',
    width: 72,
    render: (text: any, record: any) => {
      console.log('record:', record);
      const { latest_revision } = record;
      const revision = latest_revision[0] ? latest_revision[0].revision : null;
      return (
        <div
          style={{
            marginLeft: 16,
          }}
        >
          <Text type="secondary">{revision}</Text>
        </div>
      );
    },
  },
  {
    title: 'Status',
    // dataIndex: "revision",
    key: 'status',
    width: 100,
    render: (text: any, record: any) => {
      // console.log("record:", record);
      const { latest_revision } = record;
      const state = latest_revision[0] ? latest_revision[0].state : null;
      let tag = <TagError notClickable />;
      console.log('latest_revision:', latest_revision);
      if (latest_revision[0] && latest_revision[0].item_maindata[0]) {
        switch (state) {
          case DataState.Development:
            tag = <TagInDevelopment showShortText notClickable />;
            break;
          case DataState.Review:
            tag = <TagInReview showShortText notClickable />;
            break;
          case DataState.Production:
            tag = <TagInProduction showShortText notClickable />;
            break;
          case DataState.Retired:
            tag = <TagInRetirement showShortText notClickable />;
            break;
        }
      }
      return (
        <div
          style={{
            marginLeft: 16,
          }}
        >
          {tag}
        </div>
      );
    },
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
  // {
  //   title: "Action",
  //   key: "action",
  //   width: 80,
  //   // Can't be put with expandedRowRender unfortunately
  //   // fixed: 'right',
  //   render: (text, record) => (
  //     <Link to={ROUTES.ITEMS}>
  //       <Button shape="circle" icon={<SearchOutlined />} />
  //     </Link>
  //   )
  // }
];

interface ItemsTableProps {
  show: number;
}

function ItemsTable({ show }: ItemsTableProps) {
  const { loading, error, data } = useQuery(
    // GET_ITEMS_AND_THEIR_CLOTHING_SHELLS
    // Get_Items_For_Items_Table_Latest
    gql`
      query getItemsForItemsTableLatest {
        getItemsForItemsTableLatest {
          id
          short_id
          updated_at
          item_maindata_revisions_aggregate {
            aggregate {
              count
            }
          }
          latest_revision {
            id
            revision
            state
            item_maindata {
              id
              name
              clothing_shell_id
              brand {
                id
                name
              }
              clothing_shell {
                id
                clothing_shell_maindata_revisions {
                  id
                  revision
                  clothing_shell_maindata {
                    id
                    name
                    clothing_segment_data_id
                    default_shell_layer_id
                    default_fill_layer_id
                    default_lining_layer_id
                    clothing_segment_data {
                      id
                      left_body_end_back
                      left_body_end_front
                      left_body_start_back
                      left_body_start_front
                      left_sleeve_end_back
                      left_sleeve_end_front
                      left_sleeve_start_back
                      left_sleeve_start_front
                      right_body_end_back
                      right_body_end_front
                      right_body_start_back
                      right_body_start_front
                      right_sleeve_end_back
                      right_sleeve_end_front
                      right_sleeve_start_back
                      right_sleeve_start_front
                    }
                  }
                }
              }
            }
          }
          latest_prod {
            id
            revision
            state
            item_maindata {
              id
              name
              clothing_shell_id
              brand {
                id
                name
              }
              clothing_shell {
                id
                clothing_shell_maindata_revisions {
                  id
                  revision
                  clothing_shell_maindata {
                    id
                    name
                    clothing_segment_data_id
                    default_shell_layer_id
                    default_fill_layer_id
                    default_lining_layer_id
                    clothing_segment_data {
                      id
                      left_body_end_back
                      left_body_end_front
                      left_body_start_back
                      left_body_start_front
                      left_sleeve_end_back
                      left_sleeve_end_front
                      left_sleeve_start_back
                      left_sleeve_start_front
                      right_body_end_back
                      right_body_end_front
                      right_body_start_back
                      right_body_start_front
                      right_sleeve_end_back
                      right_sleeve_end_front
                      right_sleeve_start_back
                      right_sleeve_start_front
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  );

  // const [selectedRows, setSelectedRows] = useState([]);

  // const rowSelection = {
  //   selectedRows,
  //   onChange: (selectedRows: any) => {
  //     setSelectedRows(selectedRows);
  //   },
  // };

  if (loading) return <div />;
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }
  console.log('data:', data);

  // Iterate through all data and set keys
  const newData = addKeysToArrayObjects(data.getItemsForItemsTableLatest);

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
      expandedRowRender={(record) => (
        <p style={{ margin: 16 }}>
          <Button type="primary" danger size="small">
            Delete
          </Button>
        </p>
      )}
      // scroll={{ x: 100 }}
      pagination={{ pageSize: show }}
    />
  );
}

export { ItemsTable };
