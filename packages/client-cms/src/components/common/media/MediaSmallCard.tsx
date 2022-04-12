import React, { MouseEventHandler } from 'react';
import { CloseOutlined, PlusOutlined, ZoomInOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Row } from 'antd';
import styled from 'styled-components';

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

interface MediaSmallCardProps {
  key: string;
  media_item: any;
  onClick: MouseEventHandler<HTMLDivElement>;
  onClickDelete: Function;
  orderNumber?: number;
}

const width = 124;

function MediaSmallCard({
  key,
  media_item,
  onClick,
  onClickDelete,
  orderNumber,
}: MediaSmallCardProps) {
  const { name, url, id } = media_item;

  // const url =
  //   'https://f004.backblazeb2.com/file/fashion-cms/placeholder/Black-boots-1.png';

  return (
    <div
      key={1}
      style={{
        // width,
        height: 160,
        marginTop: 6,
        marginBottom: 6,
        marginRight: 9,
        border: '1px solid #e6e6e6',
        borderRadius: 8,
        cursor: 'pointer',
        boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.1)',
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
              zIndex: 100000000,
              marginTop: 4,
              marginRight: 4,
              fontSize: 14,
              // height: 20,
              // fontWeight: 'bolder',
            }}
          />
        )}
        <Avatar
          src={url}
          size={108}
          style={{
            // width: 116,
            margin: '0 auto',
            // marginTop: 4,
            // borderRadius: 4,
            userSelect: 'none',
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
        <span
          style={{
            marginTop: 6,
            margin: '0 auto',
            whiteSpace: 'pre-wrap',
            textAlign: 'center',
          }}
        >
          {name}
        </span>
      </Row>
    </div>
  );
}

export { MediaSmallCard };
