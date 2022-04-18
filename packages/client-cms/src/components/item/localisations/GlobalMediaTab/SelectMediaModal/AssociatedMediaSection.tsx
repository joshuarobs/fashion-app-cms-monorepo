import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Switch, Typography } from 'antd';
import { MediaSmallCardAdd } from '../../../../common/media/MediaSmallCardAdd';
import { MediaSmallCard } from '../../../../common/media/MediaSmallCard';
import {
  CheckOutlined,
  CloseOutlined,
  ExperimentOutlined,
} from '@ant-design/icons';
import { SwitchElement } from '../../../../common/SwitchElement';
import { FrameTitleLevel2 } from '../../../../common/typography/FrameTitleLevel2';

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
  viewGuidelines: boolean;
  setViewGuidelines: Function;
  showPopup: boolean;
  setShowPopup: Function;
}

function AssociatedMediaSection({
  mediaItemAssociated,
  // defaultMediaItemAssociated,
  // refetchMediaItemAssociated,
  refetchMediaItemsByIds,
  showTitle = false,
  setMediaItemIds,
  viewGuidelines,
  setViewGuidelines,
  showPopup,
  setShowPopup,
}: AssociatedMediaSectionProps) {
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

  return (
    <>
      <div>
        <table>
          <tbody>
            <tr
              style={{ width: '100%', display: 'flex', flexFlow: 'row wrap' }}
            >
              {mediaItemAssociated &&
                mediaItemAssociated.map((media_item: any, index: any) => (
                  // <td key={media_item.key}>
                  <td key={index}>
                    <MediaSmallCard
                      key={media_item.key}
                      media_item={media_item}
                      onClick={() => {}}
                      // @ts-ignore
                      onClickDelete={deleteMediaCard}
                    />
                  </td>
                ))}
              {/*<td key="manage-media">*/}
              {/*  <MediaSmallCardAdd onClick={openPopup} />*/}
              {/*</td>*/}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export { AssociatedMediaSection };
