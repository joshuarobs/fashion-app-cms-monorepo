import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Input, Layout, Row, Typography } from 'antd';

const { Text } = Typography;

const styles = {
  sectionTitle: {
    marginTop: 12,
    marginBottom: 8,
  },
};

function LoginPage() {
  const inputElement = useRef(null);
  useEffect(() => {
    if (inputElement.current) {
      // @ts-ignore
      inputElement.current.focus();
    }
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {};

  return (
    <Layout style={{ height: '100vh' }}>
      <Card
        style={{
          width: 300,
          margin: '0 auto',
          top: '50%',
          transform: 'translateY(-70%)',
        }}
      >
        <Row style={{ ...styles.sectionTitle, marginTop: 0 }}>
          <Text>Username</Text>
        </Row>
        <Row
          style={{
            marginTop: 4,
          }}
        >
          <Input
            autoFocus
            // ref={'inputRef'}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </Row>
        <Row style={styles.sectionTitle}>
          <Text>Password</Text>
        </Row>
        <Row
          style={{
            marginTop: 4,
          }}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // @ts-ignore
            onPressEnter={onSubmit}
            autoComplete="password"
          />
        </Row>
        <Row style={{ marginTop: 24, marginBottom: 0 }}>
          <Button type="primary" style={{ width: '100%' }} onClick={onSubmit}>
            Login
          </Button>
        </Row>
      </Card>
    </Layout>
  );
}

export { LoginPage };
