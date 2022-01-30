import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, Tabs } from 'antd';
import { Framework_Items } from '../../strings';
import { ClothesTabMenu } from './ClothesTabMenu';
import { AccessoriesTabMenu } from './AccessoriesTabMenu';
import { RouteStrings } from '../../routeStrings';

const { Content } = Layout;
const { TabPane } = Tabs;

function ItemCategoriesMenu() {
  const navigate = useNavigate();

  const onChange = (key: string) => {
    // console.log(key);
    if (key === Framework_Items.Types.Clothes) {
      navigate(RouteStrings.Items__Clothing, { replace: true });
    } else if (key === Framework_Items.Types.Accessories) {
      navigate(RouteStrings.Items__Accessories, { replace: true });
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
