/**
 * Figma reference:
 * Components/Items/Header Frame
 */

import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { PageHeader, Tabs, Button, message } from 'antd';
import { HeaderTabLinkCountBadge } from '../../common/HeaderTabLinkCountBadge';
import { useMutation } from '@apollo/client';
import { Common } from '../../../strings';
import { Routes } from '../../../routes';
import { NewEntryModalForItemRelatedEntry } from './NewEntryModalForItemRelatedEntry';
import {
  ItemType,
  DataState,
  DataChangeType,
} from '@joshuarobs/clothing-framework/build/enums';
import { ItemsPageIcon } from '../../common/icons/page-icons/ItemsPageIcon';
import { Insert_Item_Maindata_Revision_Change } from '../../../queries/item_maindata_revision_changes/insertItemMaindataRevisionChange';
import { Insert_Item_Maindata_Revision } from '../../../queries/item_maindata_revisions/insertItemMaindataRevision';
import { Insert_Item_Maindata_Barebones } from '../../../queries/item_maindata/insertItemMaindataBarebones';
import { Insert_Item } from '../../../queries/items/insertItem';
import { Get_Items_For_Items_Table_Latest } from '../../../queries/items/getItemsForItemsTableLatest';

const { TabPane } = Tabs;

const key = 'items-header-frame';

function HeaderFrame({ title = '' }) {
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState(null);
  const [itemType, setItemType] = useState(ItemType.Clothing);

  const history = useHistory();
  // Hooks for GraphQL queries
  // const [
  //   insertItemMaindataRevisionChange,
  //   { loading: loadingAddMaindataRevChange, error: errorAddMaindataRevChange },
  // ] = useMutation(Insert_Item_Maindata_Revision_Change, {
  //   onCompleted() {},
  // });
  //
  // const [
  //   insertItemMaindata,
  //   { loading: loadingInsertMainClothing, error: errorInsertMainClothing },
  // ] = useMutation(Insert_Item_Maindata_Barebones, {
  //   onCompleted({ insert_item_maindata_one }) {
  //     console.log('insert_item_maindata_one:', insert_item_maindata_one);
  //     const { revision_id } = insert_item_maindata_one;
  //     const variables = {
  //       revisionId: revision_id,
  //       userId: 1,
  //       changeType: DataChangeType.Promotion,
  //       toState: DataState.Development,
  //       // action: DATA_ACTIONS.CREATE
  //     };
  //     insertItemMaindataRevisionChange({ variables }).then(() => {
  //       const { revision } = insert_item_maindata_one;
  //       const { item_id } = revision;
  //       history.push(`${Routes.Items__Clothing__Item}/${item_id}?rev=1`);
  //       message.success({ content: Common.Created_New_Item, key }, 2);
  //       // Redirect to the page
  //       // message.success(
  //       //     {
  //       //       content: COMMON.ADDED_NEW_LOCALE,
  //       //       key
  //       //     },
  //       //     2
  //       // );
  //     });
  //   },
  // });
  //
  // const [
  //   insertItemMaindataRevision,
  //   { loading: loadingInsertMainRev, error: errorInsertMainRev },
  // ] = useMutation(Insert_Item_Maindata_Revision, {
  //   onCompleted({ insert_item_maindata_revisions_one }) {
  //     console.log(
  //       'insert_item_maindata_revisions_one:',
  //       insert_item_maindata_revisions_one
  //     );
  //     const { id } = insert_item_maindata_revisions_one;
  //     const variables = {
  //       revisionId: id,
  //       isRelease: true,
  //       name: newName,
  //       type: itemType,
  //     };
  //     // 3. INSERT A MAINDATA FOR THAT REVISION
  //     insertItemMaindata({ variables }).then();
  //   },
  // });

  const [
    newItem,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(Insert_Item, {
    onCompleted({ insert_items_one }) {
      // console.log('insert_items_one:', insert_items_one);
      // const { id } = insert_items_one;
      // const variables = { id, revision: 1, state: DataState.Development };
      // 2. INSERT A REVISION
      // insertItemMaindataRevision({ variables }).then();
    },
    refetchQueries: [
      {
        query: Get_Items_For_Items_Table_Latest,
      },
    ],
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

  const onSubmit = async () => {
    // message.loading({ content: COMMON.CREATING_NEW_CLOTHING_SHELL, key });
    if (newName) {
      // newItem({
      //   variables: {
      //     itemType
      //   }
      // });
      const variables = {
        name: newName,
        item_type: itemType,
      };
      const item = await newItem({ variables });
      if (item.data.insertItem) {
        console.error('item:', item);
        history.push(
          `${Routes.Items__Clothing__Item}/${item.data.insertItem.id}?rev=1`
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
        title={'Add New Item'}
        showModal={showModal}
        onCancel={onCancel}
        onSubmit={onSubmit}
        inputRef={inputRef}
        name={newName}
        setName={setNewName}
        itemType={itemType}
        setItemType={setItemType}
        loading={mutationLoading}
        showTestingPurposeWarning
      />
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
          backgroundColor: '#fff',
        }}
        title={
          <div>
            <ItemsPageIcon />
            <span>{title}</span>
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
                  <HeaderTabLinkCountBadge count={100000} />
                </span>
              }
              key="1"
            />
            <TabPane
              tab={
                <span className="page-tab-link">
                  Development
                  <HeaderTabLinkCountBadge count={500} />
                </span>
              }
              key="2"
            />
            <TabPane
              tab={
                <span className="page-tab-link">
                  Review
                  <HeaderTabLinkCountBadge count={132} />
                </span>
              }
              key="3"
            />
            <TabPane
              tab={
                <span className="page-tab-link">
                  Production
                  <HeaderTabLinkCountBadge count={80} />
                </span>
              }
              key="4"
            />
            <TabPane
              tab={
                <span className="page-tab-link">
                  Inactive
                  <HeaderTabLinkCountBadge count={80} />
                </span>
              }
              key="5"
            />
            <TabPane
              tab={
                <span className="page-tab-link">
                  Error
                  <HeaderTabLinkCountBadge count={5} />
                </span>
              }
              key="6"
            />
          </Tabs>
        }
      />
    </>
  );
}

export { HeaderFrame };
