import React from 'react';
import {
  Popconfirm,
  Layout,
  Divider,
  Row,
  Col,
  Button,
  Typography,
  Table,
  Space,
  Steps,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Common } from '../../../../strings';
import { PromotedBy } from './PromotedBy';
import { FrameTitle } from '../../typography/FrameTitle';
import { DataState } from '@joshuarobs/clothing-framework/build/enums';

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

interface StateFrameProps {
  currentState?: any;
  changeToDevelopment?: any;
  changeToReview?: any;
  changeToProduction?: any;
  changeToRetired?: any;
  promoteToReview?: any;
  promoteToProduction?: any;
  demoteToDevelopment?: any;
  newRevision?: any;
  overrideHidePromoteButton?: any;
  overrideShowPromoteButton?: any;
}

function StateFrame({
  currentState,
  changeToDevelopment,
  changeToReview,
  changeToProduction,
  changeToRetired,
  promoteToReview,
  promoteToProduction,
  demoteToDevelopment,
  newRevision,
  overrideHidePromoteButton,
  overrideShowPromoteButton,
}: StateFrameProps) {
  let latestStep = -1;
  let text = null;
  let onClick = null;
  switch (currentState) {
    case DataState.Development:
      latestStep = 0;
      text = Common.State_Related.Promote_To_Review;
      onClick = promoteToReview;
      break;
    case DataState.Review:
      latestStep = 1;
      text = Common.State_Related.Promote_To_Production;
      onClick = promoteToProduction;
      break;
    case DataState.Production:
      latestStep = 2;
      text = Common.State_Related.New_Revision;
      onClick = newRevision;
      break;
    case DataState.Retired:
      latestStep = 3;
      text = Common.State_Related.New_Revision;
      onClick = newRevision;
      break;
  }

  let showButton = false;
  if (overrideShowPromoteButton) {
    showButton = true;
  } else if (overrideHidePromoteButton) {
    showButton = false;
  } else if (latestStep < 3) {
    showButton = true;
  }

  let showDemoteButton = false;
  if (showButton && demoteToDevelopment && currentState === DataState.Review) {
    showDemoteButton = true;
  } else if (overrideHidePromoteButton) {
    showDemoteButton = false;
  }

  return (
    <Content
      style={{
        // minHeight: 280,
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
          <Col>
            <FrameTitle text="State" />
          </Col>
          <Col
            style={{
              // display: "flex",
              // justifyContent: "flex-end"
              marginLeft: 'auto',
            }}
          >
            {showDemoteButton && (
              <Popconfirm
                title="Do you wish to Demote?"
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                okType="danger"
                okText="Demote"
                onConfirm={demoteToDevelopment}
              >
                <Button
                  danger
                  size={size}
                  onClick={() => {}}
                  style={{
                    marginRight: 8,
                  }}
                  // @ts-ignore
                  onCancel={() => {}}
                >
                  Demote to Dev
                </Button>
              </Popconfirm>
            )}
            {showButton && (
              <Button type="primary" size={size} onClick={onClick}>
                {text}
              </Button>
            )}
          </Col>
        </Row>
        <Row
          gutter={16}
          style={{
            marginTop: 8,
          }}
        >
          <Col span={12}>
            <Steps direction="vertical" size="small" current={latestStep}>
              <Step
                title={Common.State_Related.In_Development}
                description={
                  // @ts-ignore
                  <span style={styles.stepDescription}>
                    {Common.State_Related.Desc_In_Development}
                  </span>
                }
              />
              <Step
                title={Common.State_Related.In_Review}
                description={
                  // @ts-ignore
                  <span style={styles.stepDescription}>
                    {Common.State_Related.Desc_In_Review}
                  </span>
                }
              />
              <Step
                title={Common.State_Related.In_Production}
                description={
                  // @ts-ignore
                  <span style={styles.stepDescription}>
                    {Common.State_Related.Desc_In_Production}
                  </span>
                }
              />
              <Step
                title={Common.State_Related.In_Retirement}
                description={
                  // @ts-ignore
                  <span style={styles.stepDescription}>
                    {Common.State_Related.Desc_In_Retirement}
                  </span>
                }
              />
            </Steps>
          </Col>
          <Col span={2} />
          <Col span={10}>
            <PromotedBy change={changeToDevelopment} />
            <PromotedBy change={changeToReview} />
            <PromotedBy change={changeToProduction} />
            <PromotedBy change={changeToRetired} />
          </Col>
        </Row>
      </div>
    </Content>
  );
}

export { StateFrame };
