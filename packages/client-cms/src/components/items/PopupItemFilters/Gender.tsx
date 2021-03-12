/**
 * Figma reference:
 * Components/Filters Popup/Tab-Content/Gender
 */
import React, { useState } from 'react';
import { Radio } from 'antd';
import { ItemFilterValuesGender } from '../../../framework/itemFilterValuesGender';

const radioStyle = {
  display: 'block',
  height: '32px',
  lineHeight: '32px',
};

const Values = Array.from(ItemFilterValuesGender.Map.values());

interface GenderProps {
  current: string;
  setCurrent: Function;
}

function Gender({ current, setCurrent }: GenderProps) {
  return (
    <Radio.Group onChange={(e) => setCurrent(e.target.value)} value={current}>
      {Values.map((value) => {
        return (
          <Radio style={radioStyle} value={value.id} key={value.id}>
            {value.name}
          </Radio>
        );
      })}
    </Radio.Group>
  );
}

export { Gender };
