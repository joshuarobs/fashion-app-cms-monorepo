import React, { useState } from 'react';
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
  setNewColourMixParts: Function;
}

function SelectColourMixPartsModal({
  showModal,
  onCancel,
  // onSubmit,
  loading,
  setNewColourMixParts,
}: // rowSelection,
// submitButtonDisabled,
SelectColourMixPartsModalProps) {
  const [selectedColourMixParts, setSelectedColourMixParts] = useState([]);
  const submitButtonDisabled = false;

  console.error('selectedColourMixParts:', selectedColourMixParts);

  /**
   * Code required for row selection with checkboxes to work in the table
   * when selecting multiple colour mix parts
   */
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: []) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   'selectedRows: ',
      //   selectedRows
      // );
      const ids: number[] = [];
      // @ts-ignore
      selectedRows.forEach((value) => ids.push(value.id));
      // @ts-ignore
      setSelectedColourMixParts(ids);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  const onSubmit = (e: any) => {
    setNewColourMixParts(selectedColourMixParts);
    onCancel(e);
  };

  return (
    <Modal
      visible={showModal}
      title="Select Colour Mix Parts For New Fabric Layer"
      onCancel={onCancel}
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
