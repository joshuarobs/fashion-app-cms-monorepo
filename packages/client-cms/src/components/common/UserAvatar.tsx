import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

interface UserAvatarProps {
  userData: any;
  fontSize?: number;
  size?: any;
  /**
   * This overrides the default template style of this React element
   */
  overrideStyles?: any;
}

function UserAvatar({
  userData,
  fontSize = 14,
  size = 'default',
  overrideStyles = {},
  // Need to pass in props otherwise the antd dropdown won't work with this
  ...props
}: UserAvatarProps) {
  const userProfileLetter = userData && userData.name ? userData.name[0] : null;

  return (
    <Avatar
      {...props}
      size={size}
      style={{
        margin: 'auto',
        marginLeft: 0,
        marginRight: 0,
        fontSize,
        cursor: 'pointer',
        ...overrideStyles,
      }}
      icon={!userProfileLetter && <UserOutlined />}
    >
      {userProfileLetter}
    </Avatar>
  );
}

export { UserAvatar };
