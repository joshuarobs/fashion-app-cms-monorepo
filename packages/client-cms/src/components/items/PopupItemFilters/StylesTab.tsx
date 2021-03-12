/**
 * Figma reference:
 * Components/Filters Popup/Tab-Content/Occasions
 */
import React from 'react';
import { Checkbox, Typography } from 'antd';
import { ItemFilterValuesStyle } from '../../../framework/itemFilterValuesStyle';

const Styles = ItemFilterValuesStyle.Values;

const styles = {
  title: {
    marginTop: 12,
    marginBottom: 4,
  },
  checkbox: {
    paddingTop: 4,
    paddingBottom: 4,
  },
};

interface StylesTabProps {
  current: any;
  setCurrent: Function;
}

function StylesTab({ current, setCurrent }: StylesTabProps) {
  const onChange = (checkedValues: any) => {
    setCurrent(checkedValues);
  };

  return (
    <div>
      <Checkbox.Group
        style={{ width: '100%' }}
        value={current}
        onChange={onChange}
      >
        <Checkbox value={Styles.General.id} style={styles.checkbox}>
          {Styles.General.name}
        </Checkbox>
        <br />
        <Checkbox value={Styles.Streetwear.id} style={styles.checkbox}>
          {Styles.Streetwear.name}
        </Checkbox>
        <br />
        <Checkbox value={Styles.Techwear.id} style={styles.checkbox}>
          {Styles.Techwear.name}
        </Checkbox>
        <br />
        <Checkbox value={Styles.High_Fashion.id} style={styles.checkbox}>
          {Styles.High_Fashion.name}
        </Checkbox>
        <br />
        <Checkbox value={Styles.Preppy.id} style={styles.checkbox}>
          {Styles.Preppy.name}
        </Checkbox>
        <br />
        <Checkbox value={Styles.Minimalism.id} style={styles.checkbox}>
          {Styles.Minimalism.name}
        </Checkbox>
        <br />
        <Checkbox value={Styles.Sportswear.id} style={styles.checkbox}>
          {Styles.Sportswear.name}
        </Checkbox>
        <br />
        <Checkbox value={Styles.Hip_Hop.id} style={styles.checkbox}>
          {Styles.Hip_Hop.name}
        </Checkbox>
        <br />
        <Checkbox value={Styles.Punk.id} style={styles.checkbox}>
          {Styles.Punk.name}
        </Checkbox>
        <br />
        <Checkbox value={Styles.Goth.id} style={styles.checkbox}>
          {Styles.Goth.name}
        </Checkbox>
        <br />
        <Checkbox value={Styles.Emo.id} style={styles.checkbox}>
          {Styles.Emo.name}
        </Checkbox>
        <br />
      </Checkbox.Group>
    </div>
  );
}

export { StylesTab };
