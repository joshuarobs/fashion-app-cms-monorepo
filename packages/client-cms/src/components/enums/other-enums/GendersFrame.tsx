import React, { useState } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Select, Input, Switch, Typography } from 'antd';
import { GendersTable } from './GendersTable';
import { App_Shell, Table_Descriptions } from '../../../strings';
import { GendersPageIcon } from '../../common/icons/page-icons/GendersPageIcon';
import { SwitchElement } from '../../common/SwitchElement';

const { Content } = Layout;
const { Title } = Typography;

function GendersFrame() {
  const [showActualValues, toggleShowActualValues] = useState(false);

  return (
    <Content
      style={{
        padding: 24,
        background: '#fff',
        margin: '0px 12px 0px 12px',
      }}
    >
      <Row>
        <div style={{ display: 'flex' }}>
          <GendersPageIcon />
          <Title level={4} style={{ paddingLeft: 8 }}>
            {App_Shell.Sidebar.Pages.Genders}
          </Title>
        </div>
      </Row>
      <Row style={{ marginBottom: 12 }}>
        <Col span={18} style={{ whiteSpace: 'normal' }}>
          {Table_Descriptions.Genders}
        </Col>
        <Col
          span={6}
          style={{
            textAlign: 'end',
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
      <Row
        style={{
          marginTop: 8,
        }}
      >
        <GendersTable showActualValues={showActualValues} />
      </Row>
    </Content>
  );
}

export { GendersFrame };
