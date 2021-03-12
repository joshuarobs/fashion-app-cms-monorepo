import React from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Menu, Tabs } from 'antd';
import { Framework_Items } from '../../strings';
import { ClothesTabMenu } from './ClothesTabMenu';
import { AccessoriesTabMenu } from './AccessoriesTabMenu';
import { Routes } from '../../routes';

const { Content } = Layout;
const { TabPane } = Tabs;

function ItemCategoriesMenu() {
  const history = useHistory();

  const onChange = (key: string) => {
    // console.log(key);
    if (key === Framework_Items.Types.Clothes) {
      history.replace(Routes.Items__Clothing);
    } else if (key === Framework_Items.Types.Accessories) {
      history.replace(Routes.Items__Accessories);
    }
  };

  return (
    <Content
      style={{
        background: '#fff',
        minHeight: 280,
        minWidth: 240,
        maxWidth: 240,
        // margin: "0px 12px 0px 12px"
      }}
    >
      <Tabs
        defaultActiveKey={Framework_Items.Types.Clothes}
        className="item-categories-tab"
        onChange={onChange}
      >
        <TabPane
          className="item-categories-tab"
          tab={<span>{Framework_Items.Types.Clothes}</span>}
          key={Framework_Items.Types.Clothes}
        >
          <ClothesTabMenu />
        </TabPane>
        <TabPane
          className="item-categories-tab"
          tab={<span>{Framework_Items.Types.Accessories}</span>}
          key={Framework_Items.Types.Accessories}
        >
          <AccessoriesTabMenu />
        </TabPane>
      </Tabs>
    </Content>
  );
}

export { ItemCategoriesMenu };
