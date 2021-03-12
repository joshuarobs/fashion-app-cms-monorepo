import React from 'react';
import { Row, Col, Typography } from 'antd';

const { Text } = Typography;

interface BreakdownsListElementProps {
  data: any;
}

function BreakdownsListElement({ data }: BreakdownsListElementProps) {
  return (
    <div>
      {data.map((item: any, index: number) => {
        return (
          <Row gutter={8} key={index}>
            <Col span={2}>
              <svg height="12" width="12">
                <circle cx="6" cy="6" r="6" fill={item.colour} />
              </svg>
            </Col>
            <Col span={18}>{item.name}</Col>
            <Col
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
              span={4}
            >
              <Text>{item.value}%</Text>
            </Col>
          </Row>
        );
      })}
    </div>
  );
}

export { BreakdownsListElement };
