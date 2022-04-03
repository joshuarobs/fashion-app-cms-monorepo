import React, { MouseEventHandler } from 'react';
import { CloseOutlined, PlusOutlined, ZoomInOutlined } from '@ant-design/icons';
import { Avatar, Button, Row } from 'antd';

interface MediaSmallCardProps {
  key: string;
  media_item: any;
  onClick: MouseEventHandler<HTMLDivElement>;
  onClickDelete: Function;
}

const width = 124;

function MediaSmallCard({
  key,
  media_item,
  onClick,
  onClickDelete,
}: MediaSmallCardProps) {
  const { name, url, id } = media_item;

  // const url =
  //   'https://f004.backblazeb2.com/file/fashion-cms/placeholder/Black-boots-1.png';

  return (
    <div
      key={1}
      style={{
        width,
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
      }}
      onClick={onClick}
    >
      <Row
        style={{
          display: 'flex',
          justifyContent: 'right',
        }}
      >
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
