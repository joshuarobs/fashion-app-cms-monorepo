import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Layout,
  Row,
  Col,
  Button,
  Input,
  Switch,
  Typography,
  Divider,
  message,
} from 'antd';
import { Common } from '../../../strings';
import { DangerZonePageIcon } from '../../common/icons/page-icons/DangerZonePageIcon';
import { ConfirmDeleteModal } from '../../common/popups/ConfirmDeleteModal';
import { useLazyQuery, useMutation } from '@apollo/client';
// import DELETE_ITEM_TRANSLATION_REVISION from '../../../queries/item_translation_revisions/deleteItemTranslationRevision';
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
import { Delete_Item } from '../../../queries/items/deleteItem';
import { Get_Items_For_Items_Table_Latest } from '../../../queries/items/getItemsForItemsTableLatest';
// import ItemTypesTable from "./ItemTypesTable";
// import { APP_SHELL, TABLE_DESCRIPTIONS } from "../../strings";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

interface SettingsTabProps {
  headerData: any;
  dataProdItemMaindataRev: any;
}

enum ModalKind {
  Delete_Item = 'Delete_Item',
  None = 'None',
}

const key = 'items-tab-settings';

function SettingsTabView({
  headerData,
  dataProdItemMaindataRev,
}: SettingsTabProps) {
  // @ts-ignore
  const { id } = useParams();
  const itemId = id;

  // console.log("SETTINGS TAB > item:", item);
  console.log(
    'SETTINGS TAB > dataProdItemMaindataRev:',
    dataProdItemMaindataRev
  );

  const { item_maindata_revisions } = headerData;
  const hasMaindataRevision = item_maindata_revisions.length > 0;
  const hasMaindata =
    hasMaindataRevision && item_maindata_revisions[0].item_maindata.length > 0;
  console.log(
    'hasMaindataRevision:',
    hasMaindataRevision,
    '\nhasMaindata:',
    hasMaindata,
    '\nitem_maindata_revisions:',
    item_maindata_revisions
  );
  const itemName =
    hasMaindataRevision && hasMaindata
      ? item_maindata_revisions[0].item_maindata[0].name
      : 'null';
  const count_id =
    dataProdItemMaindataRev.getLatestProdItemMaindataRevByItemId[0] &&
    dataProdItemMaindataRev.getLatestProdItemMaindataRevByItemId[0]
      .item_maindata[0].brand &&
    dataProdItemMaindataRev.getLatestProdItemMaindataRevByItemId[0]
      .item_maindata[0].brand.counts
      ? dataProdItemMaindataRev.getLatestProdItemMaindataRevByItemId[0]
          .item_maindata[0].brand.counts.id
      : null;
  const brand_id = dataProdItemMaindataRev
    .getLatestProdItemMaindataRevByItemId[0]
    ? dataProdItemMaindataRev.getLatestProdItemMaindataRevByItemId[0]
        .item_maindata[0].brand_id
    : null;
  const clothing_shell_id = dataProdItemMaindataRev
    .getLatestProdItemMaindataRevByItemId[0]
    ? dataProdItemMaindataRev.getLatestProdItemMaindataRevByItemId[0]
        .item_maindata[0].clothing_shell_id
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

  const [deleteItem, { loading: loadingDeleteItem, error: errorDeleteItem }] =
    useMutation(Delete_Item, {
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: Get_Items_For_Items_Table_Latest,
        },
      ],
      onCompleted: () => {
        navigate(RouteStrings.Items__Clothing);
        message.success({ content: Common.Deleted_New_Item, key }, 2).then();
      },
    });

  const onCancel = () => {
    setShowModalKind(ModalKind.None);
  };

  const onSubmitDelete = async () => {
    // console.log('delete item');
    message.loading({ content: Common.Deleting_New_Item, key }, 2).then();
    await deleteItem({
      variables: {
        id: parseInt(itemId ?? ''),
      },
    });
    // deleteItemTranslations();
    // deleteItem().then(() => {
    //   setShowModalKind(ModalKind.None);
    // });
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
        title={`Delete Item - ${itemName}`}
        targetText={itemName}
        messages={[
          {
            message: Common.State_Related.Warning_Delete_Localisation_Revision,
            type: 'warning',
          },
          {
            message:
              Common.State_Related.Warning_Delete_Confirmation_Part_1 +
              itemName +
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
          loading={loadingDeleteItem}
        />
      </Content>
    </>
  );
}

export { SettingsTabView };
