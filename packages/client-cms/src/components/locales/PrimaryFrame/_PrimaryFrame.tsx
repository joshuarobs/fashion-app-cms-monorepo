import React from 'react';
import { Layout, Row } from 'antd';
import { LocalisationsTable } from './LocalisationsTable';

const { Content } = Layout;

/**
 * We need this as a hacky work around to make the table display properly on
 * the page. This number should be total width of all fixed elements on the
 * page such as:
 * - App Shell Sidebar (200px)
 * - Content Padding (24 + 24px)
 * - Item Category Menu (240px)
 * - Item Category Margin Right (24px)
 * - Primary Frame Padding (24 + 24px)
 * Current total: 572
 */
const MAGIC_NUMBER_TO_MINUS = 572;

function PrimaryFrame() {
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
        <LocalisationsTable />
      </Row>
    </Content>
  );
}

export { PrimaryFrame };
