import React from 'react';
import { Button, Empty, Row, Typography } from 'antd';

const { Text } = Typography;

const styles = {
  sectionTitle: {
    marginTop: 12,
    marginBottom: 8,
  },
  occasionsTitle: {
    marginTop: 12,
    marginBottom: 4,
  },
};

interface BreakdownsEmptyProps {
  title: string;
  hasChangesMade: boolean;
}

function BreakdownsEmpty({ title, hasChangesMade }: BreakdownsEmptyProps) {
  return (
    <div style={{ width: '100%' }}>
      <Row style={styles.sectionTitle}>
        {hasChangesMade ? (
          <Text strong mark>{`${title}**`}</Text>
        ) : (
          <Text strong>{title}</Text>
        )}
      </Row>
      <Row
        style={{
          // padding: 8,
          borderRadius: 4,
          border: '1px dashed #D9D9D9',
          // marginTop: 8,
        }}
      >
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{
            margin: '14px auto',
          }}
          description={
            <span>
              <Text type="secondary">No Colours from Fabric Layers</Text>
            </span>
          }
        />
      </Row>
    </div>
  );
}

export { BreakdownsEmpty };
