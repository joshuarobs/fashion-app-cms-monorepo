import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';
import { RouteStrings } from '../routeStrings';

function Exception404Page() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to={RouteStrings.Home}>
          <Button type="primary">Back Home</Button>
        </Link>
      }
      style={{
        paddingTop: 96,
      }}
    />
  );
}

export { Exception404Page };
