import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout, Row, Typography } from 'antd';
import { Common } from '../../../strings';
import { DangerZonePageIcon } from '../../common/icons/page-icons/DangerZonePageIcon';
import { ConfirmDeleteModal } from '../../common/popups/ConfirmDeleteModal';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Delete_Item_Translation_Revision_Changes_For_Item } from '../../../queries/item_translation_revision_changes/deleteItemTranslationRevisionChangesForItem';
import { Delete_Item_Translations_For_Items } from '../../../queries/item_translations/deleteItemTranslationsForItem';
import { Delete_Item_Translation_Revisions_For_Item } from '../../../queries/item_translation_revisions/deleteItemTranslationRevisionsForItem';
import { Delete_Item_Maindata_Revision_Changes_For_Item } from '../../../queries/item_maindata_revision_changes/deleteItemMaindataRevisionChangesForItem';
import { Delete_Item_Maindata_For_Item } from '../../../queries/item_maindata/deleteItemMaindataForItem';
import { Delete_Item_Maindata_Revisions_For_Item } from '../../../queries/item_maindata_revisions/deleteItemMaindataRevisionsForItem';
import { Delete_Item_By_Pk } from '../../../queries/items/deleteItemByPk';
import { RouteStrings } from '../../../routeStrings';
import { Get_Unique_Item_Maindata_Rev_Amount_For_Brand_Prod_Only } from '../../../queries/item_maindata_revisions/getUniqueItemMaindataRevisionsForBrandInProduction';
import { Update_Clothing_Shell_Count } from '../../../queries/clothing_shell_counts/updateClothingShellCount';
import { Get_Num_Of_Unique_Items_For_Clothing_Shell } from '../../../queries/item_maindata_revisions/getNumberOfUniqueItemsForClothingShell';
import { SettingsEntry } from '../../common/settings/SettingsEntry';
import { Update_Company_Count_Via_Company_Id } from '../../../queries/company_counts/updateCompanyCount';
// import ItemTypesTable from "./ItemTypesTable";
// import { APP_SHELL, TABLE_DESCRIPTIONS } from "../../strings";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

interface SettingsTabProps {
  headerData: any;
  dataProdClothingShellMaindataRev: any;
}

enum ModalKind {
  Delete_Item = 'Delete_Item',
  None = 'None',
}

