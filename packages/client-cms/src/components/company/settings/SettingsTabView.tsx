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
import { RouteStrings } from '../../../routeStrings';
import { SettingsEntry } from '../../common/settings/SettingsEntry';
import { Delete_Item } from '../../../queries/items/deleteItem';
import { Get_Items_For_Items_Table_Latest } from '../../../queries/items/getItemsForItemsTableLatest';
import { companies } from '../../../utils/gql-interfaces/companies';
import { Delete_Company } from '../../../queries/companies/deleteCompany';
import { Get_Companies } from '../../../queries/companies/getCompanies';
import { Get_Companies_List_BB } from '../../../queries/companies/getCompaniesListBB';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

enum ModalKind {
  Delete_Item = 'Delete_Item',
  None = 'None',
}

const key = 'items-tab-settings';

interface SettingsTabViewProps {
  company: companies;
}

function SettingsTabView({ company }: SettingsTabViewProps) {
  // @ts-ignore
  const { id } = useParams();
  const itemId = id;

  // console.log("SETTINGS TAB > item:", item);
  console.log('SETTINGS TAB > company:', company);

  const navigate = useNavigate();

  const [showModalKind, setShowModalKind] = useState(ModalKind.None);

  const [
    deleteItem,
    { loading: loadingDeleteCompany, error: errorDeleteCompany },
  ] = useMutation(Delete_Company, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: Get_Companies_List_BB,
        variables: { limit: 20, offset: 0 },
      },
    ],
    onCompleted: () => {},
  });

  const onCancel = () => {
    setShowModalKind(ModalKind.None);
  };

  const onSubmitDelete = async () => {
    // console.log('delete item');
    message.loading({ content: Common.Deleting_Item, key }, 2);
    await deleteItem({
      variables: {
        id: parseInt(itemId ?? ''),
      },
    });
    navigate(RouteStrings.Companies);
    message.success({ content: Common.Deleted_Item, key }, 2);
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
        title={`Delete Item - ${company.name}`}
        targetText={company.name}
        messages={[
          {
            message: Common.State_Related.Warning_Delete_Localisation_Revision,
            type: 'warning',
          },
          {
            message:
              Common.State_Related.Warning_Delete_Confirmation_Part_1 +
              company.name +
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
          loading={loadingDeleteCompany}
        />
      </Content>
    </>
  );
}

export { SettingsTabView };
