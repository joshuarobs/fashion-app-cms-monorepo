/**
 * Figma reference:
 * Components/Items/Header Frame
 */

import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined, GlobalOutlined } from '@ant-design/icons';
import {
  Avatar,
  PageHeader,
  Tabs,
  Button,
  Statistic,
  Descriptions,
  message,
  Modal,
  Row,
  Typography,
  Input,
} from 'antd';
import { App_Shell, Common, Table_Descriptions } from '../../../strings';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { RouteStrings } from '../../../routeStrings';
import { NewEntryModal } from './NewEntryModal';
import { LocalesPageIcon } from '../../common/icons/page-icons/LocalesPageIcon';

const key = 'clothing-shells-header-frame';

function HeaderFrame() {
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState(null);

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

  const navigate = useNavigate();
  // Hooks for GraphQL queries
  const [newClothingShell, { loading: mutationLoading, error: mutationError }] =
    useMutation(NEW_CLOTHING_SHELL, {
      onCompleted({ insert_clothing_shells_one }) {
        console.log('insert_clothing_shells_one:', insert_clothing_shells_one);
        // setOriginalClothingShellId(clothing_shell_id);
        navigate(
          `${RouteStrings.Clothing_Shells__Clothing_Shell}/${insert_clothing_shells_one.id}`
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
      newClothingShell().then();
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
            <LocalesPageIcon />
            <span>{App_Shell.Sidebar.Pages.Localisations}</span>
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
        {Table_Descriptions.Locales}
      </PageHeader>
    </>
  );
}

export { HeaderFrame };
