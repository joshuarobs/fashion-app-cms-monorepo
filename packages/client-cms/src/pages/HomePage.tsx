import React, { useState } from 'react';
import { Layout } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { Get_Base_Colours } from '../queries/base_colours/getBaseColours';

const { Content } = Layout;

function HomePage() {
  // const [data, setData] = useState(null);

  const { loading, error, data } = useQuery(gql`
    query {
      hello
    }
  `);

  if (loading) return <div />;
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }
  console.log('data:', data);
  const { hello } = data;

  return (
    <>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
          minHeight: 280,
        }}
      >
        <h1>Home Page</h1>
        <p>Test</p>
        <p>{hello}</p>
      </Content>
    </>
  );
}

export { HomePage };
