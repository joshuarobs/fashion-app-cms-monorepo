import React, { useEffect, useState } from 'react';
import { Button, Modal, Row, Col } from 'antd';
import { ColourMixPartsTableView } from '../../common/table-views/ColourMixPartsTableView';
import { TableType } from '../../common/table-views/TableType';
import { Get_All_Colour_Mix_Parts_Ids } from '../../../queries/colour_mix_parts/getAllColourMixPartsIds';
import { useQuery } from '@apollo/client';
import _ from 'lodash';
import { TotalPercentRow } from './TotalPercentRow';

interface SelectColourMixPartsModalProps {
  showModal: boolean;
  onCancel: (e: React.MouseEvent) => void;
  // onSubmit: (e: React.MouseEvent) => void;
  loading: boolean;
  // rowSelection: any;
  // submitButtonDisabled: boolean;
  // newColourMixParts: number[];
  setNewColourMixParts: Function;
  loadColourMixParts: Function;
}

function SelectColourMixPartsModal({
  showModal,
  onCancel,
  // onSubmit,
  loading,
  // newColourMixParts,
  setNewColourMixParts,
  loadColourMixParts,
}: // rowSelection,
// submitButtonDisabled,
SelectColourMixPartsModalProps) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [prevSelectedRowKeys, setPrevSelectedRowKeys] = useState([]);
  /*
   * A copy of the `data` from `ColourMixPartsTableView`. We have to do
   * this, because if we are storing the selected row keys (i.e. 1, 2,
   * 3...) we have no way of knowing the actual object we store, because
   * it's in the child component's state. Thus, we will copy it into here,
   * from the callback function declared here, and use that within the
   * onSubmit function, to set the selected colour mixes for the previous
   * modal.
   */
  const [selectedRowsCopy, setSelectedRowsCopy] = useState([]);
  const [allColourMixParts, setAllColourMixParts] = useState([]);
  const [selectedColourMixPartsIds, setSelectedColourMixPartsIds] = useState(
    []
  );
  const [prevSelectedColourMixPartsIds, setPrevSelectedColourMixPartsIds] =
    useState([]);
  const [totalPercent, setTotalPercent] = useState(0);
  const [prevTotalPercent, setPrevTotalPercent] = useState(0);
  const submitButtonDisabled = false;

  // When selectedColourMixParts gets updated, update the selected keys
  // useEffect(() => {
  //   // setSelectedRowKeys();
  // }, [selectedColourMixParts]);

  // Set the colour mix parts of the select colour mix parts popup, to that
  // of those already selected in the previous main popup
  // useEffect(() => {
  //   // @ts-ignore
  //   // setSelectedRowKeys(newColourMixParts);
  //   // selectedRowKeys(selectedRowsCopy.map((value: any) => value.id));
  //   console.error('newColourMixParts:', newColourMixParts);
  //   console.error('selectedRowKeys:', selectedRowKeys);
  // }, [newColourMixParts, showModal]);

  const {
    loading: loadingAllColourMixParts,
    error: errorAllColourMixParts,
    data: dataAllColourMixParts,
  } = useQuery(Get_All_Colour_Mix_Parts_Ids, {
    onCompleted: setAllColourMixParts,
  });

  if (loadingAllColourMixParts) return <div />;
  if (errorAllColourMixParts) {
    console.error(errorAllColourMixParts);
    return <p>Error :(</p>;
  }
  console.log('selectedColourMixParts:', selectedColourMixPartsIds);
  console.log('selectedRowKeys:', selectedRowKeys);
  // console.log('dataAllColourMixParts:', dataAllColourMixParts);
  // console.log('allColourMixParts:', allColourMixParts);
  // useEffect(() => {
  //   setAllColourMixParts(dataAllColourMixParts.getAllColourMixPartsIds);
  // }, [dataAllColourMixParts]);

  /**
   * Code required for row selection with checkboxes to work in the table
   * when selecting multiple colour mix parts
   */
  const rowSelection = {
    selectedRowKeys,
    hideSelectAll: true,
    // preserveSelectedRowKeys: true,
    onChange: (selectedRowKeys: React.Key[], selectedRows: []) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
      // const ids: number[] = [];
      // @ts-ignore
      // selectedRows.forEach((value) => ids.push(value.id));
      // selectedRowKeys.forEach((value) => ids.push(value.id));
      // setSelectedRowsCopy(selectedRows);

      console.log(
        'dataAllColourMixParts.getAllColourMixPartsIds:',
        // @ts-ignore
        dataAllColourMixParts.getAllColourMixPartsIds
      );

      const colourMixParts = selectedRows.filter(({ id }) => {
        // console.log('key:', key);
        // @ts-ignore
        const isSelected = dataAllColourMixParts.getAllColourMixPartsIds.find(
          (item: any) => item.id === id
        );
        console.log('isSelected:', isSelected);
        return isSelected;
      });
      console.log('colourMixParts!!!:', colourMixParts);

      // @ts-ignore
      setSelectedRowKeys(selectedRowKeys);
      // console.error('selectedRows:', selectedRows);
    },
    getCheckboxProps: (record: any) => ({
      // disabled: record.name === 'Disabled User', // Column configuration not to be checked
      disabled: true,
      name: record.name,
    }),
  };

  const onSubmit = (e: any) => {
    // const ids: number[] = [];
    // selectedRowsCopy.forEach((value: any) => ids.push(value.id));
    // setNewColourMixParts(ids);
    // setNewColourMixParts(selectedRowsCopy.map((value: any) => value.id));
    // @ts-ignore
    // setNewColourMixParts(dataAllColourMixParts.getAllColourMixPartsIds.filter((tet) => return 5;));
    // setNewColourMixParts(colourMixParts);

    // const colourMixParts = selectedRowKeys.filter((key) => {
    //   console.log('key:', key);
    //   // @ts-ignore
    //   const isSelected = dataAllColourMixParts.getAllColourMixPartsIds.find(
    //     (item: any) => item.id === key
    //   );
    //   console.log('isSelected:', isSelected);
    //   return isSelected;
    // });
    // console.log('colourMixParts!!!:', colourMixParts);

    // @ts-ignore
    setPrevSelectedRowKeys(selectedRowKeys);
    setPrevSelectedColourMixPartsIds(selectedColourMixPartsIds);
    setPrevTotalPercent(totalPercent);
    setNewColourMixParts(selectedColourMixPartsIds);
    loadColourMixParts();
    onCancel(e);
  };

  /**
   * Function to call when closing the popup
   * @param e
   */
  const onCancelThisPopup = (e: any) => {
    // When cancelling, reset any changes made
    setSelectedRowKeys(prevSelectedRowKeys);
    setSelectedColourMixPartsIds(prevSelectedColourMixPartsIds);
    setTotalPercent(prevTotalPercent);
    onCancel(e);
  };

  /**
   * Function when a colour mix parts row's "Select" action button is clicked
   * @param record - Database info of the selected row's colour mix part
   * @param e
   */
  const onSelectEntry = (record: any, e?: any) => {
    // console.log('e:', e.target);
    console.log('onSelectEntry.record:', record);
    console.log('selectedColourMixParts:', selectedColourMixPartsIds);
    // Push if not exists
    const recordIsSelected = _.includes(selectedColourMixPartsIds, record.id);

    if (!recordIsSelected) {
      // Add the database entry id into the selected keys
      setSelectedColourMixPartsIds(
        // @ts-ignore
        [...selectedColourMixPartsIds, record.id].sort()
      );
      // Add the row's key into the selected rows
      // For now, use the `key` set from the data loaded from the database
      // REDUNDANT? In the future, we may have to iterate through all the
      // passed in data to the table and get the key from there (isn't this
      // just a backwards approach of the same from the `key`?)
      // @ts-ignore
      setSelectedRowKeys([...selectedRowKeys, record.key].sort());
      // Add to the total percent
      setTotalPercent(totalPercent + record.percent);
    }
  };

  /**
   * Function when a colour mix parts row's "Deselect" action button is clicked
   * @param record - Database info of the selected row's colour mix part
   */
  const onDeselectEntry = (record: any) => {
    // Push if not exists
    const recordIsSelected = _.includes(selectedColourMixPartsIds, record.id);
    console.log('onDeselectEntry.recordIsSelected:', recordIsSelected);

    if (recordIsSelected) {
      // Remove the database entry id from the selected keys
      setSelectedColourMixPartsIds(
        selectedColourMixPartsIds.filter((value) => value !== record.id)
      );

      // Add the row's key into the selected rows
      // For now, use the `key` set from the data loaded from the database
      // REDUNDANT? In the future, we may have to iterate through all the
      // passed in data to the table and get the key from there (isn't this
      // just a backwards approach of the same from the `key`?)
      setSelectedRowKeys(
        selectedRowKeys.filter((value) => value !== record.key)
      );
      // Remove from the total percent
      setTotalPercent(totalPercent - record.percent);
    }
  };

  // let totalPercent = 0;
  // // @ts-ignore
  // actualColourMixPartsData.forEach(({ percent }) => (totalPercent += percent));
  //
  const percentIsNot100 = totalPercent !== 1;
  const totalPercentError =
    selectedColourMixPartsIds.length > 0 && percentIsNot100;

  return (
    <Modal
      visible={showModal}
      title="Select Colour Mix Parts For New Fabric Layer"
      onCancel={onCancelThisPopup}
      onOk={onSubmit}
      style={{
        minWidth: 1200,
        // Default values for a MacBook Pro 16
        // top: 16,
      }}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={onSubmit}
          disabled={submitButtonDisabled}
        >
          Submit
        </Button>,
      ]}
    >
      <ColourMixPartsTableView
        size="small"
        type={TableType.Select_One}
        onSelectEntry={onSelectEntry}
        onDeselectEntry={onDeselectEntry}
        rowSelection={rowSelection}
        selectedRowKeys={selectedRowKeys}
      />
      <div style={{ marginLeft: 24, marginBottom: 16, marginTop: -12 }}>
        <TotalPercentRow
          totalPercent={totalPercent}
          totalPercentError={totalPercentError}
        />
      </div>
    </Modal>
  );
}

export { SelectColourMixPartsModal };
