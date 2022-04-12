import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { TableType } from '../../../../common/table-views/TableType';
import _ from 'lodash';
import { MediaItemsTableView } from '../../../../common/table-views/MediaItemsTableView';

interface SelectMediaModalProps {
  showModal: boolean;
  onCancel: (e: React.MouseEvent) => void;
  // onSubmit: (e: React.MouseEvent) => void;
  loading: boolean;
  currentMediaIds: any;
  setMediaItemIds: Function;
  loadMediaItems: Function;
}

function SelectMediaModal({
  showModal,
  onCancel,
  // onSubmit,
  loading,
  // newColourMixParts,
  currentMediaIds,
  setMediaItemIds,
  loadMediaItems,
}: SelectMediaModalProps) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [prevSelectedRowKeys, setPrevSelectedRowKeys] = useState([]);
  // const [allColourMixParts, setAllColourMixParts] = useState([]);
  const [selectedMediaIds, setSelectedMediaIds] = useState([]);
  const [prevSelectedMediaIds, setPrevSelectedMediaIds] = useState([]);
  // const [totalPercent, setTotalPercent] = useState(0);
  // const [prevTotalPercent, setPrevTotalPercent] = useState(0);
  const submitButtonDisabled = false;

  useEffect(() => {
    setSelectedMediaIds(currentMediaIds);
    setPrevSelectedMediaIds(currentMediaIds);
  }, [currentMediaIds]);

  console.log(
    'selectedMediaIds:',
    selectedMediaIds,
    '| prevSelectedMediaIds:',
    prevSelectedMediaIds
  );

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

  // const {
  //   loading: loadingAllColourMixParts,
  //   error: errorAllColourMixParts,
  //   data: dataAllColourMixParts,
  // } = useQuery(Get_All_Colour_Mix_Parts_Ids, {
  //   // onCompleted: setAllColourMixParts,
  // });

  // if (loadingAllColourMixParts) return <div />;
  // if (errorAllColourMixParts) {
  //   console.error(errorAllColourMixParts);
  //   return <p>Error :(</p>;
  // }
  console.log('selectedColourMixParts:', selectedMediaIds);
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
    selectedRowKeys: selectedMediaIds,
    hideSelectAll: true,
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
    setPrevSelectedMediaIds(selectedMediaIds);
    // setPrevTotalPercent(totalPercent);
    setMediaItemIds(selectedMediaIds);
    loadMediaItems();
    onCancel(e);
    e.preventDefault();
  };

  /**
   * Function to call when closing the popup
   * @param e
   */
  const onCancelThisPopup = (e: any) => {
    console.log('!!!onCancelThisPopup!!!');
    // When cancelling, reset any changes made
    setSelectedRowKeys(prevSelectedRowKeys);
    setSelectedMediaIds(prevSelectedMediaIds);
    // setTotalPercent(prevTotalPercent);
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
    console.log('selectedColourMixParts:', selectedMediaIds);
    // Push if not exists
    const recordIsSelected = _.includes(selectedMediaIds, record.id);

    if (!recordIsSelected) {
      // Add the database entry id into the selected keys
      setSelectedMediaIds(
        // @ts-ignore
        [...selectedMediaIds, record.id].sort()
      );
      // Add the row's key into the selected rows
      // For now, use the `key` set from the data loaded from the database
      // REDUNDANT? In the future, we may have to iterate through all the
      // passed in data to the table and get the key from there (isn't this
      // just a backwards approach of the same from the `key`?)
      // @ts-ignore
      setSelectedRowKeys([...selectedRowKeys, record.key].sort());
      // Add to the total percent
      // setTotalPercent(totalPercent + record.percent);
    }
  };

  /**
   * Function when a colour mix parts row's "Deselect" action button is clicked
   * @param record - Database info of the selected row's colour mix part
   */
  const onDeselectEntry = (record: any) => {
    // Push if not exists
    const recordIsSelected = _.includes(selectedMediaIds, record.id);
    console.log('onDeselectEntry.recordIsSelected:', recordIsSelected);

    if (recordIsSelected) {
      // Remove the database entry id from the selected keys
      setSelectedMediaIds(
        selectedMediaIds.filter((value) => value !== record.id)
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
      // setTotalPercent(totalPercent - record.percent);
    }
  };

  // let totalPercent = 0;
  // // @ts-ignore
  // actualColourMixPartsData.forEach(({ percent }) => (totalPercent += percent));
  //
  // const percentIsNot100 = totalPercent !== 1;
  // const totalPercentError = selectedMediaIds.length > 0 && percentIsNot100;

  return (
    <Modal
      visible={showModal}
      title="Select Global Media for Item (All Genders)"
      onCancel={onCancelThisPopup}
      onOk={onSubmit}
      style={{
        minWidth: 1200,
        // Default values for a MacBook Pro 16
        top: 16,
      }}
      footer={[
        <Button key="back" onClick={onCancelThisPopup}>
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
      <MediaItemsTableView
        isPopup
        onSelectEntry={onSelectEntry}
        onDeselectEntry={onDeselectEntry}
        rowSelection={rowSelection}
        selectedRowKeys={selectedRowKeys}
        type={TableType.Select_Multiple}
        selectedMediaIds={selectedMediaIds}
      />
    </Modal>
  );
}

export { SelectMediaModal };
