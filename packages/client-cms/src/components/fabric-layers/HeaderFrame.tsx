/**
 * Figma reference:
 * Components/Framework/Header Frame
 */

import React, { useEffect, useRef, useState } from 'react';
import { Button, PageHeader } from 'antd';
import { FabricLayersPageIcon } from '../common/icons/page-icons/FabricLayersPageIcon';
import { App_Shell } from '../../strings';
import { PlusOutlined, SyncOutlined } from '@ant-design/icons';
import { NewEntryModal } from './NewEntryModal';
import { FabricLayerType } from '@joshuarobs/clothing-framework';

function HeaderFrame() {
  const [showModal, setShowModal] = useState(false);

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

  const onSubmit = async () => {};

  const onClickAddNew = () => {
    setShowModal(true);
  };

  const onCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <NewEntryModal
        showModal={showModal}
        onCancel={onCancel}
        onSubmit={onSubmit}
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
        loading={false}
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
            onClick={onClickAddNew}
          >
            Add New
          </Button>,
        ]}
      />
    </>
  );
}

export { HeaderFrame };
