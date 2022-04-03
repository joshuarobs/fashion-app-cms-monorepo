import React from 'react';
import { AssociatedMediaSection } from './AssociatedMediaSection';
import { useQuery } from '@apollo/client';
import { Get_Item_And_Media_Item_Associated_For_Item_Id } from '../../../../../queries/item_and_media_item_associated/getItemAndMediaItemAssociatedForItemId';

interface AssociatedMediaSectionViewProps {
  id: number;
  // mediaItemAssociated: [];
  // refetchMediaItemAssociated: Function;
  showTitle?: boolean;
  setMediaItemIds: Function;
}

function AssociatedMediaSectionView({
  id,
  // mediaItemAssociated,
  // refetchMediaItemAssociated,
  showTitle = false,
  setMediaItemIds,
}: AssociatedMediaSectionViewProps) {
  // TODO: Make a query that does it, but takes in an array of ids

  const {
    loading: loadingMediaItemAssociated,
    error: errorMediaItemAssociated,
    data: dataMediaItemAssociated,
    refetch: refetchMediaItemAssociated,
  } = useQuery(Get_Item_And_Media_Item_Associated_For_Item_Id, {
    variables: { id },
    fetchPolicy: 'network-only',
  });

  if (loadingMediaItemAssociated) return <div />;
  if (errorMediaItemAssociated) {
    console.error(errorMediaItemAssociated);
    return <div>{errorMediaItemAssociated}</div>;
  }

  const mediaItemAssociated =
    dataMediaItemAssociated.getItemAndMediaItemAssociatedForItemId.map(
      // @ts-ignore
      ({ media_item }, index) => ({ ...media_item, key: index })
    );

  // const [mediaItemIds, setMediaItemIds] = useState([]);
  console.log('mediaItemAssociated:', mediaItemAssociated);

  return (
    <AssociatedMediaSection
      id={id}
      mediaItemAssociated={mediaItemAssociated}
      // refetchMediaItemAssociated={refetchMediaItemAssociated}
      setMediaItemIds={setMediaItemIds}
    />
  );
}

export { AssociatedMediaSectionView };
