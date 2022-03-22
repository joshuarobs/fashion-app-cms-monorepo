import React from 'react';
import { Button, Empty, Col, Row, Typography } from 'antd';

const { Text } = Typography;

const styles = {
  text: {
    margin: '0 auto',
  },
};

const size = 'small';

interface NoGenericAssociationFullColProps {
  itemName: string;
  isImportant?: boolean;
  isChangesMade?: boolean;
  onClick?: Function;
  disabled?: boolean;
}

function NoGenericAssociationFullCol({
  itemName,
  isImportant,
  isChangesMade,
  onClick,
  disabled,
}: NoGenericAssociationFullColProps) {
  let description = (
    <span style={styles.text}>
      <Text type="secondary">No {itemName}</Text>
    </span>
  );

  if (isChangesMade) {
    description = (
      <span style={styles.text}>
        <Text strong mark>
          No {itemName}!**
        </Text>
      </span>
    );
  } else if (isImportant) {
    description = (
      <span style={styles.text}>
        <Text strong type="danger">
          No {itemName}!
        </Text>
      </span>
    );
  }

  return (
    <Row
      style={{
        // padding: 8,
        borderRadius: 4,
        border: '1px dashed #D9D9D9',
        marginTop: 8,
        marginBottom: 8,
        // cursor: 'pointer'
      }}
    >
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        imageStyle={{
          height: 32,
        }}
        style={{
          margin: '12px auto',
        }}
        description={
          <Col>
            <Row>{description}</Row>
            <Row style={{ marginTop: 8 }}>
              <Button
                // @ts-ignore
                type="secondary"
                size={size}
                // @ts-ignore
                onClick={onClick}
                disabled={disabled}
              >
                Select {itemName}
              </Button>
            </Row>
          </Col>
        }
      />
    </Row>
  );
}

export { NoGenericAssociationFullCol };
