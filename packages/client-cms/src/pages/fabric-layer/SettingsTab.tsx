import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { FabricLayerType } from '@joshuarobs/clothing-framework';
import { RouteStrings } from '../../routeStrings';
import { Layout, message, Row, Typography } from 'antd';
import { Common } from '../../strings';
import { ConfirmDeleteModal } from '../../components/common/popups/ConfirmDeleteModal';
import { DangerZonePageIcon } from '../../components/common/icons/page-icons/DangerZonePageIcon';
import { SettingsEntry } from '../../components/common/settings/SettingsEntry';
import { Delete_Fabric_Layer_And_Its_Colour_Mix_Parts } from '../../queries/fabric_layers/deleteFabricLayerAndItsColourMixParts';
import { Get_Fabric_Layers_List_BB } from '../../queries/fabric_layers/getFabricLayersListBB';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

interface SettingsProps {
  headerData: any;
}

enum ModalKind {
  Delete_Item = 'Delete_Item',
  None = 'None',
}

const key = 'clothing-shell-tab-settings';

function FabricLayerSettingsTab({ headerData }: SettingsProps) {
  // @ts-ignore
  const { id } = useParams();

  const navigate = useNavigate();

  const [showModalKind, setShowModalKind] = useState(ModalKind.None);

  const [
    deleteFabricLayer,
    { loading: loadingDeleteFabricLayer, error: errorDeleteFabricLayer },
  ] = useMutation(Delete_Fabric_Layer_And_Its_Colour_Mix_Parts, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: Get_Fabric_Layers_List_BB,
        variables: {
          fabricLayerTypes: [
            FabricLayerType.Shell,
            FabricLayerType.Fill,
            FabricLayerType.Interlining,
            FabricLayerType.Lining,
          ],
          limit: 20,
          offset: 0,
        },
      },
    ],
    onCompleted: () => {
      navigate(RouteStrings.Fabric_Layers);
      message.success({ content: Common.Deleted_Fabric_Layer, key }, 2).then();
    },
  });

  const onCancel = () => {
    setShowModalKind(ModalKind.None);
  };

  const onSubmitDelete = async () => {
    await deleteFabricLayer({
      variables: {
        id: parseInt(id ?? ''),
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
        title={`Delete Fabric Layer - id: ${id}`}
        targetText={id ? id.toString() : ''}
        messages={[
          {
            message: Common.State_Related.Warning_Delete_Fabric_Layer,
            type: 'warning',
          },
          {
            message:
              Common.State_Related.Warning_Delete_Confirmation_Part_1 +
              id +
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
          title={'Delete this Fabric Layer entry'}
          description={
            <Typography>
              <Paragraph>
                Once you delete a data entry, there is no going back. Please be
                certain.
              </Paragraph>
              <Paragraph>
                This action deletes this whole Fabric Layer data entry
                including:
              </Paragraph>
              <Paragraph>
                <ul>
                  <li>Fabric Layer and Colour Mix Part relationships</li>
                  <li>Change History activity</li>
                </ul>
              </Paragraph>
            </Typography>
          }
          onClick={() => setShowModalKind(ModalKind.Delete_Item)}
          loading={loadingDeleteFabricLayer}
        />
      </Content>
    </>
  );
}

export { FabricLayerSettingsTab };
