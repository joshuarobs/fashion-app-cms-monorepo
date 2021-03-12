import React from 'react';
import { Col, Row, Typography } from 'antd';
import { PieChartElement } from './PieChartElement';
import { BreakdownsListElement } from './BreakdownsListElement';

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

const emptyData = [
  {
    data: [
      { name: 'Nylon', value: 67, colour: '#3C3D46' },
      { name: 'Polyester', value: 33, colour: '#797F93' },
    ],
  },
];

interface BreakdownsElementProps {
  title: string;
  data: any;
  hasChangesMade?: boolean;
}

function BreakdownsElement({
  title,
  data = emptyData,
  hasChangesMade,
}: BreakdownsElementProps) {
  const data1 = data[0].data;
  const data2 = data[1] && data[1].data;

  return (
    <div style={{ width: '100%' }}>
      <Row style={styles.sectionTitle}>
        {hasChangesMade ? (
          <Text strong mark>{`${title}**`}</Text>
        ) : (
          <Text strong>{title}</Text>
        )}
      </Row>
      <Row>
        <Col span={8}>
          {data2 ? (
            <PieChartElement data1={data1} data2={data2} />
          ) : (
            <PieChartElement data1={data1} />
          )}
        </Col>
        <Col span={16}>
          {data.map((group: any, index: number) => {
            return (
              <div key={index}>
                {group.name && (
                  <div
                    style={
                      index === 0
                        ? { ...styles.occasionsTitle, marginTop: 0 }
                        : styles.occasionsTitle
                    }
                  >
                    <Text type="secondary" strong>
                      {group.name}
                    </Text>
                    <br />
                  </div>
                )}
                <BreakdownsListElement data={group.data} />
              </div>
            );
          })}
        </Col>
      </Row>
    </div>
  );
}

export { BreakdownsElement };
