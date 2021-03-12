import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button, Col, Layout, Row } from 'antd';
import { NoGenericAssociationFullCol } from '../../NoGenericAssociationFullCol';
import { PopupSelectClothingShell } from '../../../item/PopupSelectClothingShell/_PopupSelectClothingShell';
import { FrameTitle } from '../../typography/FrameTitle';
import { ClothingShellMoreDetails } from './ClothingShellMoreDetails';
import { _EditClothingSegmentsPopup } from '../../popups/clothing-shell-related/EditClothingSegmentsPopup/_EditClothingSegmentsPopup';
import { ClothingSegmentsPopupMode } from '../../popups/clothing-shell-related/ClothingSegmentsPopupMode';
import { ClothingSegmentsData } from '@joshuarobs/clothing-framework';
import { ModelAndStatistics } from './ModelAndStatistics/_ModelAndStatistics';
import { ChangeClothingShellHeader } from './ChangeClothingShellHeader';
import { Get_Clothing_Shell_Base_Data_By_Pk } from '../../../../queries/clothing_shells/getClothingShellBaseDataByPk';
import { getBodyCoveragePercent } from '@joshuarobs/clothing-framework/build/classes/ClothingSegmentsData/getBodyCoveragePercent';
import { VersionablePageErrors } from '../../../../utils/quick-error-gen/VersionablePageErrors';

const { Content } = Layout;

const size = 'small';

const bodyGroupsData = [
  {
    key: '1',
    body_group: 'Feet',
    num_mask_segments: 2,
    percent: '100%',
  },
];

const bodyGroupsColumns = [
  {
    title: 'Body Group',
    dataIndex: 'body_group',
    key: 'body_group',
  },
  {
    title: '# of Mask Segments',
    dataIndex: 'num_mask_segments',
    key: 'num_mask_segments',
  },
  {
    title: 'Percent',
    dataIndex: 'percent',
    key: 'percent',
  },
];

const materialsData = [
  {
    data: [
      { name: 'Nylon', value: 67, colour: '#3C3D46' },
      { name: 'Polyester', value: 33, colour: '#797F93' },
    ],
  },
];

interface ClothingShellOverviewFrameProps {
  currentClothingShellId?: number | null;
  item?: any;
  pageIsItem?: boolean;
  clothingSegmentsData?: any;
  setClothingSegmentsData?: Function;
  setClothingShellId?: Function;
  resetClothingSegmentData?: Function;
  originalClothingShellId?: number | null;
  overrideClothingShell?: any;
  numberOfChanges?: number;
  hasChanged?: any;
  default_shell_layer_id?: number | null;
  default_lining_layer_id?: number | null;
  itemMaindataRevision?: any;
  name?: string;
  disabled?: boolean;
  clothingShellOverviewError?: VersionablePageErrors;
  heuristicItem?: any;
}

