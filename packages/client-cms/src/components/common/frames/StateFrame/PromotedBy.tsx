import React from 'react';
import { Row, Avatar, Tooltip, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Common } from '../../../../strings';
import { DateLastUpdatedAgo } from '../../DateLastUpdatedAgo';

const { Text } = Typography;

const cssStyles = {
  toolTip: {
    borderBottom: '1px dotted #AAA',
    paddingBottom: 2,
  },
};

interface PromotedByProps {
  change: any;
  createdBy?: boolean;
}

function PromotedBy({ change, createdBy }: PromotedByProps) {
  const value = change ? change.date : null;
  const user = change ? change.user : null;

  return (
    <div
      style={{
        minHeight: 80,
      }}
    >
      {!change ? (
        <Row>
          <Text type="secondary">{Common.State_Related.To_Be_Promoted}</Text>
        </Row>
      ) : (
        <>
          {!createdBy ? <Row>Promoted by</Row> : <Row>Created by</Row>}
          <Row
            style={{
              marginBottom: 4,
            }}
          >
            <Tooltip title={`${user.name} (${user.email})`}>
              <Avatar size="small" icon={<UserOutlined />} />
            </Tooltip>
          </Row>
          <Row>
            <DateLastUpdatedAgo text={value} />
            {/*<Tooltip title={dayjs(value).format('YYYY-MM-DD' + ' (HH:mm:ss)')}>*/}
            {/*  <span style={cssStyles.toolTip}>{dayjs().to(dayjs(value))}</span>*/}
            {/*</Tooltip>*/}
          </Row>
        </>
      )}
    </div>
  );
}

export { PromotedBy };
