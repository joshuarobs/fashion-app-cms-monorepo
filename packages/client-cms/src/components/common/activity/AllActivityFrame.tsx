import React from 'react';
import {
  Layout,
  Divider,
  Row,
  Col,
  Button,
  Typography,
  Tabs,
  Space,
  Steps,
  Empty,
} from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ActivityEntry } from './ActivityEntry';

dayjs.extend(relativeTime);

const { Title, Text } = Typography;
const { Content } = Layout;
const { TabPane } = Tabs;

interface AllActivityFrameProps {
  changes: any[];
  showType: boolean;
  isAllActivity?: boolean;
}

function AllActivityFrame({
  changes = [],
  showType = false,
  isAllActivity,
}: AllActivityFrameProps) {
  console.log('changes:', changes);

  return (
    <Content
      style={{
        // maxWidth: 412,
        // margin: "0px 12px 0px 12px"
        marginBottom: 24,
      }}
    >
      <div
        style={{
          padding: 16,
          background: '#fff',
          borderRadius: 4,
        }}
      >
        {/*<Row>*/}
        {/*  <Col span={12}>*/}
        {/*    <FrameTitle text="All Activity" />*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        <Row>
          {changes.length > 0 ? (
            changes.map((change, index) => {
              return (
                <ActivityEntry
                  lastItem={index === changes.length - 1}
                  key={index}
                  change={change}
                  showType={showType}
                />
              );
            })
          ) : (
            <Empty
              style={{
                margin: '0 auto',
                padding: 16,
              }}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </Row>
      </div>
    </Content>
  );
}

export { AllActivityFrame };
