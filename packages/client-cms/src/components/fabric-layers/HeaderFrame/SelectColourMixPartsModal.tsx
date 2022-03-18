import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { ColourMixPartsTableView } from '../../common/table-views/ColourMixPartsTableView';
import { TableType } from '../../common/table-views/TableType';

interface SelectColourMixPartsModalProps {
  showModal: boolean;
  onCancel: (e: React.MouseEvent) => void;
  // onSubmit: (e: React.MouseEvent) => void;
  loading: boolean;
  // rowSelection: any;
  // submitButtonDisabled: boolean;
  newColourMixParts: number[];
  setNewColourMixParts: Function;
  loadColourMixParts: Function;
}

function SelectColourMixPartsModal({
  showModal,
  onCancel,
  // onSubmit,
  loading,
  newColourMixParts,
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
  const submitButtonDisabled = false;

  // Set the colour mix parts of the select colour mix parts popup, to that
  // of those already selected in the previous main popup
  useEffect(() => {
    // @ts-ignore
    // setSelectedRowKeys(newColourMixParts);
    // selectedRowKeys(selectedRowsCopy.map((value: any) => value.id));
    console.error('newColourMixParts:', newColourMixParts);
    console.error('selectedRowKeys:', selectedRowKeys);
  }, [newColourMixParts, showModal]);

  /**
   * Code required for row selection with checkboxes to work in the table
   * when selecting multiple colour mix parts
   */
  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: []) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   'selectedRows: ',
      //   selectedRows
      // );
      // const ids: number[] = [];
      // @ts-ignore
      // selectedRows.forEach((value) => ids.push(value.id));
      // selectedRowKeys.forEach((value) => ids.push(value.id));
      setSelectedRowsCopy(selectedRows);
      // @ts-ignore
      setSelectedRowKeys(selectedRowKeys);
      console.error('selectedRows:', selectedRows);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  const onSubmit = (e: any) => {
    // const ids: number[] = [];
    // selectedRowsCopy.forEach((value: any) => ids.push(value.id));
    // setNewColourMixParts(ids);
    setNewColourMixParts(selectedRowsCopy.map((value: any) => value.id));
    // @ts-ignore
    setPrevSelectedRowKeys(selectedRowKeys);
    loadColourMixParts();
    onCancel(e);
  };

  const onCancelThisPopup = (e: any) => {
    // When cancelling, reset any changes made
    setSelectedRowKeys(prevSelectedRowKeys);
    onCancel(e);
  };

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
        onSelectEntry={() => {}}
        rowSelection={rowSelection}
      />
    </Modal>
  );
}

export { SelectColourMixPartsModal };
