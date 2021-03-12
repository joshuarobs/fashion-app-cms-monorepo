import React from 'react';
import { LocaleStateDot } from '../localisation/LocaleStateDot';
import { Select } from 'antd';

const { Option } = Select;

interface RevisionDropdownBoxProps {
  uniqueRevisions: any;
  handleChangeRevision: any;
  selectValue: any;
}

function RevisionDropdownBox({
  uniqueRevisions,
  handleChangeRevision,
  selectValue,
}: RevisionDropdownBoxProps) {
  let selectWidth = 120;
  if (uniqueRevisions.length >= 100) {
    selectWidth = 144;
  } else if (uniqueRevisions.length >= 10) {
    selectWidth = 132;
  }

  return (
    <Select
      style={{ width: selectWidth }}
      onChange={(value, option) => handleChangeRevision(value, option)}
      labelInValue
      // defaultValue={{ value: Number.parseInt(paramsRevision) }}
      // @ts-ignore
      value={{ value: selectValue }}
      disabled={uniqueRevisions.length === 1}
      className="not-bold"
    >
      {uniqueRevisions.map((uniqueRevision: any) => {
        const { revision, state } = uniqueRevision;
        // console.log("uniqueRevision:", uniqueRevision);
        return (
          <Option value={revision} key={revision}>
            Revision {revision}{' '}
            {uniqueRevisions.length > 1 && <LocaleStateDot state={state} />}
          </Option>
        );
      })}
    </Select>
  );
}

export { RevisionDropdownBox };