function ClothingShellOverviewFrame({
  currentClothingShellId,
  item,
  pageIsItem,
  clothingSegmentsData = {},
  setClothingSegmentsData = () => {},
  setClothingShellId = () => {},
  resetClothingSegmentData = () => {},
  originalClothingShellId,
  overrideClothingShell,
  numberOfChanges = 0,
  hasChanged = {},
  default_shell_layer_id = null,
  default_lining_layer_id = null,
  name,
  clothingShellOverviewError,
  // itemMaindataRevision,
  disabled = true,
  heuristicItem,
}: ClothingShellOverviewFrameProps) {
  console.log('overrideClothingShell:', overrideClothingShell);
  // console.log('itemMaindataRevision:', itemMaindataRevision);

  // Whether to show the popup or not (for selecting a clothing shell)
  const [
    showPopupSelectClothingShell,
    setShowPopupSelectClothingShell,
  ] = useState(false);

  const [showEditClothingShellPopup, setShowEditClothingShellPopup] = useState(
    false
  );

  // Popup (Item page) - Select Clothing Shell
  const showPopup = () => {
    setShowPopupSelectClothingShell(true);
  };

  const selectClothingShell = (id: any) => {
    setClothingShellId(id);
    setShowPopupSelectClothingShell(false);
  };

  // Mini statistics to display alongside the model image
  const [bodyCoverage, setBodyCoverage] = useState(null);
  useEffect(() => {
    if (heuristicItem) {
      setBodyCoverage(heuristicItem.percentCoverage);
    } else if (clothingSegmentsData) {
      // @ts-ignore
      setBodyCoverage(getBodyCoveragePercent(clothingSegmentsData));
    }
  }, [heuristicItem, clothingSegmentsData]);

  const [weight, setWeight] = useState(null);
  useEffect(() => {
    if (heuristicItem) {
      setWeight(heuristicItem.weight);
    }
  }, [heuristicItem]);

  // Skip loading from the database if:
  // 1. There's no valid clothing shell id
  const { loading, error, data } = useQuery(
    Get_Clothing_Shell_Base_Data_By_Pk,
    {
      variables: { id: currentClothingShellId },
      skip: !currentClothingShellId || overrideClothingShell,
    }
  );

  if (loading)
    return (
      <Content
        style={{
          minHeight: 280,
          maxWidth: 412,
          marginBottom: 24,
        }}
      />
    );
  if (error) return <div>Error! ${error}</div>;
  // console.log("data22aa:", data);

  let clothingShell = data
    ? data.clothing_shells_by_pk
      ? data.clothing_shells_by_pk
      : null
    : null;

  // console.error("clothingShell:", clothingShell);

  if (overrideClothingShell) {
    clothingShell = overrideClothingShell;
  }

  // The number (of items in clothing) to display to the user
  // Typically its number of items - 1, however, if the user has selected
  // a new clothing shell, then we ignore this
  let numItemsInClothingShell =
    clothingShell && clothingShell.counts ? clothingShell.counts.item_count : 0;

  // console.error("numItems:", numItemsInClothingShell);

  if (originalClothingShellId !== currentClothingShellId) {
  } else {
    numItemsInClothingShell -= 1;
  }

  let numberItemsText = 'Unique to this item';
  if (numItemsInClothingShell < 0) {
    numberItemsText = 'No current items';
  } else if (numItemsInClothingShell > 0) {
    numberItemsText = `Shared with ${numItemsInClothingShell} other items`;
  }

  // console.log("clothing shell:", clothingShell);
  let currentDefaultShellLayerId = default_shell_layer_id;
  if (!currentDefaultShellLayerId && clothingShell) {
    currentDefaultShellLayerId = clothingShell.default_shell_layer_id;
  }

  let currentDefaultLiningLayerId = default_lining_layer_id;
  if (!currentDefaultLiningLayerId && clothingShell) {
    currentDefaultLiningLayerId = clothingShell.default_lining_layer_id;
  }

  console.log('currentDefaultShellLayerId:', currentDefaultShellLayerId);

  let rightSleeveStartFront = null;
  let rightSleeveEndFront = null;
  let rightSleeveStartBack = null;
  let rightSleeveEndBack = null;
  let leftSleeveStartFront = null;
  let leftSleeveEndFront = null;
  let leftSleeveStartBack = null;
  let leftSleeveEndBack = null;
  let rightBodyStartFront = null;
  let rightBodyEndFront = null;
  let rightBodyStartBack = null;
  let rightBodyEndBack = null;
  let leftBodyStartFront = null;
  let leftBodyEndFront = null;
  let leftBodyStartBack = null;
  let leftBodyEndBack = null;
  let leftSpecialGroinFill = null;
  let rightSpecialGroinFill = null;
  let sleevesIsSymmetrical = true;
  let sleevesFrontBackIsSame = true;
  let bodyIsSymmetrical = true;
  let bodyFrontBackIsSame = true;

  if (heuristicItem) {
    const { base_clothing_segments } = heuristicItem;

    if (clothingShell) {
    } else if (base_clothing_segments) {
      console.log('base_clothing_segments:', base_clothing_segments);
      const {
        sleeves_is_symmetrical,
        sleeves_front_back_is_same,
        body_is_symmetrical,
        body_front_back_is_same,
      } = base_clothing_segments;
      rightSleeveStartFront = base_clothing_segments.right_sleeve_start_front;
      rightSleeveEndFront = base_clothing_segments.right_sleeve_end_front;
      if (sleeves_front_back_is_same) {
        rightSleeveStartBack = base_clothing_segments.right_sleeve_start_front;
        rightSleeveEndBack = base_clothing_segments.right_sleeve_end_front;
      } else {
        rightSleeveStartBack = base_clothing_segments.right_sleeve_start_back;
        rightSleeveEndBack = base_clothing_segments.right_sleeve_end_back;
      }
      rightBodyStartFront = base_clothing_segments.right_body_start_front;
      rightBodyEndFront = base_clothing_segments.right_body_end_front;
      if (body_front_back_is_same) {
        rightBodyStartBack = base_clothing_segments.right_body_start_front;
        rightBodyEndBack = base_clothing_segments.right_body_end_front;
      } else {
        rightBodyStartBack = base_clothing_segments.right_body_start_back;
        rightBodyEndBack = base_clothing_segments.right_body_end_back;
      }
      rightSpecialGroinFill = base_clothing_segments.right_special_groin_fill;

      // console.log('base_clothing_segments', base_clothing_segments);

      if (sleeves_is_symmetrical && sleeves_front_back_is_same) {
        // console.log('Sleeves - symmetrical, front and back same');
        leftSleeveStartFront = rightSleeveStartFront;
        leftSleeveEndFront = rightSleeveEndFront;
        leftSleeveStartBack = leftSleeveStartFront;
        leftSleeveEndBack = leftSleeveEndFront;
      } else if (sleeves_is_symmetrical && !sleeves_front_back_is_same) {
        // console.log('Sleeves - symmetrical, front and back NOT same');
        leftSleeveStartFront = rightSleeveStartFront;
        leftSleeveEndFront = rightSleeveEndFront;
        leftSleeveStartBack = base_clothing_segments.right_sleeve_start_back;
        leftSleeveEndBack = base_clothing_segments.right_sleeve_end_back;
      } else if (!sleeves_is_symmetrical && sleeves_front_back_is_same) {
        // console.log('Sleeves - NOT symmetrical, front and back same');
        leftSleeveStartFront = base_clothing_segments.left_sleeve_start_front;
        leftSleeveEndFront = base_clothing_segments.left_sleeve_end_front;
        leftSleeveStartBack = leftSleeveStartFront;
        leftSleeveEndBack = leftSleeveEndFront;
      } else {
        // console.log('Sleeves - NOT symmetrical, NOT front and back same');
        leftSleeveStartFront = base_clothing_segments.left_sleeve_start_front;
        leftSleeveEndFront = base_clothing_segments.left_sleeve_end_front;
        leftSleeveStartBack = base_clothing_segments.left_sleeve_start_back;
        leftSleeveEndBack = base_clothing_segments.left_sleeve_end_back;
      }

      if (body_is_symmetrical && body_front_back_is_same) {
        // console.log('Body - symmetrical, front and back same');
        leftBodyStartFront = rightBodyStartFront;
        leftBodyEndFront = rightBodyEndFront;
        leftBodyStartBack = leftBodyStartFront;
        leftBodyEndBack = leftBodyEndFront;
      } else if (body_is_symmetrical && !body_front_back_is_same) {
        // console.log('Body - symmetrical, front and back NOT same');
        leftBodyStartFront = rightBodyStartFront;
        leftBodyEndFront = rightBodyEndFront;
        leftBodyStartBack = base_clothing_segments.right_body_start_back;
        leftBodyEndBack = base_clothing_segments.right_body_end_back;
      } else if (!body_is_symmetrical && body_front_back_is_same) {
        // console.log('Body - NOT symmetrical, front and back same');
        leftBodyStartFront = base_clothing_segments.left_body_start_front;
        leftBodyEndFront = base_clothing_segments.left_body_end_front;
        leftBodyStartBack = leftBodyStartFront;
        leftBodyEndBack = leftBodyEndFront;
      } else {
        // console.log('Body - NOT symmetrical, NOT front and back same');
        leftBodyStartFront = base_clothing_segments.left_body_start_front;
        leftBodyEndFront = base_clothing_segments.left_body_end_front;
        leftBodyStartBack = base_clothing_segments.left_body_start_back;
        leftBodyEndBack = base_clothing_segments.left_body_end_back;
      }

      // Special cases
      if (body_is_symmetrical) {
        leftSpecialGroinFill = rightSpecialGroinFill;
      }

      sleevesIsSymmetrical = sleeves_is_symmetrical;
      sleevesFrontBackIsSame = sleeves_front_back_is_same;
      bodyIsSymmetrical = body_is_symmetrical;
      bodyFrontBackIsSame = body_front_back_is_same;
    }
  }

  const heuristicClothingSegmentsData = new ClothingSegmentsData(
    rightSleeveStartFront,
    rightSleeveEndFront,
    rightSleeveStartBack,
    rightSleeveEndBack,
    leftSleeveStartFront,
    leftSleeveEndFront,
    leftSleeveStartBack,
    leftSleeveEndBack,
    rightBodyStartFront,
    rightBodyEndFront,
    rightBodyStartBack,
    rightBodyEndBack,
    leftBodyStartFront,
    leftBodyEndFront,
    leftBodyStartBack,
    leftBodyEndBack,
    rightSpecialGroinFill,
    leftSpecialGroinFill,
    sleevesIsSymmetrical,
    sleevesFrontBackIsSame,
    bodyIsSymmetrical,
    bodyFrontBackIsSame
  );

  // console.log('clothingSegmentsData:', clothingSegmentsData);
  // console.log('currentClothingShellId:', currentClothingShellId);
  // console.log('clothingShell:', clothingShell);
  // console.log('heuristicItem:', heuristicItem);

  const editClothingSegmentsPopupMode =
    (pageIsItem && clothingShell) || disabled
      ? ClothingSegmentsPopupMode.Readonly
      : ClothingSegmentsPopupMode.Edit;

  console.log('heuristic or na:', heuristicItem || !clothingSegmentsData);

  return (
    <Content
      style={{
        minHeight: 280,
        maxWidth: 412,
        marginBottom: 24,
      }}
    >
      {item && !heuristicItem && (
        <PopupSelectClothingShell
          item={item}
          currentClothingShellId={currentClothingShellId}
          visible={showPopupSelectClothingShell}
          hidePopup={() => setShowPopupSelectClothingShell(false)}
          selectClothingShell={selectClothingShell}
        />
      )}
      {clothingShell && (
        <_EditClothingSegmentsPopup
          showModal={showEditClothingShellPopup}
          onCancel={() => setShowEditClothingShellPopup(false)}
          onSubmit={() => {}}
          popupMode={editClothingSegmentsPopupMode}
          clothingShell={clothingShell}
          hasChanged={hasChanged}
          // clothingSegmentsData={heuristicClothingSegmentsData}
          editedClothingSegmentsData={clothingSegmentsData}
          setEditedClothingSegmentsData={setClothingSegmentsData}
          resetClothingSegmentData={resetClothingSegmentData}
          bodyCoverage={bodyCoverage}
          nameTitle={name}
        />
      )}
      <div
        style={{
          padding: 16,
          background: '#fff',
          borderRadius: 4,
        }}
      >
        {pageIsItem && !clothingShell && !heuristicItem && (
          <NoGenericAssociationFullCol
            itemName="Clothing Shell"
            isChangesMade={originalClothingShellId !== currentClothingShellId}
            isImportant
            onClick={showPopup}
            disabled={disabled}
          />
        )}
        {pageIsItem && clothingShell && (
          <ChangeClothingShellHeader
            originalClothingShellId={originalClothingShellId}
            currentClothingShellId={currentClothingShellId}
            numberItemsText={numberItemsText}
            clothingShell={clothingShell}
            showPopup={showPopup}
            removeClothingShell={() => setClothingShellId(null)}
            clothingShellOverviewError={clothingShellOverviewError}
            disabled={disabled}
          />
        )}
        <Row>
          <Col span={16}>
            <FrameTitle
              text="Clothing Shell Overview"
              hasChanged={numberOfChanges > 0}
            />
          </Col>
          <Col
            span={8}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button onClick={() => setShowEditClothingShellPopup(true)}>
              {editClothingSegmentsPopupMode === ClothingSegmentsPopupMode.Edit
                ? 'Edit'
                : 'View'}
            </Button>
          </Col>
        </Row>
        <ModelAndStatistics
          bodyCoverage={bodyCoverage}
          weight={weight}
          // clothingSegmentsData={clothingSegmentsData}
          clothingSegmentsData={
            heuristicItem || !clothingSegmentsData
              ? heuristicClothingSegmentsData
              : clothingSegmentsData
          }
        />
        {clothingShell && (
          <ClothingShellMoreDetails
            bodyGroupsData={bodyGroupsData}
            bodyGroupsColumns={bodyGroupsColumns}
            currentDefaultShellLayerId={currentDefaultShellLayerId}
            currentDefaultLiningLayerId={currentDefaultLiningLayerId}
            hasChanged={hasChanged}
            pageIsItem={pageIsItem}
            materialsData={materialsData}
          />
        )}
      </div>
    </Content>
  );
}

export { ClothingShellOverviewFrame };
