import React from 'react';
import { Col } from 'antd';

interface ColumnOfFramesProps {
  children?: any;
  freeWidth?: boolean;
  fullWidth?: boolean;
  isLastColumn?: boolean;
}

function ColumnOfFrames({
  children,
  freeWidth,
  fullWidth,
  isLastColumn,
}: ColumnOfFramesProps) {
  const baseStyle = {
    // margin: '0px 12px 0px 12px',
    // margin: '0px 0px 0px 0px',
    marginLeft: 12,
    marginRight: 12,
    // backgroundColor: '#faa',
  };

  let style: any = baseStyle;
  if (fullWidth) {
    style = { ...baseStyle, width: '100%' };
    // } else if (freeWidth !== true) {
  } else if (freeWidth !== true) {
    console.log('free width');
    style = { ...baseStyle, minWidth: 412, maxWidth: 412 };
  }

  if (isLastColumn) {
    console.log('yes it is');
    // style = { ...style, marginRight: 0 ,paddingRight: 24 };
  }

  return <Col style={style}>{children}</Col>;
}

export { ColumnOfFrames };
