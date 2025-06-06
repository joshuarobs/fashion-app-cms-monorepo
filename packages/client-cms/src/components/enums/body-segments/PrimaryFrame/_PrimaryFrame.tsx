import React, { useState } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Select, Input, Switch } from 'antd';
import { BodySegmentsTable } from './BodySegmentsTable';
import { SwitchElement } from '../../../common/SwitchElement';

const { Content } = Layout;

function PrimaryFrame() {
  const [showActualValues, toggleShowActualValues] = useState(false);

  return (
    <Content
      style={{
        padding: 24,
        background: '#fff',
        minHeight: 280,
        margin: '0px 12px 0px 12px',
      }}
    >
      <Row>
        <Col
          span={24}
          style={{
            textAlign: 'end',
            marginBottom: 12,
          }}
        >
          <label
            style={{
              userSelect: 'none',
              padding: 6,
            }}
          >
            <span
              style={{
                marginRight: 12,
              }}
            >
              Show Actual Values
            </span>
            <SwitchElement
              checked={showActualValues}
              onChange={(checked: any) => toggleShowActualValues(checked)}
            />
          </label>
        </Col>
      </Row>
      <Row>
        <BodySegmentsTable showActualValues={showActualValues} />
      </Row>
    </Content>
  );
}

export { PrimaryFrame };
