import React from 'react';
import { Button, Empty, Row, Typography } from 'antd';

const { Text } = Typography;

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
    <span>
      <Text>No {itemName}</Text>
    </span>
  );

  if (isChangesMade) {
    description = (
      <span>
        {' '}
        <Text strong mark>
          No {itemName}!**
        </Text>
      </span>
    );
  } else if (isImportant) {
    description = (
      <span>
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
        style={{
          margin: '16px auto',
        }}
        description={description}
      >
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
      </Empty>
    </Row>
  );
}

export { NoGenericAssociationFullCol };
