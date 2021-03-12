import React from 'react';
import {
  Layout,
  Divider,
  Row,
  Col,
  Button,
  Typography,
  Table,
  Space,
  Steps,
  Empty,
} from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Common } from '../../../strings';
import { FrameTitle } from '../typography/FrameTitle';
import { ActivityEntry } from './ActivityEntry';
import { item_maindata_revision_changes } from '../../../utils/gql-interfaces/item_maindata_revision_changes';

dayjs.extend(relativeTime);

const { Title, Text } = Typography;
const { Content } = Layout;
const { Step } = Steps;

const size = 'small';

const styles = {
  stepDescription: {
    whiteSpace: 'normal',
    marginBottom: 8,
  },
  ratingTitle: {
    marginTop: 4,
  },
  rating: {
    fontSize: '1.2em',
    marginBottom: 4,
  },
  sectionTitle: {
    marginTop: 12,
    marginBottom: 8,
  },
  occasionsTitle: {
    marginTop: 12,
    marginBottom: 4,
  },
};

interface LatestActivityFrameProps {
  changes?: item_maindata_revision_changes[];
  showType?: boolean;
}

function LatestActivityFrame({
  changes = [],
  showType = false,
}: LatestActivityFrameProps) {
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
        <Row>
          <Col span={12}>
            <FrameTitle text="Latest Activity" />
          </Col>
          <Col
            span={12}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button size={size}>{Common.View_All}</Button>
          </Col>
        </Row>
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

export { LatestActivityFrame };
