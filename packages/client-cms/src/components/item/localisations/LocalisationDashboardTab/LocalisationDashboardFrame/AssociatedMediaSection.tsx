import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Switch, Typography } from 'antd';
import { MediaSmallCardAdd } from '../../../../common/media/MediaSmallCardAdd';
import { MediaSmallCard } from '../../../../common/media/MediaSmallCard';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { SwitchElement } from '../../../../common/SwitchElement';
import { FrameTitleLevel2 } from '../../../../common/typography/FrameTitleLevel2';
import { AddMediaModal } from '../AddMediaModal';
import { useQuery } from '@apollo/client';
import { Get_Item_And_Media_Item_Associated_For_Item_Id } from '../../../../../queries/item_and_media_item_associated/getItemAndMediaItemAssociatedForItemId';

const { Paragraph, Text } = Typography;

interface AssociatedMediaSectionProps {
  id: number;
  mediaItemAssociated: any;
  // defaultMediaItemAssociated: any;
  // refetchMediaItemAssociated: Function;
  refetchMediaItemsByIds: Function;
  showTitle?: boolean;
  setMediaItemIds: Function;
}

function AssociatedMediaSection({
  id,
  mediaItemAssociated,
  // defaultMediaItemAssociated,
  // refetchMediaItemAssociated,
  refetchMediaItemsByIds,
  showTitle = false,
  setMediaItemIds,
}: AssociatedMediaSectionProps) {
  const [viewGuidelines, setViewGuidelines] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [currentMediaIds, setCurrentMediaIds] = useState([]);
  const [prevMediaIds, setPrevMediaIds] = useState([]);
  // Differs from prev, as prev is part of unsaved changes, but original is
  // the original data from the database
  const [originalMediaIds, setOriginalMediaIds] = useState([]);

  useEffect(() => {
    // console.log('mediaItemAssociated:', mediaItemAssociated);
    // console.error('@@ mediaItemAssociated:', mediaItemAssociated);
    setCurrentMediaIds(mediaItemAssociated.map(({ id }: any) => id));
  }, [mediaItemAssociated]);

  // console.log('currentMediaIds:', currentMediaIds);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <AddMediaModal
        loadMediaItems={() => {}}
        loading={false}
        showModal={showPopup}
        currentMediaIds={currentMediaIds}
        setMediaItemIds={setMediaItemIds}
        onCancel={closePopup}
      />
      <div>
        <Row>
          <Col span={16}>
            <FrameTitleLevel2 text="Associated Media" />
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
              <Paragraph>
                This is the collection of all the media (images and video)
                associated with this item. These media will appear as first
                selection when choosing the 10 images to show for this item. You
                can still choose to add images to the 10 images list even if
                they aren’t associated (as shown below).
              </Paragraph>
              <Paragraph>
                Any image or video that shows the product (item) should be
                included here. Whether or not they will actually be displayed,
                will be determined in the Global Media tab, or within the
                locales.
              </Paragraph>
            </Typography>
          </Row>
        )}
        <div style={{ width: '100%', display: 'flex', flexFlow: 'row wrap' }}>
          {mediaItemAssociated &&
            mediaItemAssociated.map((media_item: any) => (
              <MediaSmallCard
                key={media_item.key}
                media_item={media_item}
                onClick={() => {}}
              />
            ))}
          <MediaSmallCardAdd onClick={openPopup} />
        </div>
      </div>
    </>
  );
}

export { AssociatedMediaSection };
