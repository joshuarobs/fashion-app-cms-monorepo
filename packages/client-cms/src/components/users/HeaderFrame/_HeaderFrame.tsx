/**
 * Figma reference:
 * Components/Items/Header Frame
 */

import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { PageHeader, Button, message } from 'antd';
import { App_Shell, Common, Table_Descriptions } from '../../../strings';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../../routes';
import { NewEntryModal } from './NewEntryModal';
import { UsersPageIcon } from '../../common/icons/page-icons/UsersPageIcon';

const key = 'users-header-frame';

function HeaderFrame() {
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState();

  const NEW_CLOTHING_SHELL = gql`
    mutation newClothingShell {
      insert_clothing_shells_one(object: {name: "${newName}"}) {
          id
          name
          created_at
          updated_at
      }
    }
  `;

  const history = useHistory();
  // Hooks for GraphQL queries
  const [
    newClothingShell,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(NEW_CLOTHING_SHELL, {
    onCompleted({ insert_clothing_shells_one }) {
      console.log('insert_clothing_shells_one:', insert_clothing_shells_one);
      // setOriginalClothingShellId(clothing_shell_id);
      history.push(
        `${Routes.Clothing_Shells__Clothing_Shell}/${insert_clothing_shells_one.id}`
      );
      message.success({ content: Common.Created_New_Clothing_Shell, key });
    },
  });

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      // @ts-ignore
      inputRef.current.focus();
    }
  }, [showModal]);

  const onClick = () => {
    setShowModal(true);
  };

  const onSubmit = () => {
    // message.loading({ content: COMMON.CREATING_NEW_CLOTHING_SHELL, key });
    if (newName) {
      newClothingShell();
    }
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
        name={newName}
        setName={setNewName}
        loading={mutationLoading}
      />
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
          backgroundColor: '#fff',
        }}
        title={
          <div>
            <UsersPageIcon />
            <span>{App_Shell.Sidebar.Pages.Users}</span>
          </div>
        }
        extra={[
          <Button
            key="1"
            type="primary"
            size="small"
            icon={<PlusOutlined />}
            onClick={onClick}
          >
            Add New
          </Button>,
        ]}
      >
        {Table_Descriptions.Users}
      </PageHeader>
    </>
  );
}

export { HeaderFrame };
