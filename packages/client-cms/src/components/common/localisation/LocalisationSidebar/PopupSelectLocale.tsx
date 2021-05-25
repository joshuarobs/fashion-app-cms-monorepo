import React from 'react';
import { Modal, Layout } from 'antd';
import { LocalisationsTable } from './LocalisationsTable';
import { Common } from '../../../../strings';

const { Content } = Layout;

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
      title={
        <span>
          {Common.Localisation_Related.Add_Locale_Select_Clothing_Shell}
        </span>
      }
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
