import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const radius = {
  single: {
    inner: 35,
    outer: 50,
  },
  double: {
    outerRing: {
      inner: 40,
      outer: 50,
    },
    innerRing: {
      inner: 28,
      outer: 38,
    },
  },
};

interface PieChartElementProps {
  data1: any;
  data2?: any;
}

function PieChartElement({ data1, data2 }: PieChartElementProps) {
  const outerRingInnerRadius = data2
    ? radius.double.outerRing.inner
    : radius.single.inner;
  const outerRingOuterRadius = data2
    ? radius.double.outerRing.outer
    : radius.single.outer;

  return (
    <div style={{ width: 100, height: 100 }}>
      <ResponsiveContainer>
        <PieChart width={50} height={50}>
          <Pie
            data={data1}
            dataKey="value"
            cx={'50%'}
            cy={'50%'}
            innerRadius={outerRingInnerRadius}
            outerRadius={outerRingOuterRadius}
            fill="#82ca9d"
            startAngle={90}
            endAngle={450}
            isAnimationActive={false}
          >
            {data1.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={entry.colour} />
            ))}
          </Pie>
          {data2 && (
            <Pie
              data={data2}
              dataKey="value"
              cx={'50%'}
              cy={'50%'}
              innerRadius={radius.double.innerRing.inner}
              outerRadius={radius.double.innerRing.outer}
              fill="#8884d8"
              startAngle={90}
              endAngle={450}
            >
              {data2.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.colour} />
              ))}
            </Pie>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export { PieChartElement };
