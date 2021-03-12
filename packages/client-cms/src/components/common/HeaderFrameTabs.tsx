import React from 'react';
import { NavLink } from 'react-router-dom';
import { HeaderTabLinkCountBadge } from './HeaderTabLinkCountBadge';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const IconStyle = {
  marginRight: 8,
  opacity: 0.5,
};

interface HeaderFrameTabsProps {
  currentTab: any;
  tabs: any[];
}

function HeaderFrameTabs({ currentTab, tabs }: HeaderFrameTabsProps) {
  return (
    <Tabs activeKey={currentTab}>
      {tabs.map((tab) => {
        return (
          <TabPane
            tab={
              <NavLink className="page-tab-link" to={tab.to}>
                {tab.icon}
                {tab.name}
                <HeaderTabLinkCountBadge count={tab.count} />
              </NavLink>
            }
            key={tab.key}
          />
        );
      })}
    </Tabs>
  );
}

export { HeaderFrameTabs };
