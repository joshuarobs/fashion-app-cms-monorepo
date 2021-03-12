import React from 'react';
import { Switch } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

interface SwitchElementProps {
  checked: boolean;
  onChange: Function;
  disabled?: boolean;
  alignRight?: boolean;
}

/**
 * A consistent styled `Switch` element from Ant Design, used throughout the
 * app. Any page or element that needs to use a toggle switch, should use
 * this element.
 * @constructor
 */
function SwitchElement({
  checked,
  onChange,
  disabled,
  alignRight,
}: SwitchElementProps) {
  const style = {
    float: alignRight ? 'right' : 'none',
  };

  return (
    <Switch
      checkedChildren={<CheckOutlined style={{ pointerEvents: 'none' }} />}
      checked={checked}
      // @ts-ignore
      onChange={onChange}
      size="default"
      // @ts-ignore
      style={style}
      disabled={disabled}
    />
  );
}

export { SwitchElement };
