import React from 'react';
import { AssociatedMediaSection } from './AssociatedMediaSection';
import { useQuery } from '@apollo/client';
import { Get_Item_And_Media_Item_Associated_For_Item_Id } from '../../../../../queries/item_and_media_item_associated/getItemAndMediaItemAssociatedForItemId';
import { Get_Media_Items_By_Ids } from '../../../../../queries/media_items/getMediaItemsByIds';

interface AssociatedMediaSectionViewProps {
  id: number;
  // mediaItemAssociated: [];
  defaultMediaItemAssociated: [];
  mediaItemIds: string[];
  // refetchMediaItemAssociated: Function;
  showTitle?: boolean;
  setMediaItemIds: Function;
}

function AssociatedMediaSectionView({
  id,
  defaultMediaItemAssociated,
  mediaItemIds,
  // mediaItemAssociated,
  // refetchMediaItemAssociated,
  showTitle = false,
  setMediaItemIds,
}: AssociatedMediaSectionViewProps) {
  // TODO: Make a query that does it, but takes in an array of ids

  const {
    loading: loadingMediaItemsByIds,
    error: errorMediaItemsByIds,
    data: dataMediaItemsByIds,
    refetch: refetchMediaItemsByIds,
  } = useQuery(Get_Media_Items_By_Ids, {
    variables: { ids: mediaItemIds },
    fetchPolicy: 'network-only',
  });

  if (loadingMediaItemsByIds) return <div />;
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

  // const mediaItemAssociated = dataMediaItemsByIds.getMediaItemsByIds.map(
  //   // @ts-ignore
  //   ({ media_item }, index) => ({ ...media_item, key: index })
  // );

  // const {
  //   loading: loadingMediaItemAssociated,
  //   error: errorMediaItemAssociated,
  //   data: dataMediaItemAssociated,
  //   refetch: refetchMediaItemAssociated,
  // } = useQuery(Get_Item_And_Media_Item_Associated_For_Item_Id, {
  //   variables: { id },
  //   fetchPolicy: 'network-only',
  // });
  //
  // if (loadingMediaItemAssociated) return <div />;
  // if (errorMediaItemAssociated) {
  //   console.error(errorMediaItemAssociated);
  //   return <div>{errorMediaItemAssociated}</div>;
  // }
  //
  // const mediaItemAssociated =
  //   dataMediaItemAssociated.getItemAndMediaItemAssociatedForItemId.map(
  //     // @ts-ignore
  //     ({ media_item }, index) => ({ ...media_item, key: index })
  //   );

  // const [mediaItemIds, setMediaItemIds] = useState([]);
  // console.log('mediaItemAssociated:', mediaItemAssociated);

  return (
    <AssociatedMediaSection
      id={id}
      // mediaItemAssociated={mediaItemAssociated}
      mediaItemAssociated={dataMediaItemsByIds.getMediaItemsByIds}
      // defaultMediaItemAssociated={defaultMediaItemAssociated}
      // refetchMediaItemAssociated={refetchMediaItemAssociated}
      refetchMediaItemsByIds={refetchMediaItemsByIds}
      setMediaItemIds={setMediaItemIds}
    />
  );
}

export { AssociatedMediaSectionView };
