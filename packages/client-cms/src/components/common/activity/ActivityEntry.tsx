import React from 'react';
import { Row, Col, Avatar, Tooltip, Divider, Typography } from 'antd';
import {
  FileAddOutlined,
  EditOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  DataAction,
  DataChangeType,
  DataState,
} from '@joshuarobs/clothing-enums';
import dayjs from 'dayjs';

const { Text } = Typography;

const iconStyle = { fontSize: 32, opacity: 0.65 };

interface ActivityEntryProps {
  change: any;
  lastItem: any;
  showType: any;
}

function ActivityEntry({ change, lastItem, showType }: ActivityEntryProps) {
  const { action, change_type, date, id, to_state, user } = change;
  // All the different types of table names that can have activities
  // associated with them
  const {
    item_translation_revision,
    company_translation_revision,
    item_maindata_revision,
  } = change;

  let revision = null;

  let typeKindTitle = '';
  let typeName = '';
  if (item_translation_revision) {
    typeKindTitle = 'Locale:';
    typeName = item_translation_revision.locale.name;
    revision = item_translation_revision.revision;
  } else if (company_translation_revision) {
    typeKindTitle = 'Locale:';
    typeName = company_translation_revision.locale.name;
    revision = company_translation_revision.revision;
  } else if (item_maindata_revision) {
    // typeKindTitle = "Item Maindata:";
    // typeName = item_maindata_revision.locale.name;
    revision = item_maindata_revision.revision;
  }

  const displayDate = dayjs().to(dayjs(date));
  // const displayDate = dayjs(date).format("MMM D");
  // const displayTime = dayjs(date).format("h:mm A");

  let icon = <div />;
  let text = '';
  if (change_type === DataChangeType.Promotion) {
    icon = <UpCircleOutlined style={iconStyle} />;
    switch (to_state) {
      case DataState.Development:
        text = 'promoted to Development';
        break;
      case DataState.Review:
        text = 'promoted to Review';
        break;
      case DataState.Production:
        text = 'promoted to Production';
        break;
      case DataState.Retired:
        text = 'promoted to Retired';
        break;
    }
  } else if (change_type === DataChangeType.Action) {
    switch (action) {
      case DataAction.Create:
        icon = <FileAddOutlined style={iconStyle} />;
        text = 'created this entry';
        break;
      case DataAction.Update:
        icon = <EditOutlined style={iconStyle} />;
        text = 'made changes';
        break;
    }
  } else if (change_type === DataChangeType.Demotion) {
    icon = <DownCircleOutlined style={iconStyle} />;
    switch (to_state) {
      case DataState.Development:
        text = 'demoted back to Development';
        break;
      case DataState.Review:
        text = 'demoted back to Review';
        break;
      case DataState.Production:
        text = 'demoted back to Production';
        break;
      case DataState.Retired:
        text = 'demoted back to Retired';
        break;
    }
  }

  return (
    <Col
      style={{
        width: '100%',
      }}
    >
      {showType && (
        <Row
          style={{
            width: '100%',
          }}
        >
          <span>
            <strong>{typeKindTitle}</strong>
            {` ${typeName}`}
          </span>
        </Row>
      )}
      <Row
        style={{
          width: '100%',
          display: 'flex',
          marginTop: 2,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {icon}
          <Avatar
            icon={<UserOutlined />}
            style={{
              marginLeft: 12,
            }}
          />
        </div>
        <Col
          style={{
            marginLeft: 12,
          }}
        >
          <Row>
            <span>
              {' '}
              <strong>{user.name}</strong>
              {` ${text}`}
            </span>
          </Row>
          <Row>
            <Text type="secondary">
              <Tooltip title={dayjs(date).format('YYYY-MM-DD' + ' (HH:mm:ss)')}>
                {displayDate}
              </Tooltip>
              {revision && ` · r${revision}`}
            </Text>
          </Row>
        </Col>
        {!lastItem && (
          <Divider
            style={{
              marginTop: 12,
              marginBottom: 12,
            }}
          />
        )}
      </Row>
    </Col>
  );
}

export { ActivityEntry };
