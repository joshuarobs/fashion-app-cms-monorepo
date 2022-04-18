import React, { MouseEventHandler } from 'react';
import {
  CheckCircleFilled,
  CloseOutlined,
  PlusOutlined,
  ZoomInOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Button, Row, Typography } from 'antd';
import styled from 'styled-components';

const { Text } = Typography;

const Item = styled.div`
  display: flex;
  padding: 0.3rem;
  border-radius: 0.2rem;
  background-color: #fff6;
  margin-bottom: 0.3rem;

  &.sortable-ghost {
    background-color: #c8ebfb;
  }
`;

const GridItem = styled(Item)`
  height: 6rem;
  border: 1px solid #cccccc;
  & > * {
    margin: auto;
  }
`;

interface MediaMediumBoxCardProps {
  key: string;
  media_item: any;
  onClick: MouseEventHandler<HTMLDivElement>;
  onClickDelete: Function;
  orderNumber?: number;
  selected?: boolean;
}

const width = 124;

function MediaMediumBoxCard({
  key,
  media_item,
  onClick,
  onClickDelete,
  orderNumber,
  selected = false,
}: MediaMediumBoxCardProps) {
  const { name, url, id } = media_item;

  // const url =
  //   'https://f004.backblazeb2.com/file/fashion-cms/placeholder/Black-boots-1.png';
  const shadowOpacity = !selected ? 0.1 : 0.3;

  return (
    <div
      key={1}
      style={{
        // width,
        height: 232,
        marginTop: 6,
        marginBottom: 6,
        // marginRight: 9,
        border: '1px solid #e6e6e6',
        borderRadius: 8,
        cursor: 'pointer',
        boxShadow: `0px 2px 12px rgba(0, 0, 0, ${shadowOpacity})`,
        display: 'inline-block',
        userSelect: 'none',
        backgroundColor: 'white',
      }}
      onClick={onClick}
    >
      <Row
        style={{
          display: 'flex',
          justifyContent: 'right',
        }}
      >
        {orderNumber && (
          <Badge
            count={orderNumber}
            style={{
              backgroundColor: '#888888',
              position: 'absolute',
              // zIndex: 100000000,
              zIndex: 5,
              marginTop: 4,
              marginRight: 4,
              fontSize: 14,
              // height: 20,
              // fontWeight: 'bolder',
            }}
          />
        )}
        {selected && (
          <CheckCircleFilled
            style={{
              position: 'absolute',
              marginTop: 6,
              marginRight: 6,
              fontSize: 32,
              opacity: 0.8,
              zIndex: 2,
              color: '#43D059',
            }}
          />
        )}
        <Avatar
          src={url}
          size={180}
          style={{
            // width: 116,
            margin: '0 auto',
            // marginTop: 4,
            // borderRadius: 4,
            userSelect: 'none',
            zIndex: 1,
          }}
        />
        <CloseOutlined
          style={{
            position: 'absolute',
            marginTop: 4,
            marginRight: 4,
            fontSize: 24,
            opacity: 0.5,
            // Hide the close button for now since using it makes refreshing
            // the page flicker and not smooth
            visibility: 'hidden',
          }}
          onClick={() => onClickDelete(id)}
        />
      </Row>
      <Row
        style={{
          width: '80%',
          margin: '0 auto',
        }}
      >
        <Text
          style={{
            marginTop: 6,
            margin: '0 auto',
            whiteSpace: 'pre-wrap',
            textAlign: 'center',
            fontSize: '1.1em',
          }}
          strong={selected}
        >
          {name}
        </Text>
      </Row>
    </div>
  );
}

export { MediaMediumBoxCard };
