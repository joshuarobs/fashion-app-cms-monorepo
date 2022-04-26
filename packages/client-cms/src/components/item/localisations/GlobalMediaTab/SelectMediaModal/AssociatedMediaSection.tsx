import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Switch, Typography } from 'antd';
import { MediaMediumBoxCard } from '../../../../common/media/MediaMediumBoxCard';

const { Paragraph, Text } = Typography;

const styles = {
  sectionTitle: {
    marginTop: 12,
    marginBottom: 8,
  },
};

interface AssociatedMediaSectionProps {
  // id: number;
  mediaItemAssociated: any;
  // defaultMediaItemAssociated: any;
  // refetchMediaItemAssociated: Function;
  refetchMediaItemsByIds: Function;
  showTitle?: boolean;
  setMediaItemIds: Function;
  selectedMediaIds: string[];
  viewGuidelines: boolean;
  setViewGuidelines: Function;
  showPopup: boolean;
  setShowPopup: Function;
  onSelectEntry: Function;
  onDeselectEntry: Function;
}

function AssociatedMediaSection({
  mediaItemAssociated,
  // defaultMediaItemAssociated,
  // refetchMediaItemAssociated,
  refetchMediaItemsByIds,
  showTitle = false,
  setMediaItemIds,
  selectedMediaIds,
  setShowPopup,
  onSelectEntry,
  onDeselectEntry,
}: AssociatedMediaSectionProps) {
  console.log('selectedMediaIds:', selectedMediaIds);
  // const [viewGuidelines, setViewGuidelines] = useState(false);
  // const [showPopup, setShowPopup] = useState(false);
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

  const deleteMediaCard = (id: string) => {
    console.log('id:', id);
    // @ts-ignore
    // console.log('deleteMediaCard#mediaItemAssociated:', mediaItemAssociated);
    // setCurrentMediaIds(
    //   _.remove(mediaItemAssociated, ({ id }) => {
    //     return toDeleteId === id;
    //   })
    // );
    // Remove the database entry id from the selected keys
    setMediaItemIds(currentMediaIds.filter((value) => value !== id));
    console.log(
      '___:',
      currentMediaIds.filter((value) => value !== id)
      // _.filter(mediaItemAssociated, )
      // @ts-ignore
      // currentMediaIds.filter((id) => {
      //   return toDeleteId === id;
      // })
    );
  };

  /**
   * Toggle adding/removing the media item from the list of selected media items
   * @param media_item
   */
  const onClick = (media_item: any) => {
    if (selectedMediaIds.includes(media_item.id)) {
      onDeselectEntry(media_item);
    } else {
      onSelectEntry(media_item);
    }
  };

  return (
    <>
      <div>
        <table>
          <tbody>
            <tr
              style={{
                width: '100%',
                display: 'flex',
                flexFlow: 'row wrap',
                gap: 8,
              }}
            >
              {mediaItemAssociated &&
                mediaItemAssociated.map((media_item: any, index: any) => (
                  // <td key={media_item.key}>
                  <td key={index}>
                    <MediaMediumBoxCard
                      key={media_item.key}
                      media_item={media_item}
                      onClick={() => onClick(media_item)}
                      onClickDelete={deleteMediaCard}
                      selected={selectedMediaIds.includes(media_item.id)}
                    />
                  </td>
                ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export { AssociatedMediaSection };
