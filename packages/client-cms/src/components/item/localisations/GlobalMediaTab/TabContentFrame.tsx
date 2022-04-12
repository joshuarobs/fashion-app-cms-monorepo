import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Button, Col, Input, Row, Tooltip, Typography } from 'antd';
import { WarningFilled } from '@ant-design/icons';
import { red } from '@ant-design/colors';
import { FrameTitleLevel2 } from '../../../common/typography/FrameTitleLevel2';
import styled from 'styled-components';
import { MediaSmallCard } from '../../../common/media/MediaSmallCard';

const { Text } = Typography;
const { TextArea } = Input;

const gutter = 12;

const styles = {
  itemFamilyCell: {
    height: 50,
    paddingLeft: 8,
    paddingRight: 8,
    display: 'table',
    // textAlign: 'center',
  },
  itemFamilyCellContent: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  sectionTitle: {
    marginTop: 12,
    // marginBottom: 8,
    marginBottom: 4,
  },
  occasionsTitle: {
    marginTop: 12,
    marginBottom: 4,
  },
  checkbox: {
    width: '100%',
    paddingTop: 4,
    paddingBottom: 4,
  },
  descriptionColumn: {
    paddingTop: 4,
  },
};

const StyledReactSortableGrid = styled(ReactSortable)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
  //gap: 0.1rem;
`;

interface TabContentFrameProps {
  hasChanged: any;
  copyFull: any;
  disabled: boolean;
  description?: string;
  setDescription: Function;
  onPressEnterFullName: Function;
  onPressEnterShortName: Function;
}

/**
 * Similar to ContentFrame, but this just contains the data in one of it's
 * two tabs, whereby both tabs are actually the same element (this component).
 */
function TabContentFrame({
  hasChanged,
  copyFull,
  disabled,
  description,
  setDescription,
  onPressEnterFullName,
  onPressEnterShortName,
}: TabContentFrameProps) {
  const [testItems, setTestItems] = useState([
    {
      id: 1,
      name: 'shrek',
      url: 'https://f004.backblazeb2.com/file/fashion-cms/placeholder/Black-boots-1.png',
    },
    {
      id: 2,
      name: 'fiona',
      url: 'https://f004.backblazeb2.com/file/fashion-cms/placeholder/Black-boots-1.png',
    },
    {
      id: 3,
      name: 'donkey',
      url: 'https://f004.backblazeb2.com/file/fashion-cms/placeholder/Black-boots-1.png',
    },
    {
      id: 4,
      name: 'cat',
      url: 'https://f004.backblazeb2.com/file/fashion-cms/placeholder/Black-boots-1.png',
    },
    {
      id: 5,
      name: 'dog',
      url: 'https://f004.backblazeb2.com/file/fashion-cms/placeholder/Black-boots-1.png',
    },
    {
      id: 6,
      name: 'man',
      url: 'https://f004.backblazeb2.com/file/fashion-cms/placeholder/Black-boots-1.png',
    },
    {
      id: 7,
      name: 'woman',
      url: 'https://f004.backblazeb2.com/file/fashion-cms/placeholder/Black-boots-1.png',
    },
    {
      id: 8,
      name: 'man bear pig',
      url: 'https://f004.backblazeb2.com/file/fashion-cms/placeholder/Black-boots-1.png',
    },
  ]);

  return (
    <div
      style={{
        padding: 2,
      }}
    >
      {/* TITLE - FULL NAME AND SHORT NAME */}
      <Row style={styles.sectionTitle}>
        <FrameTitleLevel2 text={'Main Picture Gallery'} />
      </Row>
      <Row>
        <Col>
          {!hasChanged.full_name ? (
            // @ts-ignore
            <Text
              strong
              // type={!disabled && !full_name ? 'danger' : 'secondary'}
              type={!disabled ? 'danger' : 'secondary'}
            >
              All Genders
            </Text>
          ) : (
            <Text strong mark>
              All Genders**
            </Text>
          )}
        </Col>
      </Row>
      <Row
        style={{
          width: '100%',
        }}
      >
        {/* @ts-ignore */}
        <StyledReactSortableGrid
          // multiDrag // enables mutidrag
          // OR
          // swap // enables swap
          animation={250}
          list={testItems}
          setList={setTestItems}
          style={{ width: '100%' }}
          // style={{
          //   display: 'grid',
          //   // grid: '270px 270px / repeat(auto-fill, minmax(4rem, 1fr))',
          //   gridTemplateColumns: 'repeat(auto-fill, minmax(4rem, 1fr))',
          //   gap: '0.5rem',
          // }}
        >
          {testItems.map((item, index) => (
            // <div key={item.id} style={{
            //   height: '6rem',
            //   border: '1px solid #cccccc',
            // }}>{item.name}</div>
            <MediaSmallCard
              key={item.id.toString()}
              media_item={item}
              onClick={() => {}}
              onClickDelete={() => {}}
              orderNumber={index + 1}
            />
          ))}
        </StyledReactSortableGrid>
      </Row>
      <Row style={{ marginTop: 16 }}>
        <Button style={{ width: '100%' }}>Select Media</Button>
      </Row>
      {/* TITLE - DESCRIPTION */}
      <Row style={styles.sectionTitle} gutter={gutter}>
        <Col span={24}>
          {!hasChanged.description ? (
            // @ts-ignore
            <Text strong type={!disabled && !description ? 'danger' : ''}>
              Description
            </Text>
          ) : (
            <Text strong mark>
              Description**
            </Text>
          )}
        </Col>
      </Row>
      {/* TITLE - INPUTS */}
      <Row>
        <TextArea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          autoComplete="new-password"
          disabled={disabled}
        />
      </Row>
      <Row gutter={gutter} style={styles.descriptionColumn}>
        <Col>
          <Text type="secondary">The description of the item.</Text>
        </Col>
      </Row>
    </div>
  );
}

export { TabContentFrame };
