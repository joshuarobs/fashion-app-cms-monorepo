import React, { useEffect, useRef, useState } from 'react';
import { message } from 'antd';
import { Common, Popup_New_Entry } from '../../strings';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useNavigate, useLocation } from 'react-router-dom';
import qs from 'qs';
import { Get_Clothing_Shell_Maindata_Revision_By_Rev_And_Clothing_Shell_Id } from '../../queries/clothing_shell_maindata_revisions/getClothingShellMaindataRevisionByRevAndClothingShellId';
import {
  DataChangeType,
  DataState,
  ItemType,
} from '@joshuarobs/clothing-framework/build/enums';
import { NewEntryModalForItemRelatedEntry } from '../../components/items/HeaderFrame/NewEntryModalForItemRelatedEntry';
import { ErrorPleaseFixThis } from '../../components/common/localisation/ErrorPleaseFixThis';
import { OverviewMainFrame } from '../../components/clothing-shell/overview/OverviewMainFrame';
import { clothing_shell_maindata } from '../../utils/gql-interfaces/clothing_shell_maindata';
import { RouteStrings } from '../../routeStrings';
import { Insert_Clothing_Shell_Maindata_Revision_Change } from '../../queries/clothing_shell_maindata_revision_changes/insertClothingShellMaindataRevisionChange';
import { Insert_Clothing_Shell_Maindata_Barebones } from '../../queries/clothing_shell_maindata/insertClothingShellMaindataBarebones';
import { Insert_Clothing_Shell_Maindata_Revision } from '../../queries/clothing_shell_maindata_revisions/insertClothingShellMaindataRevision';

const key = 'unsaved-changes-overview';

interface OverviewTabProps {
  clothingShell: any;
  uniqueRevisions: any;
  refetchRevisions: Function;
  refetchClothingShellBaseData: Function;
}

function OverviewTab({
  clothingShell,
  uniqueRevisions,
  refetchRevisions,
  refetchClothingShellBaseData,
}: OverviewTabProps) {
  const location = useLocation();
  const navigate = useNavigate();
  // console.error("location:", location.pathname);

  const optionalParams = qs.parse(location.search, { ignoreQueryPrefix: true });
  const paramsRevision = optionalParams.rev ? optionalParams.rev : 1;
  const paramsIsRelease = optionalParams.release
    ? optionalParams.release
    : true;

  // States for fixing a broken database model of clothing shells
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
    loading: loadingClothingShellMaindata,
    error: errorClothingShellMaindata,
    data: dataClothingShellMaindata,
    refetch: refetchClothingShellMaindata,
  } = useQuery(
    Get_Clothing_Shell_Maindata_Revision_By_Rev_And_Clothing_Shell_Id,
    {
      variables: {
        clothingShellId: Number.parseInt(clothingShell.id),
        revision: Number.parseInt(String(paramsRevision)),
      },
    }
  );

  //--------------------------------------------------
  // Hooks for fixing errors
  //--------------------------------------------------
  const [
    insertClothingShellMaindataRevisionChange,
    { loading: loadingAddMaindataRevChange, error: errorAddMaindataRevChange },
  ] = useMutation(Insert_Clothing_Shell_Maindata_Revision_Change, {
    onCompleted() {},
  });

  const [
    insertClothingShellMaindataAfterRevision,
    { loading: loadingInsertMainClothing, error: errorInsertMainClothing },
  ] = useMutation(Insert_Clothing_Shell_Maindata_Barebones, {
    onCompleted({ insert_clothing_shell_maindata_one }) {
      console.log(
        'insert_clothing_shell_maindata_one:',
        insert_clothing_shell_maindata_one
      );
      const { revision_id } = insert_clothing_shell_maindata_one;
      const variables = {
        revisionId: revision_id,
        userId: 1,
        changeType: DataChangeType.Promotion,
        toState: DataState.Development,
      };
      insertClothingShellMaindataRevisionChange({ variables }).then(() => {
        const { revision } = insert_clothing_shell_maindata_one;
        const { item_id } = revision;
        navigate(`${RouteStrings.Items__Clothing__Item}/${item_id}?rev=1`, {
          replace: true,
        });
        message
          .success(
            { content: Common.Item_Related.Added_New_Maindata_Revision, key },
            2
          )
          .then();
        // history.go(0);
        navigate(0);
      });
    },
  });

  const [
    insertClothingShellMaindataRevision,
    { loading: loadingInsertMainRev, error: errorInsertMainRev },
  ] = useMutation(Insert_Clothing_Shell_Maindata_Revision, {
    onCompleted({ insert_clothing_shell_maindata_revisions_one }) {
      console.log(
        'insert_clothing_shell_maindata_revisions_one:',
        insert_clothing_shell_maindata_revisions_one
      );
      const { id } = insert_clothing_shell_maindata_revisions_one;
      const variables = {
        revisionId: id,
        isRelease: true,
        name: fixNewName,
        // type: fixItemType,
      };
      // 3. INSERT A MAINDATA FOR THAT REVISION
      // TODO: Insert first clothing segment data row
      insertClothingShellMaindataAfterRevision({ variables }).then();
    },
  });

  const [
    insertClothingShellMaindata,
    { loading: loadingInsertMaindata, error: errorInsertMaindata },
  ] = useMutation(Insert_Clothing_Shell_Maindata_Barebones, {
    onCompleted() {
      message
        .success(
          { content: Common.Item_Related.Added_New_Maindata_Revision, key },
          2
        )
        .then();
      // history.go(0);
      navigate(0);
    },
  });

  //--------------------------------------------------
  // LOADING + FATAL ERROR
  //--------------------------------------------------
  if (loadingClothingShellMaindata) return <div />;
  if (errorClothingShellMaindata)
    return (
      <div>Error! ${JSON.stringify(errorClothingShellMaindata, null, 2)}</div>
    );

  const { getClothingShellMaindataRevisionByRevAndClothingShellId } =
    dataClothingShellMaindata;
  const clothingShellMaindataRevision =
    getClothingShellMaindataRevisionByRevAndClothingShellId[0];
  console.log('clothingShellMaindataRevision:', clothingShellMaindataRevision);

  //--------------------------------------------------
  // ERROR - No maindata revision
  //--------------------------------------------------
  if (!clothingShellMaindataRevision) {
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
        insertClothingShellMaindataRevision({
          variables: {
            id: clothingShell.id,
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
          title={Popup_New_Entry.Add_Maindata_Revision}
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

  const clothing_shell_maindata: clothing_shell_maindata[] =
    clothingShellMaindataRevision.clothing_shell_maindata;
  console.log('clothing_shell_maindata:', clothing_shell_maindata);

  if (clothing_shell_maindata.length > 0) {
    return (
      <OverviewMainFrame
        clothingShell={clothingShell}
        paramsRevision={paramsRevision}
        paramsIsRelease={paramsIsRelease}
        uniqueRevisions={uniqueRevisions}
        clothingShellMaindataRevision={clothingShellMaindataRevision}
        revisionRelease={clothing_shell_maindata[0]}
        refetchRevisions={refetchRevisions}
        refetchBaseData={refetchClothingShellBaseData}
      />
    );
  } else {
    // If it reaches here, the entry is bugged and should be deleted from the
    // clothing shells list page
    return <div />;
  }
}

export { OverviewTab };
