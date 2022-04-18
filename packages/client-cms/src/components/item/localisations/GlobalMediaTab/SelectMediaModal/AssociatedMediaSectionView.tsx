import React, { useState } from 'react';
import { AssociatedMediaSection } from './AssociatedMediaSection';
import { useQuery } from '@apollo/client';
import { Get_Item_And_Media_Item_Associated_For_Item_Id } from '../../../../../queries/item_and_media_item_associated/getItemAndMediaItemAssociatedForItemId';
import { Get_Media_Items_By_Ids } from '../../../../../queries/media_items/getMediaItemsByIds';
import { UnsavedChangesCard } from '../../../../common/UnsavedChangesCard';
import { Empty, Typography } from 'antd';

const { Text, Paragraph } = Typography;

interface AssociatedMediaSectionViewProps {
  // id: number;
  // mediaItemAssociated: [];
  // defaultMediaItemAssociated: [];
  mediaItemIds: string[];
  prevMediaItemIds: string[];
  // refetchMediaItemAssociated: Function;
  showTitle?: boolean;
  setMediaItemIds: Function;
}

function AssociatedMediaSectionView({
  // defaultMediaItemAssociated,
  mediaItemIds,
  prevMediaItemIds,
  // mediaItemAssociated,
  // refetchMediaItemAssociated,
  showTitle = false,
  setMediaItemIds,
}: AssociatedMediaSectionViewProps) {
  const [viewGuidelines, setViewGuidelines] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [currentMediaIds, setCurrentMediaIds] = useState([]);

  const {
    loading: loadingMediaItemsByIds,
    error: errorMediaItemsByIds,
    data: dataMediaItemsByIds,
    refetch: refetchMediaItemsByIds,
  } = useQuery(Get_Media_Items_By_Ids, {
    variables: { ids: mediaItemIds },
    fetchPolicy: 'network-only',
  });

  if (loadingMediaItemsByIds)
    // return <div style={{ minHeight: 200, backgroundColor: 'red' }} />;
    return <div />;
  if (errorMediaItemsByIds) {
    console.error(errorMediaItemsByIds);
    return <div>{errorMediaItemsByIds}</div>;
  }

  console.log(
    'mediaItemIds:',
    mediaItemIds,
    '| dataMediaItemsByIds.getMediaItemsByIds:',
    dataMediaItemsByIds
  );

  // Return empty element if there's no associated media ids
  if (mediaItemIds.length === 0) {
    return (
      <Empty
        description={
          <Text type="secondary" strong>
            No Associated Media
          </Text>
        }
      >
        <Text>You can add Associated Media to this Item:</Text>
        <Paragraph
          style={{
            width: 300,
            margin: '0 auto',
          }}
        >
          <ul>
            <li style={{ textAlign: 'initial' }}>
              Within the Locale Dashboard tab (close this popup)
            </li>
            <li style={{ textAlign: 'initial' }}>
              By adding media in the All Media tab
            </li>
            <li style={{ textAlign: 'initial' }}>
              By regenerating data loaded via the vendor's API in this Item
              entry's header (close this popup)
            </li>
          </ul>
        </Paragraph>
      </Empty>
    );
  }

  return (
    <>
      <AssociatedMediaSection
        // mediaItemAssociated={mediaItemAssociated}
        mediaItemAssociated={dataMediaItemsByIds.getMediaItemsByIds}
        // defaultMediaItemAssociated={defaultMediaItemAssociated}
        // refetchMediaItemAssociated={refetchMediaItemAssociated}
        refetchMediaItemsByIds={refetchMediaItemsByIds}
        setMediaItemIds={setMediaItemIds}
        viewGuidelines={viewGuidelines}
        setViewGuidelines={setViewGuidelines}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
      />
    </>
  );
}

export { AssociatedMediaSectionView };
