import React from 'react';
import { Table, Tag, Avatar, Tooltip, Typography, Badge, Button } from 'antd';
import { Link, useLocation, useParams } from 'react-router-dom';
import { RouteStrings } from '../../../routeStrings';
import { TableType } from './TableType';
import { DateLastUpdatedAgo } from '../DateLastUpdatedAgo';
import { TagError } from '../localisation/TagError';
import { DataState } from '@joshuarobs/clothing-framework';
import { TagInDevelopment } from '../localisation/TagInDevelopment';
import { TagInReview } from '../localisation/TagInReview';
import { TagInProduction } from '../localisation/TagInProduction';
import { TagInRetirement } from '../localisation/TagInRetirement';
import { WarningFilled } from '@ant-design/icons';
import { red } from '@ant-design/colors';
import { generateErrorsForItemsListPage } from '../../../utils/quick-error-gen/generateErrorsForItemsListPage';
import { QuickErrorSetItemsPage } from '../../../utils/quick-error-gen/QuickErrorSetItemsPage';
import { QuickErrorSetMessagesItemsPage } from '../../../utils/quick-error-gen/QuickErrorSetMessagesItemsPage';
import { generateElementsListFromErrorsItemPage } from '../../../utils/quick-error-gen/generateElementsListFromErrorsItemPage';
import { getNumberOfQuickErrorsInSet } from '../../../utils/quick-error-gen/getNumberOfQuickErrorsInSet';
import { ErrorTooltipContent } from '../ErrorTooltipContent';
import { generateErrorsForClothingShellsListPage } from '../../../utils/quick-error-gen/generateErrorsForClothingShellsListPage/_generateErrorsForClothingShellsListPage';

const { Text } = Typography;

