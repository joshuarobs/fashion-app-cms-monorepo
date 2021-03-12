import React from 'react';
import { Modal, Button, Layout, Row, Col, Avatar } from 'antd';
import { CompaniesTableView } from '../common/table-views/CompaniesTableView';
import { TableType } from '../common/table-views/TableType';
import { FrameTitle } from '../common/typography/FrameTitle';

const { Content } = Layout;

// Gets `ItemFilterCategories` and turns the object into an array
// const itemFilterCategories = objectToArray(ItemFilterCategories);

interface PopupSelectCompanyProps {
  item: any;
  itemMaindataRevision: any;
  visible: any;
  currentCompanyId: any;
  hideFiltersPopup: any;
  selectCompany: any;
}

function PopupSelectCompany({
  item,
  itemMaindataRevision,
  visible,
  currentCompanyId,
  hideFiltersPopup,
  selectCompany,
}: PopupSelectCompanyProps) {
  // const [currentTab, setCurrentTab] = useState(itemFilterCategories[0].id);
  // const [selectedFabricLayerTypes, setSelectedFabricLayerTypes] = useState([
  //   layerType
  // ]);
  // useEffect(() => {
  //   setSelectedFabricLayerTypes([layerType]);
  // }, [layerType]);
  console.log('PopupSelectCompany > item:', item);

  return (
    <Modal
      visible={visible}
      title={<span>Select Brand</span>}
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
              <FrameTitle
                text={itemMaindataRevision.item_maindata[0].name}
                noMargin
              />
            </Col>
            {currentCompanyId && (
              <Col
                span={8}
                style={{
                  textAlign: 'end',
                }}
              >
                <Button danger onClick={() => selectCompany(null)}>
                  Remove Brand
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
          <CompaniesTableView
            currentCompanyId={currentCompanyId}
            selectCompany={selectCompany}
            // hideFiltersPopup={hideFiltersPopup}
            type={TableType.Select_One}
          />
        </div>
      </Layout>
    </Modal>
  );
}

export { PopupSelectCompany };
