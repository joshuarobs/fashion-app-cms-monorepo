import React from 'react';
import {
  Avatar,
  Modal,
  Button,
  Tag,
  Layout,
  Row,
  Col,
  Typography,
  Checkbox,
  Input,
} from 'antd';
import { enumToCamelCase } from '../../../utils/enumToCamelCase';
import { TableType } from '../../common/table-views/TableType';
import { FabricLayersTableView } from '../../common/table-views/FabricLayersTableView';
import { FrameTitle } from '../../common/typography/FrameTitle';

const { Content } = Layout;

// Gets `ItemFilterCategories` and turns the object into an array
// const itemFilterCategories = objectToArray(ItemFilterCategories);

interface PopupSelectFabricLayerProps {
  clothingShell: any;
  currentFabricLayerId: any;
  layerType: any;
  visible: boolean;
  hideFiltersPopup: any;
  selectFabricLayer: any;
}

function PopupSelectFabricLayer({
  clothingShell,
  currentFabricLayerId,
  layerType,
  visible,
  hideFiltersPopup,
  selectFabricLayer,
}: PopupSelectFabricLayerProps) {
  // const [currentTab, setCurrentTab] = useState(itemFilterCategories[0].id);
  // const [selectedFabricLayerTypes, setSelectedFabricLayerTypes] = useState([
  //   layerType
  // ]);
  // useEffect(() => {
  //   setSelectedFabricLayerTypes([layerType]);
  // }, [layerType]);

  return (
    <Modal
      visible={visible}
      title={<span>Select Fabric Layer - {enumToCamelCase(layerType)}</span>}
      onCancel={hideFiltersPopup}
      className="popup-filters"
      width={1100}
      footer={null}
      centered
    >
      <Layout>
        <Content
          style={{
            padding: 24,
            background: '#fff',
          }}
        >
          <Row>
            <Col
              span={16}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Avatar
                shape="square"
                style={{
                  marginRight: 8,
                }}
              />
              <FrameTitle text={clothingShell.name} noMargin />
            </Col>
            {currentFabricLayerId && (
              <Col
                span={8}
                style={{
                  textAlign: 'end',
                }}
              >
                <Button danger onClick={() => selectFabricLayer(null)}>
                  Remove Fabric Layer
                </Button>
              </Col>
            )}
          </Row>
        </Content>
        <div
          style={{
            display: 'flex',
            paddingTop: 24,
            paddingBottom: 24,
            paddingLeft: 12,
            paddingRight: 12,
            overflowY: 'scroll',
            height: 550,
          }}
        >
          <FabricLayersTableView
            layerType={layerType}
            currentFabricLayerId={currentFabricLayerId}
            selectFabricLayer={selectFabricLayer}
            // hideFiltersPopup={hideFiltersPopup}
            type={TableType.Select_One}
          />
        </div>
      </Layout>
    </Modal>
  );
}

export { PopupSelectFabricLayer };