const columns = [
  {
    title: 'Image',
    // dataIndex: "logo_url",
    key: 'logo_url',
    // fixed: 'left',
    width: 84,
    render: (value: string) =>
      value ? (
        <Avatar
          shape="square"
          size="large"
          src="https://pm1.narvii.com/6923/24e9471327fea2908547acc8593d945e06b7e1e9r1-620-435v2_128.jpg"
          // src={value}
          style={{
            marginLeft: 16,
          }}
        />
      ) : (
        <></>
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

      // const test = generateErrorsForItemsListPage(record);
      // console.log('generateErrorsForItemsListPage:', test);

      // const { latest_revision } = record;
      // const mainData =
      //   latest_revision[0] && latest_revision[0].item_maindata[0]
      //     ? latest_revision[0].item_maindata[0]
      //     : null;
      // const revision = latest_revision[0] ? latest_revision[0].revision : 1;
      // const name = mainData ? mainData.name : null;

      // Calculate any errors and whether to show an error icon or not
      const errors: QuickErrorSetItemsPage =
        generateErrorsForClothingShellsListPage(record);
      const errorDivs: QuickErrorSetMessagesItemsPage =
        generateElementsListFromErrorsItemPage(errors);
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
    width: 156,
    render: (text: string, record: any) => {
      console.log('record:', record);
      const { latest_revision } = record;

      let name = '';

      // if (latest_revision) {
      const mainData =
        latest_revision[0] && latest_revision[0].clothing_shell_maindata[0]
          ? latest_revision[0].clothing_shell_maindata[0]
          : null;
      const revision = latest_revision[0] ? latest_revision[0].revision : 1;
      name = mainData ? mainData.name : null;
      // const clothing_shell_id = mainData ? mainData.clothing_shell_id : null;
      // }

      return (
        <Link
          to={`${RouteStrings.Clothing_Shells__Clothing_Shell}/${record.id}?rev=${revision}`}
        >
          {name}
        </Link>
      );
    },
  },
  {
    title: 'Clothes Used In',
    dataIndex: ['counts', 'item_count'],
    key: 'item_count',
    width: 90,
    render: (text: number) => (
      <span
        style={{
          marginLeft: 16,
        }}
      >
        {text > 0 ? text : '-'}
      </span>
    ),
    // render: text => <Link to={ROUTES.COMPANIES}>{text}</Link>,
  },
  // {
  //   title: 'Body Segments',
  //   dataIndex: [
  //     'clothing_shell_and_body_segment_masks_aggregate',
  //     'aggregate',
  //     'count',
  //   ],
  //   key: 'num_body_segments',
  //   width: 100,
  //   render: (text: number) => (
  //     <span
  //       style={{
  //         marginLeft: 16,
  //       }}
  //     >
  //       {text}
  //     </span>
  //   ),
  //   // render: text => <Link to={ROUTES.COMPANIES}>{text}</Link>,
  // },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 40,
    render: (text: string) => (
      <span
        style={{
          marginLeft: 16,
        }}
      >
        <Text type="secondary">{text}</Text>
      </span>
    ),
  },
  {
    title: 'Colours',
    dataIndex: 'colours',
    key: 'colours',
    width: 130,
  },
  {
    title: 'Brands',
    dataIndex: 'brands',
    key: 'brands',
    width: 150,
  },
  {
    title: 'Rev.',
    dataIndex: 'revision',
    key: 'revision',
    width: 64,
    render: (text: any, record: any) => {
      console.log('@@@record:', record);
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
      console.log('record:', record);
      const { latest_revision } = record;
      const state = latest_revision[0] ? latest_revision[0].state : null;
      let tag = <TagError notClickable />;
      // console.log(
      //   'latest_revision:',
      //   latest_revision
      // );
      if (latest_revision[0] && latest_revision[0].clothing_shell_maindata[0]) {
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
];

interface ClothingShellsTableProps {
  data: any;
  currentClothingShellId?: number | null;
  selectClothingShell?: Function;
  type?: TableType;
}

function ClothingShellsTable({
  data,
  currentClothingShellId,
  selectClothingShell = () => {},
  type = TableType.All_List,
}: ClothingShellsTableProps) {
  const columnsWithActionButton = [
    ...columns,
    {
      title: 'Action',
      key: 'action',
      width: 80,
      // Can't be put with expandedRowRender unfortunately
      // fixed: 'right',
      render: (text: any, record: any) =>
        record.id === currentClothingShellId ? (
          <a
            style={{
              cursor: 'default',
            }}
          />
        ) : (
          <a onClick={() => selectClothingShell(record.id)}>Select</a>
        ),
    },
  ];
  switch (type) {
    case TableType.All_List:
      // columns.push({
      //   title: "Action",
      //   key: "action",
      //   width: 80,
      //   // Can't be put with expandedRowRender unfortunately
      //   // fixed: 'right',
      //   render: (text, record) => (
      //     <Link to={`${ROUTES.COMPANIES__COMPANY}/${record.id}`}>
      //       <Button shape="circle" icon={<SearchOutlined />} />
      //     </Link>
      //   )
      // });
      break;
    case TableType.Select_One:
      // @ts-ignore
      // columns.push({
      //   title: 'Action',
      //   key: 'action',
      //   width: 80,
      //   // Can't be put with expandedRowRender unfortunately
      //   // fixed: 'right',
      //   render: (text: any, record: any) =>
      //     record.id === currentClothingShellId ? (
      //       <a
      //         style={{
      //           cursor: 'default',
      //         }}
      //       />
      //     ) : (
      //       <a onClick={() => selectClothingShell(record.id)}>Select</a>
      //     ),
      // });
      break;
  }

  return (
    <Table
      style={{
        width: '100%',
        minWidth: 800,
        // calc(100vw - 304px)
      }}
      columns={type === TableType.All_List ? columns : columnsWithActionButton}
      dataSource={data}
      expandedRowRender={(record) => (
        <p style={{ margin: 16 }}>
          <Button type="primary" danger size="small">
            Delete
          </Button>
        </p>
      )}
      pagination={{ pageSize: 20 }}
    />
  );
}

export { ClothingShellsTable };
