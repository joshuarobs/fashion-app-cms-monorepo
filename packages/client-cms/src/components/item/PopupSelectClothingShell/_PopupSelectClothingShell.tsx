import React from 'react';
import { Modal, Button, Layout, Row, Col, Typography } from 'antd';
import { PrimaryFrame } from './PrimaryFrame';

const { Content } = Layout;
const { Title } = Typography;

// Gets `ItemFilterCategories` and turns the object into an array
// const itemFilterCategories = objectToArray(ItemFilterCategories);

interface PopupSelectClothingShellProps {
  item: any;
  currentClothingShellId?: number | null;
  visible: boolean;
  hidePopup: Function;
  selectClothingShell: Function;
}

function PopupSelectClothingShell({
  item,
  currentClothingShellId,
  visible,
  hidePopup,
  selectClothingShell,
}: PopupSelectClothingShellProps) {
  return (
    <Modal
      visible={visible}
      title={<span>Select Clothing Shell</span>}
      // @ts-ignore
      onCancel={hidePopup}
      className="popup-filters"
      width={1000}
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
            <Col span={16}>
              <Title level={4}>{item.name}</Title>
            </Col>
            {currentClothingShellId && (
              <Col
                span={8}
                style={{
                  textAlign: 'end',
                }}
              >
                <Button danger onClick={() => selectClothingShell(null)}>
                  Remove Clothing Shell
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
          <PrimaryFrame
            currentClothingShellId={currentClothingShellId}
            selectClothingShell={selectClothingShell}
          />
        </div>
      </Layout>
    </Modal>
  );
}

export { PopupSelectClothingShell };
