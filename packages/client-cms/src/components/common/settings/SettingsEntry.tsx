import React from 'react';
import { Button, Col, Divider, Row, Typography } from 'antd';

const { Title } = Typography;

interface SettingsEntryProps {
  title: string;
  description: any;
  onClick: Function;
  loading: boolean;
}

function SettingsEntry({
  title,
  description,
  onClick,
  loading,
}: SettingsEntryProps) {
  const styles = {
    divider: {
      margin: '12px 0',
    },
  };

  return (
    <Row
      style={{
        marginTop: 4,
      }}
    >
      {/*<ItemTypesTable showActualValues={showActualValues} />*/}
      <Col span={16}>
        <Row>
          <Title
            level={5}
            style={{
              marginBottom: 0,
            }}
          >
            {title}
          </Title>
        </Row>
        <Row style={{ marginTop: 8 }}>{description}</Row>
      </Col>
      <Col span={8}>
        <Button
          danger
          // @ts-ignore
          onClick={onClick}
          loading={loading}
        >
          Delete
        </Button>
      </Col>
      <Divider style={styles.divider} />
    </Row>
  );
}

export { SettingsEntry };
