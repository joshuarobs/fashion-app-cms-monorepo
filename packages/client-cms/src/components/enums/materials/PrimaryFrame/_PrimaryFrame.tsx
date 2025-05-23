import React, { useState } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Switch } from 'antd';
import { MaterialsTable } from './MaterialsTable';
import { SwitchElement } from '../../../common/SwitchElement';

const { Content } = Layout;

function PrimaryFrame() {
  const [showActualValues, toggleShowActualValues] = useState(true);

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
              // Disable the toggle since we already have actual nice
              // looking values in the database
              display: 'none',
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
        <MaterialsTable showActualValues={showActualValues} />
      </Row>
    </Content>
  );
}

export { PrimaryFrame };
