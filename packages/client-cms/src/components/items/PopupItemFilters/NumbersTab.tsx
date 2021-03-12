/**
 * Figma reference:
 * Components/Filters Popup/Tab-Content/Num Of Resellers
 */
import React from 'react';
import { Checkbox, Typography, InputNumber, Radio } from 'antd';
import { ItemFilterValuesNumber } from '../../../framework/itemFilterValuesNumber';

const { Text } = Typography;

const styles = {
  radioStyle: {
    display: 'block',
    height: '32px',
    lineHeight: '32px',
    marginTop: '16px',
    marginBottom: '8px',
  },
  inputBox: {
    width: '80px',
  },
};

const Numbers = ItemFilterValuesNumber.Values;

const DEFAULT_MAX = 100;
const DEFAULT_STEP = 1;

interface NumbersTabProps {
  values: any;
  setValues: Function;
  formatter: any;
  parser: any;
  allowedTypes: any;
  max: number;
  step: number;
  styleInputBox: any;
}

function NumbersTab({
  values,
  setValues,
  formatter,
  parser,
  allowedTypes,
  max,
  step,
  styleInputBox,
}: NumbersTabProps) {
  const fixedMax = max && max > 0 ? max : DEFAULT_MAX;
  const fixedStep = step && step > 0 ? step : DEFAULT_STEP;
  const fixedStyleInputBox = styleInputBox ? styleInputBox : styles.inputBox;

  return (
    <Radio.Group
      onChange={(e) =>
        setValues({
          ...values,
          type: e.target.value,
        })
      }
      value={values.type}
      style={{ width: '100%' }}
    >
      {((allowedTypes && allowedTypes.indexOf(Numbers.Equal_To.id) !== -1) ||
        !allowedTypes) && (
        <>
          <Radio
            style={{
              ...styles.radioStyle,
              marginTop: 0,
            }}
            value={Numbers.Equal_To.id}
          >
            {Numbers.Equal_To.name}
          </Radio>
          <InputNumber
            min={0}
            max={fixedMax}
            step={fixedStep}
            style={fixedStyleInputBox}
            disabled={values.type !== Numbers.Equal_To.id}
            value={values.equalTo}
            formatter={formatter}
            parser={parser}
            onChange={(num) =>
              setValues({
                ...values,
                equalTo: num,
              })
            }
          />
        </>
      )}
      {((allowedTypes && allowedTypes.indexOf(Numbers.Range.id) !== -1) ||
        !allowedTypes) && (
        <>
          <Radio style={styles.radioStyle} value={Numbers.Range.id}>
            {Numbers.Range.name}
          </Radio>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                marginRight: '12px',
              }}
            >
              <Text type="secondary" strong>
                {Numbers.Min.name}
              </Text>
              <br />
              <InputNumber
                style={{ ...fixedStyleInputBox, marginRight: '0px' }}
                min={0}
                max={fixedMax}
                step={fixedStep}
                disabled={values.type !== Numbers.Range.id}
                value={values.rangeMin}
                formatter={formatter}
                parser={parser}
                onChange={(num) =>
                  setValues({
                    ...values,
                    rangeMin: num,
                  })
                }
              />
            </div>
            <div>
              <Text type="secondary" strong>
                {Numbers.Max.name}
              </Text>
              <br />
              <InputNumber
                style={{ ...fixedStyleInputBox, marginRight: '0px' }}
                min={0}
                max={fixedMax}
                step={fixedStep}
                disabled={values.type !== Numbers.Range.id}
                value={values.rangeMax}
                formatter={formatter}
                parser={parser}
                onChange={(num) =>
                  setValues({
                    ...values,
                    rangeMax: num,
                  })
                }
              />
            </div>
          </div>
        </>
      )}
      {((allowedTypes &&
        allowedTypes.indexOf(Numbers.Greater_Than_Or_Equal_To.id) !== -1) ||
        !allowedTypes) && (
        <>
          <Radio
            style={styles.radioStyle}
            value={Numbers.Greater_Than_Or_Equal_To.id}
          >
            {Numbers.Greater_Than_Or_Equal_To.name}
          </Radio>
          <InputNumber
            min={0}
            max={fixedMax}
            step={fixedStep}
            style={fixedStyleInputBox}
            disabled={values.type !== Numbers.Greater_Than_Or_Equal_To.id}
            value={values.greaterThanOrEqualTo}
            formatter={formatter}
            parser={parser}
            onChange={(num) =>
              setValues({
                ...values,
                greaterThanOrEqualTo: num,
              })
            }
          />
        </>
      )}
      {((allowedTypes &&
        allowedTypes.indexOf(Numbers.Lesser_Than_Or_Equal_To.id) !== -1) ||
        !allowedTypes) && (
        <>
          <Radio
            style={styles.radioStyle}
            value={Numbers.Lesser_Than_Or_Equal_To.id}
          >
            {Numbers.Lesser_Than_Or_Equal_To.name}
          </Radio>
          <InputNumber
            min={0}
            max={fixedMax}
            step={fixedStep}
            style={fixedStyleInputBox}
            disabled={values.type !== Numbers.Lesser_Than_Or_Equal_To.id}
            value={values.lesserThanOrEqualTo}
            formatter={formatter}
            parser={parser}
            onChange={(num) =>
              setValues({
                ...values,
                lesserThanOrEqualTo: num,
              })
            }
          />
        </>
      )}
    </Radio.Group>
  );
}

export { NumbersTab };
