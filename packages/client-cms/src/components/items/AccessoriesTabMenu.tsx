import React, { useState } from 'react';
import { CheckSquareOutlined, MailOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { AccessoriesCategory } from '../../framework/accessoriesCategory';

const { SubMenu } = Menu;

const OPENED_TABS = Object.freeze([
  AccessoriesCategory.Clothing_Like.id,
  AccessoriesCategory.Head.id,
  AccessoriesCategory.Wrists.id,
  AccessoriesCategory.Hands.id,
  AccessoriesCategory.Other.id,
]);

function AccessoriesTabMenu() {
  const [openedTabs, setOpenedTabs] = useState(OPENED_TABS);

  const onOpenChange = (openTabs: any) =>
    setOpenedTabs([...OPENED_TABS, ...openTabs]);

  return (
    <Menu
      defaultSelectedKeys={['all']}
      // @ts-ignore
      openKeys={openedTabs}
      onOpenChange={onOpenChange}
      mode="inline"
    >
      <Menu.Item key={AccessoriesCategory.All_Accessories.id}>
        <CheckSquareOutlined />
        {AccessoriesCategory.All_Accessories.name}
      </Menu.Item>
      <SubMenu
        key={AccessoriesCategory.Clothing_Like.id}
        title={
          <span>
            <MailOutlined />
            <span>{AccessoriesCategory.Clothing_Like.name}</span>
          </span>
        }
      >
        <SubMenu
          key={AccessoriesCategory.Head.id}
          title={
            <span>
              <span>{AccessoriesCategory.Head.name}</span>
            </span>
          }
        >
          <Menu.Item key={AccessoriesCategory.Hair_Accessories.id}>
            {AccessoriesCategory.Hair_Accessories.name}
          </Menu.Item>
          <Menu.Item key={AccessoriesCategory.Hats.id}>
            {AccessoriesCategory.Hats.name}
          </Menu.Item>
          <Menu.Item key={AccessoriesCategory.Headphones.id}>
            {AccessoriesCategory.Headphones.name}
          </Menu.Item>
          <Menu.Item key={AccessoriesCategory.Earrings.id}>
            {AccessoriesCategory.Earrings.name}
          </Menu.Item>
          <Menu.Item key={AccessoriesCategory.Head_Other.id}>
            {AccessoriesCategory.Head_Other.name}
          </Menu.Item>
          <Menu.Item key={AccessoriesCategory.Masks.id}>
            {AccessoriesCategory.Masks.name}
          </Menu.Item>
          <Menu.Item key={AccessoriesCategory.Eyewear.id}>
            {AccessoriesCategory.Eyewear.name}
          </Menu.Item>
          <Menu.Item key={AccessoriesCategory.Religious.id}>
            {AccessoriesCategory.Religious.name}
          </Menu.Item>
        </SubMenu>
        <Menu.Item key={AccessoriesCategory.Neck.id}>
          {AccessoriesCategory.Neck.name}
        </Menu.Item>
        <Menu.Item key={AccessoriesCategory.Torso.id}>
          {AccessoriesCategory.Torso.name}
        </Menu.Item>
        <Menu.Item key={AccessoriesCategory.Waist_And_Hip.id}>
          {AccessoriesCategory.Waist_And_Hip.name}
        </Menu.Item>
        <SubMenu
          key={AccessoriesCategory.Wrists.id}
          title={
            <span>
              <span>{AccessoriesCategory.Wrists.name}</span>
            </span>
          }
        >
          <Menu.Item key={AccessoriesCategory.Wrists__Watches.id}>
            {AccessoriesCategory.Wrists__Watches.name}
          </Menu.Item>
          <Menu.Item key={AccessoriesCategory.Wrists__Bracelets_And_Bands.id}>
            {AccessoriesCategory.Wrists__Bracelets_And_Bands.name}
          </Menu.Item>
          <Menu.Item key={AccessoriesCategory.Wrists__Cuff_Links.id}>
            {AccessoriesCategory.Wrists__Cuff_Links.name}
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key={AccessoriesCategory.Hands.id}
          title={
            <span>
              <span>{AccessoriesCategory.Hands.name}</span>
            </span>
          }
        >
          <Menu.Item key={AccessoriesCategory.Hands__Gloves.id}>
            {AccessoriesCategory.Hands__Gloves.name}
          </Menu.Item>
          <Menu.Item key={AccessoriesCategory.Hands__Rings.id}>
            {AccessoriesCategory.Hands__Rings.name}
          </Menu.Item>
        </SubMenu>
        <Menu.Item key={AccessoriesCategory.Feet.id}>
          {AccessoriesCategory.Feet.name}
        </Menu.Item>
      </SubMenu>
      <SubMenu
        key={AccessoriesCategory.Other.id}
        title={
          <span>
            <MailOutlined />
            <span>{AccessoriesCategory.Other.name}</span>
          </span>
        }
      >
        <Menu.Item key={AccessoriesCategory.Bags.id}>
          {AccessoriesCategory.Bags.name}
        </Menu.Item>
        <Menu.Item key={AccessoriesCategory.Items_In_Bag.id}>
          {AccessoriesCategory.Items_In_Bag.name}
        </Menu.Item>
        <Menu.Item key={AccessoriesCategory.Bring_Along.id}>
          {AccessoriesCategory.Bring_Along.name}
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}

export { AccessoriesTabMenu };
