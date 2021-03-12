import React, { useState } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Switch, Typography } from 'antd';
import { ItemTypesTable } from './ItemTypesTable';
import { App_Shell, Table_Descriptions } from '../../../strings';
import { SwitchElement } from '../../common/SwitchElement';

const { Content } = Layout;
const { Title } = Typography;

function ItemTypesFrame() {
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
        <Title level={4}>{App_Shell.Sidebar.Pages.Item_Types}</Title>
      </Row>
      <Row style={{ marginBottom: 12 }}>
        <Col span={18}>{Table_Descriptions.Item_Types}</Col>
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
          marginTop: 4,
        }}
      >
        <ItemTypesTable showActualValues={showActualValues} />
      </Row>
    </Content>
  );
}

export { ItemTypesFrame };
