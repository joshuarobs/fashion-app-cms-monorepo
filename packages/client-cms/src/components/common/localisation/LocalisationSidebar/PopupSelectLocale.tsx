import React, { MouseEventHandler } from 'react';
import {
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
import { LocalisationsTable } from './LocalisationsTable';

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;
const { Title } = Typography;

interface PopupSelectLocaleProps {
  visible: boolean;
  hidePopup: Function;
  locales: any;
  selectLocale: any;
}

function PopupSelectLocale({
  visible,
  hidePopup,
  locales,
  selectLocale,
}: PopupSelectLocaleProps) {
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
        <div
          style={{
            display: 'flex',
            padding: 24,
            // paddingTop: 24,
            // paddingBottom: 24,
            // paddingLeft: 12,
            // paddingRight: 12,
            overflowY: 'scroll',
            height: 550,
          }}
        >
          <Content
            style={{
              background: '#fff',
              padding: 16,
              height: 'fit-content',
            }}
          >
            <LocalisationsTable selectLocale={selectLocale} locales={locales} />
          </Content>
        </div>
      </Layout>
    </Modal>
  );
}

export { PopupSelectLocale };
