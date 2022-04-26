import React, { MouseEventHandler } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Button, Col, Input, Row, Typography } from 'antd';
import { FrameTitleLevel2 } from '../../../common/typography/FrameTitleLevel2';
import styled from 'styled-components';
import { MediaSmallCard } from '../../../common/media/MediaSmallCard';
import { useGlobalMediaTabContext } from './_GlobalMediaTab';
import { SwitchElement } from '../../../common/SwitchElement';

const { Paragraph, Text } = Typography;
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
  // copyFull: any;
  disabled: boolean;
  openPopup: MouseEventHandler<HTMLElement>;
  viewGuidelines: boolean;
  setViewGuidelines: Function;
}

/**
 * Similar to ContentFrame, but this just contains the data in one of it's
 * two tabs, whereby both tabs are actually the same element (this component).
 */
function TabContentFrame({
  hasChanged,
  disabled,
  openPopup,
  viewGuidelines,
  setViewGuidelines,
}: TabContentFrameProps) {
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
  // console.log('123#TabContentFrame#mediaAllGenders:', mediaAllGenders);

  // const onSortableGridStateChange = (newState: any[]) => {
  //   setMediaItems(newState);
  //   console.log('newState:', newState);
  //   if (newState !== mediaItems) {
  //     // setMediaItemIds(newState.map(({ id }) => id));
  //   }
  //   // setMediaItemIds(newState.map(({ id }) => id));
  // };

  const { mediaAllGenders, setMediaAllGenders, notes, setNotes } =
    useGlobalMediaTabContext();

  const onChange = (a: any, b: any, c: any) => {
    // console.error('a:', a, 'b:', b, 'c:', c);
  };

  return (
    <div
      style={{
        padding: 2,
      }}
    >
      {/* TITLE */}
      <Row style={styles.sectionTitle}>
        <Col span={16}>
          <FrameTitleLevel2 text="Main Picture Gallery" />
        </Col>
        <Col span={8}>
          <label
            style={{
              userSelect: 'none',
              padding: 6,
            }}
          >
            <Text
              style={{
                marginRight: 12,
              }}
              type="secondary"
            >
              View Guidelines
            </Text>
            <SwitchElement
              checked={viewGuidelines}
              onChange={(checked: any) => setViewGuidelines(checked)}
            />
          </label>
        </Col>
      </Row>
      {viewGuidelines && (
        <Row style={{ whiteSpace: 'pre-wrap' }}>
          {/*<Button style={{ width: '100%' }}>View Guidelines</Button>*/}
          <Typography>
            <Text>Guidelines:</Text>
            <Paragraph
              style={{
                // width: 300,
                margin: '0 auto',
              }}
            >
              <ul>
                <li style={{ textAlign: 'initial' }}>
                  The pictures of the item by itself should be prioritised at
                  the front of the list (positions 1-5)
                  <li style={{ textAlign: 'initial' }}>
                    The forward-facing (front) picture should always be the
                    first picture
                  </li>
                  <li style={{ textAlign: 'initial' }}>
                    A side picture as the first picture is only appropriate for
                    shoes
                  </li>
                </li>
                <li style={{ textAlign: 'initial' }}>
                  Prioritise other pictures based on what people will most
                  likely see and want to see
                </li>
              </ul>
            </Paragraph>
          </Typography>
        </Row>
      )}
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
          onSort={onChange}
          // setList={onSortableGridStateChangeAllGenders}
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
      {/* TITLE - NOTES */}
      <Row style={styles.sectionTitle} gutter={gutter}>
        <Col span={24}>
          {!hasChanged.notes ? (
            // @ts-ignore
            <Text
              strong
              // type={!disabled && !notes ? 'danger' : ''}
            >
              Notes
            </Text>
          ) : (
            <Text strong mark>
              Notes**
            </Text>
          )}
        </Col>
      </Row>
      {/* TITLE - INPUTS */}
      <Row>
        <TextArea
          rows={4}
          /* @ts-ignore */
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          autoComplete="new-password"
          disabled={disabled}
        />
      </Row>
      <Row gutter={gutter} style={styles.descriptionColumn}>
        <Col>
          <Text type="secondary">
            Any notes relevant to this item's Global Media.
          </Text>
        </Col>
      </Row>
    </div>
  );
}

export { TabContentFrame };
