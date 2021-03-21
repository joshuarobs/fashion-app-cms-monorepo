import React, { useEffect, useRef, useState } from 'react';
import {
  DataChangeType,
  DataState,
  ItemType,
} from '@joshuarobs/clothing-enums';
import { useMutation, useQuery } from '@apollo/client';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';
import { OverviewMainFrame } from '../../components/item/overview/OverviewMainFrame';
import { ErrorPleaseFixThis } from '../../components/common/localisation/ErrorPleaseFixThis';
import { Insert_Item_Maindata_Revision } from '../../queries/item_maindata_revisions/insertItemMaindataRevision';
import { NewEntryModalForItemRelatedEntry } from '../../components/items/HeaderFrame/NewEntryModalForItemRelatedEntry';
import { Insert_Item_Maindata_Barebones } from '../../queries/item_maindata/insertItemMaindataBarebones';
import { Routes } from '../../routes';
import { message } from 'antd';
import { Common } from '../../strings';
import { Insert_Item_Maindata_Revision_Change } from '../../queries/item_maindata_revision_changes/insertItemMaindataRevisionChange';
import { Get_Item_Maindata_Revision_By_Rev_And_Item_Id } from '../../queries/item_maindata_revisions/getItemMaindataRevisionByRevAndItemId';
import { item_maindata } from '../../utils/gql-interfaces/item_maindata';

const key = 'items-overview';

interface OverviewTabProps {
  item: any;
  uniqueRevisions: any;
  refetchRevisions: Function;
  refetchItemBaseData: Function;
}

