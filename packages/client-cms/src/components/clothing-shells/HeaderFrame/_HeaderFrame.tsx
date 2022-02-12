/**
 * Figma reference:
 * Components/Items/Header Frame
 */
import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { PageHeader, Tabs, Button, message } from 'antd';
import { HeaderTabLinkCountBadge } from '../../common/HeaderTabLinkCountBadge';
import {
  App_Shell,
  Common,
  Popup_New_Entry,
  Table_Descriptions,
} from '../../../strings';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { RouteStrings } from '../../../routeStrings';
import { NewEntryModal } from './NewEntryModal';
import { ClothingShellsPageIcon } from '../../common/icons/page-icons/ClothingShellsPageIcon';
import { Insert_Clothing_Shell_Count } from '../../../queries/clothing_shell_counts/insertClothingShellCount';
import { NewEntryModalForItemRelatedEntry } from '../../items/HeaderFrame/NewEntryModalForItemRelatedEntry';
import { ItemType } from '@joshuarobs/clothing-framework';
import { Insert_New_Blank_Clothing_Segment_Data } from '../../../queries/clothing_segment_data/insertNewBlankClothingSegmentData';
import { Insert_Empty_Clothing_Shell } from '../../../queries/clothing_shells/insertEmptyClothingShell';
import { Insert_Clothing_Shell_Maindata_Revision } from '../../../queries/clothing_shell_maindata_revisions/insertClothingShellMaindataRevision';
import { Insert_Clothing_Shell_Maindata } from '../../../queries/clothing_shell_maindata/insertClothingShellMaindata';
import { Insert_Clothing_Shell } from '../../../queries/clothing_shells/insertClothingShell';
import { Insert_Item } from '../../../queries/items/insertItem';
import { Get_Items_For_Items_Table_Latest } from '../../../queries/items/getItemsForItemsTableLatest';
import { Get_Clothing_Shells_For_Clothing_Shells_Table_Latest } from '../../../queries/clothing_shells/getClothingShellsForClothingShellsTableLatest';

const { TabPane } = Tabs;

const key = 'clothing-shells-header-frame';

function HeaderFrame() {
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState(null);
  const [itemType, setItemType] = useState(ItemType.Clothing);

  const navigate = useNavigate();
  // Hooks for GraphQL queries
  const [newClothingShell, { loading: mutationLoading, error: mutationError }] =
    useMutation(Insert_Clothing_Shell, {
      onCompleted({ insert_clothing_shells_one }) {
        // console.log('insert_items_one:', insert_items_one);
        // const { id } = insert_items_one;
        // const variables = { id, revision: 1, state: DataState.Development };
        // 2. INSERT A REVISION
        // insertItemMaindataRevision({ variables }).then();
      },
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: Get_Clothing_Shells_For_Clothing_Shells_Table_Latest,
        },
      ],
    });
  //
  // const [
  //   insertClothingShellCount,
  //   {
  //     loading: loadingInsertClothingShellCount,
  //     error: errorInsertClothingShellCount,
  //   },
  // ] = useMutation(Insert_Clothing_Shell_Count, {
  //   onCompleted({}) {},
  // });
  //
  // const [
  //   insertClothingShellMaindataRevision,
  //   {
  //     loading: loadingInsertClothingShellMaindataRevision,
  //     error: errorInsertClothingShellMaindataRevision,
  //   },
  // ] = useMutation(Insert_Clothing_Shell_Maindata_Revision, {
  //   onCompleted({}) {},
  // });
  //
  // const [
  //   insertClothingShellMaindata,
  //   {
  //     loading: loadingInsertClothingShellMaindata,
  //     error: errorInsertClothingShellMaindata,
  //   },
  // ] = useMutation(Insert_Clothing_Shell_Maindata, {
  //   onCompleted({}) {},
  // });
  //
  // const [
  //   insertClothingSegmentData,
  //   {
  //     loading: loadingInsertClothingSegmentData,
  //     error: errorInsertClothingSegmentData,
  //   },
  // ] = useMutation(Insert_New_Blank_Clothing_Segment_Data, {
  //   onCompleted({ insert_clothing_segment_data_one }) {},
  // });
  //
  // const [newClothingShell, { loading: mutationLoading, error: mutationError }] =
  //   useMutation(Insert_Empty_Clothing_Shell, {
  //     async onCompleted({ insert_clothing_shells_one }) {
  //       console.log('insert_clothing_shells_one:', insert_clothing_shells_one);
  //       await insertClothingShellCount({
  //         variables: {
  //           clothingShellId: insert_clothing_shells_one.id,
  //         },
  //       });
  //       navigate(
  //         `${RouteStrings.Clothing_Shells__Clothing_Shell}/${insert_clothing_shells_one.id}`
  //       );
  //       message.success({ content: Common.Created_New_Clothing_Shell, key });
  //     },
  //   });

  // if (errorInsertClothingShellCount) {
  //   console.log(
  //     'errorInsertClothingShellCount:',
  //     errorInsertClothingShellCount
  //   );
  // }

  if (mutationError) {
    console.log('mutationError:', mutationError);
  }

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

  const onSubmit = async () => {
    // message.loading({ content: COMMON.CREATING_NEW_CLOTHING_SHELL, key });
    if (newName) {
      const clothingShell = await newClothingShell({
        variables: {
          name: newName,
          item_type: itemType,
        },
      });
      if (clothingShell.data.insertClothingShell) {
        console.error('clothingShell:', clothingShell);
        navigate(
          `${RouteStrings.Clothing_Shells__Clothing_Shell}/${clothingShell.data.insertClothingShell.id}?rev=1`
        );
        message.success({ content: Common.Created_New_Item, key }, 2);
      }
    }
  };

  const onCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <NewEntryModalForItemRelatedEntry
        itemName={'Clothing Shell'}
        showModal={showModal}
        onCancel={onCancel}
        onSubmit={onSubmit}
        inputRef={inputRef}
        name={newName}
        setName={setNewName}
        loading={mutationLoading}
        itemType={itemType}
        setItemType={setItemType}
        title={Popup_New_Entry.Add_New_Clothing_Shell}
      />
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
          backgroundColor: '#fff',
        }}
        title={
          <div>
            <ClothingShellsPageIcon />
            <span>{App_Shell.Sidebar.Pages.Clothing_Shells}</span>
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
        footer={
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span className="page-tab-link">
                  {/*<GlobalOutlined />*/}
                  Active
                  <HeaderTabLinkCountBadge count={12000} />
                </span>
              }
              key="1"
            />
            <TabPane
              tab={
                <span className="page-tab-link">
                  Waiting for Approval
                  <HeaderTabLinkCountBadge count={500} />
                </span>
              }
              key="2"
            />
            <TabPane
              tab={
                <span className="page-tab-link">
                  Rejected
                  <HeaderTabLinkCountBadge count={10} />
                </span>
              }
              key="3"
            />
            <TabPane
              tab={
                <span className="page-tab-link">
                  Inactive
                  <HeaderTabLinkCountBadge count={5} />
                </span>
              }
              key="4"
            />
          </Tabs>
        }
      >
        {Table_Descriptions.Clothing_Shells}
      </PageHeader>
    </>
  );
}

export { HeaderFrame };
