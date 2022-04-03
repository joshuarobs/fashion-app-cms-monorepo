import React from 'react';
import { AssociatedMediaSection } from './AssociatedMediaSection';
import { useQuery } from '@apollo/client';
import { Get_Item_And_Media_Item_Associated_For_Item_Id } from '../../../../../queries/item_and_media_item_associated/getItemAndMediaItemAssociatedForItemId';
import { Get_Media_Items_By_Ids } from '../../../../../queries/media_items/getMediaItemsByIds';
import { UnsavedChangesCard } from '../../../../common/UnsavedChangesCard';

interface AssociatedMediaSectionViewProps {
  id: number;
  // mediaItemAssociated: [];
  defaultMediaItemAssociated: [];
  mediaItemIds: string[];
  prevMediaItemIds: string[];
  // refetchMediaItemAssociated: Function;
  showTitle?: boolean;
  setMediaItemIds: Function;
}

function AssociatedMediaSectionView({
  id,
  defaultMediaItemAssociated,
  mediaItemIds,
  prevMediaItemIds,
  // mediaItemAssociated,
  // refetchMediaItemAssociated,
  showTitle = false,
  setMediaItemIds,
}: AssociatedMediaSectionViewProps) {
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

  return (
    <>
      <AssociatedMediaSection
        id={id}
        // mediaItemAssociated={mediaItemAssociated}
        mediaItemAssociated={dataMediaItemsByIds.getMediaItemsByIds}
        // defaultMediaItemAssociated={defaultMediaItemAssociated}
        // refetchMediaItemAssociated={refetchMediaItemAssociated}
        refetchMediaItemsByIds={refetchMediaItemsByIds}
        setMediaItemIds={setMediaItemIds}
      />
    </>
  );
}

export { AssociatedMediaSectionView };
