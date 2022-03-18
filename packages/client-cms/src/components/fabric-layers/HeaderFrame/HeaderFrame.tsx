/**
 * Figma reference:
 * Components/Framework/Header Frame
 */

import React, { useEffect, useRef, useState } from 'react';
import { Button, PageHeader } from 'antd';
import { FabricLayersPageIcon } from '../../common/icons/page-icons/FabricLayersPageIcon';
import { App_Shell } from '../../../strings';
import { PlusOutlined, SyncOutlined } from '@ant-design/icons';
import { NewEntryModal } from './NewEntryModal';
import { FabricLayerType } from '@joshuarobs/clothing-framework';
import { ColourMixPartsTableView } from '../../common/table-views/ColourMixPartsTableView';
import { SelectColourMixPartsModal } from './SelectColourMixPartsModal';
import { useLazyQuery } from '@apollo/client';
import { Get_Colour_Mix_Parts_Multiple_By_Ids } from '../../../queries/colour_mix_parts/getColourMixPartsMultipleByIds';

function HeaderFrame() {
  // States - New Popup Modal
  const [showModal, setShowModal] = useState(true);
  const [newFabricLayerType, setNewFabricLayerType] = useState(
    FabricLayerType.Shell
  );
  const [newColourPattern, setNewColourPattern] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newThickness, setNewThickness] = useState(0);
  const [newInsulationPoints, setNewInsulationPoints] = useState(0);
  const [newDensity, setNewDensity] = useState(0);
  const [newPermeability, setNewPermeability] = useState(0);
  const [newColourMixParts, setNewColourMixParts] = useState([]);
  const totalPercentage = 0;

  // Lazy query for loading the selected colour mix parts
  const [
    loadColourMixParts,
    {
      called: calledSelectColours,
      loading: loadingSelectColours,
      data: dataSelectColours,
    },
  ] = useLazyQuery(Get_Colour_Mix_Parts_Multiple_By_Ids, {
    variables: { ids: newColourMixParts },
  });

  console.error('dataSelectColours:', dataSelectColours);

  // States - Select Colour Mix Parts Modal
  const [showSelectColourMixPartsModal, setShowSelectColourMixPartsModal] =
    useState(false);
  const selectColourMixPartsSubmitButtonDisabled = false;

  /*
   * Code to make the first field of the form automatically selected when
   * opening the popup
   */
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      // @ts-ignore
      inputRef.current.focus();
    }
  }, [showModal]);

  // Functions - New Popup Modal
  const onClickAddNewFabricLayer = () => {
    setShowModal(true);
  };

  const onCancelModal = () => {
    setShowModal(false);
  };

  const onSubmitModal = async () => {};

  // Functions - Select Colour Mix Parts Modal
  const onClickSelectColourMixPartsModal = () => {
    setShowSelectColourMixPartsModal(true);
  };

  const onCancelSelectColourMixPartsModal = () => {
    setShowSelectColourMixPartsModal(false);
  };

  const onSubmitSelectColourMixPartsModal = async () => {};
  console.error('newColourMixParts!:', newColourMixParts);

  return (
    <>
      <NewEntryModal
        showModal={showModal}
        onCancel={onCancelModal}
        onSubmit={onSubmitModal}
        inputRef={inputRef}
        fabricLayerType={newFabricLayerType}
        setFabricLayerType={setNewFabricLayerType}
        colourPattern={newColourPattern}
        setColourPattern={setNewColourPattern}
        notes={newNotes}
        setNotes={setNewNotes}
        thickness={newThickness}
        setThickness={setNewThickness}
        insulationPoints={newInsulationPoints}
        setInsulationPoints={setNewInsulationPoints}
        density={newDensity}
        setDensity={setNewDensity}
        permeability={newPermeability}
        setPermeability={setNewPermeability}
        colourMixParts={newColourMixParts}
        setColourMixParts={setNewColourMixParts}
        onClickSelectColourMixPartsModal={onClickSelectColourMixPartsModal}
        loading={false}
        colourMixPartsData={dataSelectColours}
        loadingSelectColours={loadingSelectColours}
      />
      <SelectColourMixPartsModal
        showModal={showSelectColourMixPartsModal}
        onCancel={onCancelSelectColourMixPartsModal}
        // onSubmit={onSubmitSelectColourMixPartsModal}
        loading={false}
        newColourMixParts={newColourMixParts}
        setNewColourMixParts={setNewColourMixParts}
        loadColourMixParts={loadColourMixParts}
        // rowSelection={rowSelection}
        // onSelectColourMixPartsModal={}
      />
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
          backgroundColor: '#fff',
        }}
        title={
          <div>
            <FabricLayersPageIcon />
            {App_Shell.Sidebar.Pages.Fabric_Layers}
          </div>
        }
        extra={[
          <Button
            key="1"
            type="primary"
            size="small"
            icon={<PlusOutlined />}
            onClick={onClickAddNewFabricLayer}
          >
            Add New
          </Button>,
        ]}
      />
    </>
  );
}

export { HeaderFrame };
