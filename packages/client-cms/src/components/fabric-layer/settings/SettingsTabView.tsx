import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout, message, Row, Typography } from 'antd';
import { Common } from '../../../strings';
import { DangerZonePageIcon } from '../../common/icons/page-icons/DangerZonePageIcon';
import { ConfirmDeleteModal } from '../../common/popups/ConfirmDeleteModal';
import { useMutation } from '@apollo/client';
import { RouteStrings } from '../../../routeStrings';
import { SettingsEntry } from '../../common/settings/SettingsEntry';
import { Get_Clothing_Shells_For_Clothing_Shells_Table_Latest } from '../../../queries/clothing_shells/getClothingShellsForClothingShellsTableLatest';
import { Delete_Clothing_Shell } from '../../../queries/clothing_shells/deleteClothingShell';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

interface SettingsTabProps {
  headerData: any;
  dataProdClothingShellMaindataRev: any;
}

enum ModalKind {
  Delete_Item = 'Delete_Item',
  None = 'None',
}

const key = 'clothing-shell-tab-settings';

function SettingsTabView({
  headerData,
  dataProdClothingShellMaindataRev,
}: SettingsTabProps) {
  console.log('headerData:', headerData);
  // @ts-ignore
  const { id } = useParams();
  const clothingShellId = id;

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

  const clothingShellName =
    hasMaindataRevision && hasMaindata
      ? clothing_shell_maindata_revisions[0].clothing_shell_maindata[0].name
      : 'null';

  const navigate = useNavigate();

  const [showModalKind, setShowModalKind] = useState(ModalKind.None);

  const [
    deleteClothingShell,
    { loading: loadingDeleteClothingShell, error: errorDeleteClothingShell },
  ] = useMutation(Delete_Clothing_Shell, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: Get_Clothing_Shells_For_Clothing_Shells_Table_Latest,
      },
    ],
    onCompleted: () => {
      navigate(RouteStrings.Clothing_Shells);
      message
        .success({ content: Common.Deleted_Clothing_Shell, key }, 2)
        .then();
    },
  });

  const onCancel = () => {
    setShowModalKind(ModalKind.None);
  };

  const onSubmitDelete = async () => {
    await deleteClothingShell({
      variables: {
        id: parseInt(clothingShellId ?? ''),
      },
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
          loading={loadingDeleteClothingShell}
        />
      </Content>
    </>
  );
}

export { SettingsTabView };
