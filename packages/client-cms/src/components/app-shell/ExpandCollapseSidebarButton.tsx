import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { SidebarProps } from './SidebarProps';

function ExpandCollapseSidebarButton({
  collapsed,
  setCollapsed,
}: SidebarProps) {
  const style = {
    padding: 16,
    paddingLeft: 24,
    fontSize: 20,
    // opacity: 0.65,
    cursor: 'pointer',
    color: '#fff',
    userSelect: 'none',
  };

  return collapsed ? (
    <MenuUnfoldOutlined
      // @ts-ignore
      style={style}
      onClick={() => setCollapsed(!collapsed)}
    />
  ) : (
    <MenuFoldOutlined
      // @ts-ignore
      style={style}
      onClick={() => setCollapsed(!collapsed)}
    />
  );
}

export { ExpandCollapseSidebarButton };
