import React from 'react';
import { Layout, Row, Col, Typography } from 'antd';
import { TitleAndValue } from '../TitleAndValue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const { Content } = Layout;

const size = 'small';

const styles = {
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

interface GenericInformationFrameProps {
  data: any;
  elements: any;
}

function GenericInformationFrame({
  data,
  elements,
}: GenericInformationFrameProps) {
  // console.log("data:", data);

  const { created_at, updated_at } = data;

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
          <Col span={12}>
            <TitleAndValue title="Last Updated" value={updated_at} isDate />
          </Col>
          <Col span={12}>
            <TitleAndValue title="Date Created" value={created_at} isDate />
          </Col>
        </Row>
      </div>
    </Content>
  );
}

export { GenericInformationFrame };
