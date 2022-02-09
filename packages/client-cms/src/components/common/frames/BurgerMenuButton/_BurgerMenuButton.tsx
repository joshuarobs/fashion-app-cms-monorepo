import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Dropdown, Menu } from 'antd';
import {
  EllipsisOutlined,
  CheckCircleOutlined,
  UserOutlined,
  CopyOutlined,
  DeleteOutlined,
  RightCircleOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { ConfirmDeleteModal } from '../../popups/ConfirmDeleteModal';
import { Common } from '../../../../strings';
import { ModalKind } from './ModalKind';

interface BurgerMenuButtonProps {
  revision?: any;
  setToRetiredData?: any;
  deleteRevision: Function;
}

function BurgerMenuButton({
  revision = {},
  setToRetiredData = {},
  deleteRevision,
}: BurgerMenuButtonProps) {
  const [showModalKind, setShowModalKind] = useState(ModalKind.None);

  const onCancel = () => {
    setShowModalKind(ModalKind.None);
  };

  const onSubmitChangeState = () => {
    setToRetiredData.overrideStateToRetired();
    setShowModalKind(ModalKind.None);
  };

  const onSubmitDelete = () => {
    console.log('revision:', revision);
    deleteRevision({
      variables: {
        id: revision.id,
      },
    }).then();
    setShowModalKind(ModalKind.None);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      // @ts-ignore
      inputRef.current.focus();
    }
  }, [showModalKind]);

  // HANDLE SPECIAL OPTIONS (2nd category)
  const specialOptions = [];
  if (setToRetiredData.optionVisible) {
    specialOptions.push(
      <Menu.Item
        key={ModalKind.Retire}
        icon={<StopOutlined />}
        onClick={() => setShowModalKind(ModalKind.Retire)}
        disabled={setToRetiredData.optionDisabled}
        danger={!setToRetiredData.optionDisabled}
      >
        Set to Retired
      </Menu.Item>
    );
  }

  // If there's at least one special option, add a divider at the end of the
  // group
  if (specialOptions.length > 0) {
    specialOptions.push(<Menu.Divider key={'special-divider'} />);
  }

  const revisionName = `Revision ${revision.revision}`;

  return (
    <>
      {setToRetiredData.optionVisible && (
        <ConfirmDeleteModal
          title={`Set to Retired - ${revisionName}`}
          targetText={revisionName}
          deleteText={Common.Retire}
          messages={[
            {
              message: Common.State_Related.Warning_Retire_Maindata_Revision,
              type: 'warning',
            },
            {
              message:
                Common.State_Related.Warning_Delete_Confirmation_Part_1 +
                revisionName +
                Common.State_Related.Warning_Delete_Confirmation_Part_2,
              type: 'warning',
            },
          ]}
          showModal={showModalKind === ModalKind.Retire}
          onCancel={onCancel}
          onSubmit={onSubmitChangeState}
          inputRef={inputRef}
        />
      )}
      <ConfirmDeleteModal
        title={`Delete Localisation Revision - ${revisionName}`}
        targetText={revisionName}
        messages={[
          {
            message: Common.State_Related.Warning_Delete_Localisation_Revision,
            type: 'warning',
          },
          {
            message:
              Common.State_Related.Warning_Delete_Confirmation_Part_1 +
              revisionName +
              Common.State_Related.Warning_Delete_Confirmation_Part_2,
            type: 'warning',
          },
        ]}
        showModal={showModalKind === ModalKind.Delete}
        onCancel={onCancel}
        onSubmit={onSubmitDelete}
        inputRef={inputRef}
      />
      <Dropdown
        overlay={
          <Menu onClick={() => {}}>
            <Menu.Item key={ModalKind.All_Revision} icon={<UserOutlined />}>
              All Revisions
            </Menu.Item>
            <Menu.Divider />
            {specialOptions}
            <Menu.Item key={ModalKind.Copy} icon={<CopyOutlined />}>
              Copy
            </Menu.Item>
            <Menu.Item
              key={ModalKind.Delete}
              icon={<DeleteOutlined />}
              danger
              onClick={() => setShowModalKind(ModalKind.Delete)}
            >
              Delete
            </Menu.Item>
          </Menu>
        }
        placement="bottomRight"
        trigger={['click']}
      >
        <Button
          icon={<EllipsisOutlined />}
          style={{
            marginLeft: 8,
            top: -1,
          }}
        />
      </Dropdown>
    </>
  );
}

export { BurgerMenuButton };
