import React, { useState } from 'react';
import { CheckSquareOutlined, MailOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { ClothingCategory } from '../../framework/clothingCategory';

const { SubMenu } = Menu;

const OPENED_TABS = Object.freeze([
  ClothingCategory.Inner_Wear.id,
  ClothingCategory.Inner_Wear__Tops.id,
  ClothingCategory.Inner_Wear__Lower_Torso.id,
  ClothingCategory.Mid_Wear.id,
  ClothingCategory.Mid_Wear__Tops.id,
  ClothingCategory.Outer_Wear.id,
  ClothingCategory.Outer_Wear__Jackets_And_Coats.id,
]);

function ClothesTabMenu() {
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
      <Menu.Item key={ClothingCategory.All_Clothes.id}>
        <CheckSquareOutlined />
        {ClothingCategory.All_Clothes.name}
      </Menu.Item>
      <SubMenu
        key={ClothingCategory.Inner_Wear.id}
        title={
          <span>
            <MailOutlined />
            <span>{ClothingCategory.Inner_Wear.name}</span>
          </span>
        }
      >
        <SubMenu
          key={ClothingCategory.Inner_Wear__Tops.id}
          title={
            <span>
              <span>{ClothingCategory.Inner_Wear__Tops.name}</span>
            </span>
          }
        >
          <Menu.Item key={ClothingCategory.Inner_Wear__Bras.id}>
            {ClothingCategory.Inner_Wear__Bras.name}
          </Menu.Item>
          <Menu.Item key={ClothingCategory.Inner_Wear__Undershirts.id}>
            {ClothingCategory.Inner_Wear__Undershirts.name}
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key={ClothingCategory.Inner_Wear__Lower_Torso.id}
          title={
            <span>
              <span>{ClothingCategory.Inner_Wear__Lower_Torso.name}</span>
            </span>
          }
        >
          <Menu.Item key={ClothingCategory.Inner_Wear__Briefs.id}>
            {ClothingCategory.Inner_Wear__Briefs.name}
          </Menu.Item>
          <Menu.Item key={ClothingCategory.Inner_Wear__Panties.id}>
            {ClothingCategory.Inner_Wear__Panties.name}
          </Menu.Item>
        </SubMenu>
        <Menu.Item key={ClothingCategory.Inner_Wear__Pants.id}>
          {ClothingCategory.Inner_Wear__Pants.name}
        </Menu.Item>
        <Menu.Item key={ClothingCategory.Inner_Wear__Socks.id}>
          {ClothingCategory.Inner_Wear__Socks.name}
        </Menu.Item>
        <Menu.Item key={ClothingCategory.Inner_Wear__Other.id}>
          {ClothingCategory.Inner_Wear__Other.name}
        </Menu.Item>
      </SubMenu>
      <SubMenu
        key={ClothingCategory.Mid_Wear.id}
        title={
          <span>
            <MailOutlined />
            <span>{ClothingCategory.Mid_Wear.name}</span>
          </span>
        }
      >
        <Menu.Item key={ClothingCategory.Mid_Wear__Dresses.id}>
          {ClothingCategory.Mid_Wear__Dresses.name}
        </Menu.Item>
        <SubMenu
          key={ClothingCategory.Mid_Wear__Tops.id}
          title={
            <span>
              <span>{ClothingCategory.Mid_Wear__Tops.name}</span>
            </span>
          }
        >
          <Menu.Item key={ClothingCategory.Mid_Wear__Blouses.id}>
            {ClothingCategory.Mid_Wear__Blouses.name}
          </Menu.Item>
          <Menu.Item key={ClothingCategory.Mid_Wear__Knitwear_And_Sweaters.id}>
            {ClothingCategory.Mid_Wear__Knitwear_And_Sweaters.name}
          </Menu.Item>
          <Menu.Item key={ClothingCategory.Mid_Wear__Shirts.id}>
            {ClothingCategory.Mid_Wear__Shirts.name}
          </Menu.Item>
          <Menu.Item key={ClothingCategory.Mid_Wear__Vests.id}>
            {ClothingCategory.Mid_Wear__Vests.name}
          </Menu.Item>
        </SubMenu>
        <Menu.Item key={ClothingCategory.Mid_Wear__Shorts.id}>
          {ClothingCategory.Mid_Wear__Shorts.name}
        </Menu.Item>
        <Menu.Item key={ClothingCategory.Mid_Wear__Skirts.id}>
          {ClothingCategory.Mid_Wear__Skirts.name}
        </Menu.Item>
        <Menu.Item key={ClothingCategory.Mid_Wear__Pants.id}>
          {ClothingCategory.Mid_Wear__Pants.name}
        </Menu.Item>
      </SubMenu>
      <SubMenu
        key={ClothingCategory.Outer_Wear.id}
        title={
          <span>
            <MailOutlined />
            <span>{ClothingCategory.Outer_Wear.name}</span>
          </span>
        }
      >
        <SubMenu
          key={ClothingCategory.Outer_Wear__Jackets_And_Coats.id}
          title={
            <span>
              <span>{ClothingCategory.Outer_Wear__Jackets_And_Coats.name}</span>
            </span>
          }
        >
          <Menu.Item
            key={
              ClothingCategory.Outer_Wear__Jackets_And_Coats__Coats__Generic.id
            }
          >
            {
              ClothingCategory.Outer_Wear__Jackets_And_Coats__Coats__Generic
                .name
            }
          </Menu.Item>
          <Menu.Item
            key={
              ClothingCategory.Outer_Wear__Jackets_And_Coats__Jackets__Generic
                .id
            }
          >
            {
              ClothingCategory.Outer_Wear__Jackets_And_Coats__Jackets__Generic
                .name
            }
          </Menu.Item>
          <Menu.Item
            key={ClothingCategory.Outer_Wear__Jackets_And_Coats__Other.id}
          >
            {ClothingCategory.Outer_Wear__Jackets_And_Coats__Other.name}
          </Menu.Item>
        </SubMenu>
        <Menu.Item key={ClothingCategory.Outer_Wear__Shoes.id}>
          {ClothingCategory.Outer_Wear__Shoes.name}
        </Menu.Item>
        <Menu.Item key={ClothingCategory.Outer_Wear__Other.id}>
          {ClothingCategory.Outer_Wear__Other.name}
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}

export { ClothesTabMenu };
