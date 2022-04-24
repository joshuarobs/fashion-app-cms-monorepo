import React, { MouseEventHandler, useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Button, Col, Input, Row, Tooltip, Typography } from 'antd';
import { WarningFilled } from '@ant-design/icons';
import { red } from '@ant-design/colors';
import { FrameTitleLevel2 } from '../../../common/typography/FrameTitleLevel2';
import styled from 'styled-components';
import { MediaSmallCard } from '../../../common/media/MediaSmallCard';
import { useQuery } from '@apollo/client';
import { Get_Media_Items_By_Ids } from '../../../../queries/media_items/getMediaItemsByIds';

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
  openPopup: MouseEventHandler<HTMLElement>;
  description?: string;
  setDescription: Function;
  mediaAllGenders: object[];
  setMediaAllGenders: Function;
  onSortableGridStateChangeAllGenders: Function;
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
  openPopup,
  setDescription,
  mediaAllGenders,
  setMediaAllGenders,
  onSortableGridStateChangeAllGenders,
}: TabContentFrameProps) {
  // const [mediaItems, setMediaItems] = useState<object[]>([]);
  const [mediaAllGenders1, setMediaAllGenders1] = useState<object[]>([]);

  // const {
  //   loading: loadingMediaItemsByIds,
  //   error: errorMediaItemsByIds,
  //   data: dataMediaItemsByIds,
  //   refetch: refetchMediaItemsByIds,
  // } = useQuery(Get_Media_Items_By_Ids, {
  //   variables: { ids: [] },
  //   fetchPolicy: 'network-only',
  //   // fetchPolicy: 'cache-and-network',
  // });

  // useEffect(() => {
  //   if (!loadingMediaItemsByIds && dataMediaItemsByIds) {
  //     setMediaItems(dataMediaItemsByIds.getMediaItemsByIds);
  //   }
  // }, [loadingMediaItemsByIds, dataMediaItemsByIds]);

  // if (loadingMediaItemsByIds) return <div />;
  // if (errorMediaItemsByIds) return <div>Error :(</div>;
  // console.log('dataMediaItemsByIds:', dataMediaItemsByIds);
  // const mediaItems = dataMediaItemsByIds.getMediaItemsByIds;
  console.log('123#TabContentFrame#mediaAllGenders:', mediaAllGenders);

  // const onSortableGridStateChange = (newState: any[]) => {
  //   setMediaItems(newState);
  //   console.log('newState:', newState);
  //   if (newState !== mediaItems) {
  //     // setMediaItemIds(newState.map(({ id }) => id));
  //   }
  //   // setMediaItemIds(newState.map(({ id }) => id));
  // };

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
          {!hasChanged.mediaAllGenders ? (
            // @ts-ignore
            <Text
              strong
              // type={!disabled && !full_name ? 'danger' : 'secondary'}
              // type={!disabled ? 'danger' : 'secondary'}
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
          list={mediaAllGenders}
          // list={mediaAllGenders1}
          // @ts-ignore
          setList={setMediaAllGenders}
          // setList={(newState: any[]) =>
          //   onSortableGridStateChangeAllGenders(newState)
          // }
          style={{ width: '100%' }}
          // style={{
          //   display: 'grid',
          //   // grid: '270px 270px / repeat(auto-fill, minmax(4rem, 1fr))',
          //   gridTemplateColumns: 'repeat(auto-fill, minmax(4rem, 1fr))',
          //   gap: '0.5rem',
          // }}
        >
          {mediaAllGenders.map((item: any, index: number) => (
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
        <Button style={{ width: '100%' }} onClick={openPopup}>
          Select Media
        </Button>
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