function SettingsTabView({
  headerData,
  dataProdClothingShellMaindataRev,
}: SettingsTabProps) {
  console.log('headerData:', headerData);
  // @ts-ignore
  const { id } = useParams();
  const itemId = id;

  // console.log("SETTINGS TAB > item:", item);
  console.log(
    'SETTINGS TAB > dataProdClothingShellMaindataRev:',
    dataProdClothingShellMaindataRev
  );

  const { clothing_shell_maindata_revisions } = headerData;
  const hasMaindataRevision = clothing_shell_maindata_revisions.length > 0;
  const hasMaindata =
    hasMaindataRevision &&
    clothing_shell_maindata_revisions[0].clothing_shell_maindata.length > 0;
  console.log(
    'hasMaindataRevision:',
    hasMaindataRevision,
    '\nhasMaindata:',
    hasMaindata,
    '\nitem_maindata_revisions:',
    clothing_shell_maindata_revisions
  );
  const clothingShellName =
    hasMaindataRevision && hasMaindata
      ? clothing_shell_maindata_revisions[0].clothing_shell_maindata[0].name
      : 'null';
  const count_id =
    dataProdClothingShellMaindataRev
      .getAllClothingShellMaindataRevisionsForClothingShell[0] &&
    dataProdClothingShellMaindataRev
      .getAllClothingShellMaindataRevisionsForClothingShell[0]
      .clothing_shell_maindata[0].brand &&
    dataProdClothingShellMaindataRev
      .getAllClothingShellMaindataRevisionsForClothingShell[0]
      .clothing_shell_maindata[0].brand.counts
      ? dataProdClothingShellMaindataRev
          .getAllClothingShellMaindataRevisionsForClothingShell[0]
          .clothing_shell_maindata[0].brand.counts.id
      : null;
  const brand_id = dataProdClothingShellMaindataRev
    .getAllClothingShellMaindataRevisionsForClothingShell[0]
    ? dataProdClothingShellMaindataRev
        .getAllClothingShellMaindataRevisionsForClothingShell[0]
        .clothing_shell_maindata[0].brand_id
    : null;
  const clothing_shell_id = dataProdClothingShellMaindataRev
    .getAllClothingShellMaindataRevisionsForClothingShell[0]
    ? dataProdClothingShellMaindataRev
        .getAllClothingShellMaindataRevisionsForClothingShell[0]
        .clothing_shell_maindata[0].clothing_shell_id
    : null;

  console.log(
    'SETTINGS TAB > brand_id:',
    brand_id,
    '\ncount_id:',
    count_id,
    '\nclothing_shell_id:',
    clothing_shell_id
  );
  // console.log('item_maindata_revisions[0]:', item_maindata_revisions[0]);
  // console.log(
  //   'item_maindata_revisions[0].item_maindata[0]:',
  //   item_maindata_revisions[0].item_maindata[0]
  // );

  const navigate = useNavigate();

  const [showModalKind, setShowModalKind] = useState(ModalKind.None);

  const [
    deleteItemTranslationRevisionChangesForItem,
    {
      loading: loadingDeleteItemTransRevChangesForItem,
      // error: errorDeleteItemTransRevChangesForItem
    },
  ] = useMutation(Delete_Item_Translation_Revision_Changes_For_Item, {
    onCompleted() {},
  });

  const [
    deleteItemTranslationsForItem,
    {
      // loading: loadingDeleteItemTransForItem,
      // error: errorDeleteItemTransForItem
    },
  ] = useMutation(Delete_Item_Translations_For_Items, {
    onCompleted() {},
  });

  const [
    deleteItemTranslationRevisionsForItem,
    {
      // loading: loadingDeleteItemTransRevsForItem,
      // error: errorDeleteItemTransRevsForItem
    },
  ] = useMutation(Delete_Item_Translation_Revisions_For_Item, {
    onCompleted() {},
  });

  const [
    deleteItemMaindataRevisionChangesForItem,
    {
      // loading: loadingDeleteItemMaindataRevChangesForItem,
      // error: errorDeleteItemTransMaindataRevChangesForItem
    },
  ] = useMutation(Delete_Item_Maindata_Revision_Changes_For_Item, {
    onCompleted() {},
  });

  const [
    deleteItemMaindataForItem,
    {
      // loading: loadingDeleteItemMaindataForItem,
      // error: errorDeleteItemTransMaindataForItem
    },
  ] = useMutation(Delete_Item_Maindata_For_Item, {
    onCompleted() {},
  });

  const [
    deleteItemMaindataRevisionsForItem,
    {
      // loading: loadingDeleteItemMaindataRevisionsForItem,
      // error: errorDeleteItemTransMaindataRevisionsForItem
    },
  ] = useMutation(Delete_Item_Maindata_Revisions_For_Item, {
    onCompleted() {},
  });

  const [
    deleteItemByPk,
    // { loading: loadingDeleteItem, error: errorDeleteItem }
  ] = useMutation(Delete_Item_By_Pk, {
    onCompleted() {},
  });

  const [
    updateCompanyCountViaCompanyId,
    // { loading: loadingUpdCompanyItemCount, error: errorUpdCompanyItemCount }
  ] = useMutation(Update_Company_Count_Via_Company_Id, {
    onCompleted({ update_company_counts_by_pk }) {
      console.log('UPDATE COMPANY COUNT:', update_company_counts_by_pk);
    },
  });

  const [
    getProductionItemCountForCompany,
    // { loading: loadingGetItemCount, error: errorGetItemCount }
  ] = useLazyQuery(Get_Unique_Item_Maindata_Rev_Amount_For_Brand_Prod_Only, {
    // NOTE: We can't use async for `onCompleted` in a `useLazyQuery` as it
    // causes weird infinite page re-rendering bugs
    onCompleted({ item_maindata_revisions_aggregate }) {
      // console.log("getProductionItemCountForCompany > onCompleted()");
      if (brand_id && count_id) {
        // console.log("if brand id");
        // Get the count id, not the brand id
        updateCompanyCountViaCompanyId({
          variables: {
            id: count_id,
            changes: {
              item_count: item_maindata_revisions_aggregate.aggregate.count,
            },
          },
        }).then();
      }
      // message.success({ content: COMMON.UPDATED_ITEM_COUNT, key }, 2);
    },
    fetchPolicy: 'network-only',
  });

  const [updateClothingShellCount] = useMutation(Update_Clothing_Shell_Count, {
    onCompleted() {
      console.log('DONE updateClothingShellCount');
    },
  });

  const [getItemCountForClothingShell] = useLazyQuery(
    Get_Num_Of_Unique_Items_For_Clothing_Shell,
    {
      // NOTE: We can't use async for `onCompleted` in a `useLazyQuery` as it
      // causes weird infinite page re-rendering bugs
      onCompleted({ item_maindata_revisions_aggregate }) {
        // console.log(
        //   "item_maindata_revisions_aggregate:",
        //   item_maindata_revisions_aggregate
        // );
        const { clothing_shell } =
          dataProdClothingShellMaindataRev
            .getAllClothingShellMaindataRevisionsForClothingShell[0]
            .item_maindata[0];
        // console.log(
        //   "currentRevision.item_maindata[0]:",
        //   currentRevision.item_maindata[0]
        // );
        if (clothing_shell) {
          const { counts } = clothing_shell;
          // console.log("counts:", counts);
          if (counts) {
            updateClothingShellCount({
              variables: {
                id: counts.id,
                changes: {
                  item_count: item_maindata_revisions_aggregate.aggregate.count,
                },
              },
            }).then(() => {
              navigate(RouteStrings.Items__Clothing__Item);
              // history.go(0);
            });
          }
        } else {
          navigate(RouteStrings.Items__Clothing__Item);
          // history.go(0);
        }
        // message.success({ content: COMMON.UPDATED_ITEM_COUNT, key }, 2);
      },
      fetchPolicy: 'network-only',
    }
  );

  const deleteItem = async () => {
    // PART 1 - Delete translations
    // 1-A. Delete translations revision changes
    // await console.log("1");
    // await console.log("2");
    // await console.log("3");
    // await console.log("4");
    await deleteItemTranslationRevisionChangesForItem({
      variables: {
        id: itemId,
      },
    }).then();
    // 1-B. Delete translations
    await deleteItemTranslationsForItem({
      variables: {
        id: itemId,
      },
    }).then();
    // 1-C. Delete translations revisions
    await deleteItemTranslationRevisionsForItem({
      variables: {
        id: itemId,
      },
    });
    // PART 2 - Delete maindata
    // 2-A. Delete maindata revision changes
    await deleteItemMaindataRevisionChangesForItem({
      variables: {
        id: itemId,
      },
    });
    // 2-B. Delete maindata
    await deleteItemMaindataForItem({
      variables: {
        id: itemId,
      },
    });
    // 2-C. Delete maindata revisions
    await deleteItemMaindataRevisionsForItem({
      variables: {
        id: itemId,
      },
    });
    // 2-D. Update the company's unique item count
    // (Won't be possible) Go through all the revision's possible brands and
    // update their counts
    // Instead, look through and find the latest most production revision
    // and use that brand
    if (brand_id) {
      await getProductionItemCountForCompany({
        variables: {
          id: brand_id,
        },
      });
    }
    // 2-E. Update the clothing shell's unique item count
    if (
      dataProdClothingShellMaindataRev
        .getAllClothingShellMaindataRevisionsForClothingShell[0]
    ) {
      await getItemCountForClothingShell({
        variables: {
          id: dataProdClothingShellMaindataRev
            .clothing_shell_maindata_revisions[0].item_maindata[0]
            .clothing_shell_id,
        },
      });
    }
    // PART 3 - Delete settings
    // PART 4 - Delete item
    // TODO: We can put the code inside `getItemCountForClothingShell` but
    //  then we get callback hell with lots of duplicates of function calls,
    //  since if statements dont play nicely. For now, deleting an item will
    //  not update the clothing shell count, as we need to refactor this
    //  code for a server
    await deleteItemByPk({
      variables: {
        id: itemId,
      },
    });
    // These must go inside `getItemCountForClothingShell` because that has
    // 2 queries in one, whereby the second query relies on data from the first.
    await navigate(RouteStrings.Items__Clothing__Item);
    // await history.go(0);
  };

  const onCancel = () => {
    setShowModalKind(ModalKind.None);
  };

  const onSubmitDelete = () => {
    // deleteItemTranslations();
    deleteItem().then(() => {
      setShowModalKind(ModalKind.None);
    });
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      // @ts-ignore
      inputRef.current.focus();
    }
  }, [showModalKind]);

  return (
    <>
      <ConfirmDeleteModal
        title={`Delete Item - ${clothingShellName}`}
        targetText={clothingShellName}
        messages={[
          {
            message: Common.State_Related.Warning_Delete_Localisation_Revision,
            type: 'warning',
          },
          {
            message:
              Common.State_Related.Warning_Delete_Confirmation_Part_1 +
              clothingShellName +
              Common.State_Related.Warning_Delete_Confirmation_Part_2,
            type: 'warning',
          },
        ]}
        showModal={showModalKind === ModalKind.Delete_Item}
        onCancel={onCancel}
        onSubmit={onSubmitDelete}
        inputRef={inputRef}
      />
      <Content
        style={{
          padding: 24,
          background: '#fff',
          margin: '0px 12px 0px 12px',
        }}
      >
        <Row style={{ marginBottom: 16 }}>
          <DangerZonePageIcon />
          <Title level={4} style={{ paddingLeft: 8 }}>
            Danger Zone
          </Title>
        </Row>
        <SettingsEntry
          title={'Delete this item entry'}
          description={
            <Typography>
              <Paragraph>
                Once you delete a data entry, there is no going back. Please be
                certain.
              </Paragraph>
              <Paragraph>
                This action deletes this whole Item data entry including:
              </Paragraph>
              <Paragraph>
                <ul>
                  <li>Maindata</li>
                  <li>Translations</li>
                  <li>Change History activity</li>
                </ul>
              </Paragraph>
            </Typography>
          }
          onClick={() => setShowModalKind(ModalKind.Delete_Item)}
          loading={loadingDeleteItemTransRevChangesForItem}
        />
      </Content>
    </>
  );
}

export { SettingsTabView };
