import React, { useState } from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

function HomePage() {
  const [data, setData] = useState(null);

  React.useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      // eslint-disable-next-line no-shadow
      .then((data) => setData(data.message));
  }, []);

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
        <p>{data}</p>
      </Content>
    </>
  );
}

export { HomePage };
