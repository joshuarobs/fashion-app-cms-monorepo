/**
 * Figma reference:
 * Components/Filters Popup/Tab-Content/Occasions
 */
import React from 'react';
import { Checkbox, Typography } from 'antd';
import { ItemFilterValuesOccasion } from '../../../framework/itemFilterValuesOccasion';

const { Text } = Typography;
const Occasions = ItemFilterValuesOccasion.Values;

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

interface OccasionsTabProps {
  current: any;
  setCurrent: Function;
}

function OccasionsTab({ current, setCurrent }: OccasionsTabProps) {
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
        <div style={{ ...styles.title, marginTop: 0 }}>
          <Text type="secondary" strong>
            Home
          </Text>
          <br />
        </div>
        <Checkbox value={Occasions.Home.id} style={styles.checkbox}>
          {Occasions.Home.name}
        </Checkbox>
        <br />
        <Checkbox value={Occasions.Home_Sleeping.id} style={styles.checkbox}>
          {Occasions.Home_Sleeping.name}
        </Checkbox>
        <br />
        <div style={styles.title}>
          <Text type="secondary" strong>
            Casual
          </Text>
          <br />
        </div>
        <Checkbox value={Occasions.Casual.id} style={styles.checkbox}>
          {Occasions.Casual.name}
        </Checkbox>
        <br />
        <Checkbox value={Occasions.Smart_Casual.id} style={styles.checkbox}>
          {Occasions.Smart_Casual.name}
        </Checkbox>
        <br />
        <div style={styles.title}>
          <Text type="secondary" strong>
            Activity
          </Text>
          <br />
        </div>
        <Checkbox value={Occasions.Workout.id} style={styles.checkbox}>
          {Occasions.Workout.name}
        </Checkbox>
        <br />
        <Checkbox value={Occasions.Hiking.id} style={styles.checkbox}>
          {Occasions.Hiking.name}
        </Checkbox>
        <br />
        <Checkbox value={Occasions.Sports.id} style={styles.checkbox}>
          {Occasions.Sports.name}
        </Checkbox>
        <br />
        <div style={styles.title}>
          <Text type="secondary" strong>
            Work
          </Text>
          <br />
        </div>
        <Checkbox value={Occasions.Uniform.id} style={styles.checkbox}>
          {Occasions.Uniform.name}
        </Checkbox>
        <br />
        <Checkbox value={Occasions.Business_Casual.id} style={styles.checkbox}>
          {Occasions.Business_Casual.name}
        </Checkbox>
        <br />
        <Checkbox value={Occasions.Business_Formal.id} style={styles.checkbox}>
          {Occasions.Business_Formal.name}
        </Checkbox>
        <br />
        <div style={styles.title}>
          <Text type="secondary" strong>
            Formal
          </Text>
          <br />
        </div>
        <Checkbox value={Occasions.Semi_Formal.id} style={styles.checkbox}>
          {Occasions.Semi_Formal.name}
        </Checkbox>
        <br />
        <Checkbox value={Occasions.Black_Tie.id} style={styles.checkbox}>
          {Occasions.Black_Tie.name}
        </Checkbox>
        <br />
        <Checkbox value={Occasions.White_Tie.id} style={styles.checkbox}>
          {Occasions.White_Tie.name}
        </Checkbox>
        <br />
      </Checkbox.Group>
    </div>
  );
}

export { OccasionsTab };