function OverviewTab({
  item,
  uniqueRevisions,
  refetchRevisions,
  refetchItemBaseData,
}: OverviewTabProps) {
  const URL_NUMBER_OF_PARTS = 5;

  const location = useLocation();
  const history = useHistory();
  // console.error("location:", location.pathname);

  const optionalParams = qs.parse(location.search, { ignoreQueryPrefix: true });
  const paramsRevision = optionalParams.rev ? optionalParams.rev : 1;
  const paramsIsRelease = optionalParams.release
    ? optionalParams.release
    : true;
  // console.log("paramsRevision:", paramsRevision);

  const [fixShowModal, setFixShowModal] = useState(false);
  const [fixNewName, setFixNewName] = useState(null);
  const [fixItemType, setFixItemType] = useState(ItemType.Clothing);

  const inputRef: any = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [fixShowModal]);

  //============================================================
  // Hooks for GraphQL queries
  //============================================================
  //--------------------------------------------------
  // General hooks
  //--------------------------------------------------
  const {
    loading: loadingItemMaindata,
    error: errorItemMaindata,
    data: dataItemMaindata,
    refetch: refetchItemMaindata,
  } = useQuery(Get_Item_Maindata_Revision_By_Rev_And_Item_Id, {
    variables: { itemId: item.id, revision: paramsRevision },
  });

  //--------------------------------------------------
  // Hooks for fixing errors
  //--------------------------------------------------
  const [
    insertItemMaindataRevisionChange,
    { loading: loadingAddMaindataRevChange, error: errorAddMaindataRevChange },
  ] = useMutation(Insert_Item_Maindata_Revision_Change, {
    onCompleted() {},
  });

  const [
    insertItemMaindataAfterRevision,
    { loading: loadingInsertMainClothing, error: errorInsertMainClothing },
  ] = useMutation(Insert_Item_Maindata_Barebones, {
    onCompleted({ insert_item_maindata_one }) {
      console.log('insert_item_maindata_one:', insert_item_maindata_one);
      const { revision_id } = insert_item_maindata_one;
      const variables = {
        revisionId: revision_id,
        userId: 1,
        changeType: DataChangeType.Promotion,
        toState: DataState.Development,
      };
      insertItemMaindataRevisionChange({ variables }).then(() => {
        const { revision } = insert_item_maindata_one;
        const { item_id } = revision;
        history.replace(`${Routes.Items__Clothing__Item}/${item_id}?rev=1`);
        message
          .success(
            { content: Common.Item_Related.Added_New_Maindata_Revision, key },
            2
          )
          .then();
        history.go(0);
      });
    },
  });

  const [
    insertItemMaindataRevision,
    { loading: loadingInsertMainRev, error: errorInsertMainRev },
  ] = useMutation(Insert_Item_Maindata_Revision, {
    onCompleted({ insert_item_maindata_revisions_one }) {
      console.log(
        'insert_item_maindata_revisions_one:',
        insert_item_maindata_revisions_one
      );
      const { id } = insert_item_maindata_revisions_one;
      const variables = {
        revisionId: id,
        isRelease: true,
        name: fixNewName,
        type: fixItemType,
      };
      // 3. INSERT A MAINDATA FOR THAT REVISION
      insertItemMaindataAfterRevision({ variables }).then();
    },
  });

  const [
    insertItemMaindata,
    { loading: loadingInsertMaindata, error: errorInsertMaindata },
  ] = useMutation(Insert_Item_Maindata_Barebones, {
    onCompleted() {
      message
        .success(
          { content: Common.Item_Related.Added_New_Maindata_Revision, key },
          2
        )
        .then();
      history.go(0);
    },
  });

  //--------------------------------------------------
  // LOADING + FATAL ERROR
  //--------------------------------------------------
  if (loadingItemMaindata) return <div />;
  if (errorItemMaindata) return <div>Error! ${errorItemMaindata}</div>;

  const { item_maindata_revisions } = dataItemMaindata;
  const itemMaindataRevision = item_maindata_revisions[0];
  console.log('###itemMaindataRevision:', itemMaindataRevision);

  //--------------------------------------------------
  // ERROR - No maindata revision
  //--------------------------------------------------
  if (!itemMaindataRevision) {
    const onClick = () => {
      setFixShowModal(true);
    };

    const onSubmit = () => {
      if (fixNewName) {
        message
          .loading({
            content: Common.Item_Related.Adding_New_Maindata_Revision,
            key,
          })
          .then();
        insertItemMaindataRevision({
          variables: {
            id: item.id,
            revision: 1,
            state: DataState.Development,
          },
        }).then();
      }
    };

    const onCancel = () => {
      setFixShowModal(false);
    };

    return (
      <>
        <NewEntryModalForItemRelatedEntry
          title={'Add Maindata Revision'}
          showModal={fixShowModal}
          onCancel={onCancel}
          onSubmit={onSubmit}
          inputRef={inputRef}
          name={fixNewName}
          setName={setFixNewName}
          itemType={fixItemType}
          setItemType={setFixItemType}
          // loading={mutationLoading}
        />
        <ErrorPleaseFixThis
          message={'This Item does not have a Maindata Revision.'}
          buttonText={'Add Maindata Revision'}
          isDelete={false}
          onClick={onClick}
        />
      </>
    );
  }

  //--------------------------------------------------
  // ERROR - No maindata
  //--------------------------------------------------
  if (itemMaindataRevision.item_maindata.length === 0) {
    const onClick = () => {
      setFixShowModal(true);
    };

    const onSubmit = () => {
      if (fixNewName) {
        message
          .loading({
            content: Common.Item_Related.Adding_New_Maindata_Revision,
            key,
          })
          .then();
        const variables = {
          revisionId: itemMaindataRevision.id,
          isRelease: true,
          name: fixNewName,
          type: fixItemType,
        };
        // 3. INSERT A MAINDATA FOR THAT REVISION
        insertItemMaindata({ variables }).then();
      }
    };

    const onCancel = () => {
      setFixShowModal(false);
    };

    return (
      <>
        <NewEntryModalForItemRelatedEntry
          title={'Add Maindata'}
          showModal={fixShowModal}
          onCancel={onCancel}
          onSubmit={onSubmit}
          inputRef={inputRef}
          name={fixNewName}
          setName={setFixNewName}
          itemType={fixItemType}
          setItemType={setFixItemType}
          // loading={mutationLoading}
        />
        <ErrorPleaseFixThis
          message={'This Item does not have a Maindata.'}
          buttonText={'Add Maindata'}
          isDelete={false}
          onClick={onClick}
        />
      </>
    );
  }

  const item_maindata: item_maindata[] = itemMaindataRevision.item_maindata;
  // console.log("dataItemMaindata:", dataItemMaindata);
  // console.log("itemMaindataRevision:", itemMaindataRevision);
  console.log('Overview > item_maindata:', item_maindata);

  //--------------------------------------------------
  // WORKING - Intended return
  //--------------------------------------------------
  return (
    <OverviewMainFrame
      item={item}
      paramsRevision={paramsRevision}
      paramsIsRelease={paramsIsRelease}
      uniqueRevisions={uniqueRevisions}
      itemMaindataRevision={itemMaindataRevision}
      revisionDraft={item_maindata[1]}
      revisionRelease={item_maindata[0]}
      refetchRevisions={refetchRevisions}
      refetchItemBaseData={refetchItemBaseData}
    />
  );
}

export { OverviewTab };
