import React from 'react';
import { DataState } from '@joshuarobs/clothing-framework';
import { red, orange, green, purple } from '@ant-design/colors';

interface LocaleStateDotProps {
  state: DataState;
  useTableCellStyling?: boolean;
  isError?: boolean;
}

function LocaleStateDot({
  state,
  useTableCellStyling,
  isError,
}: LocaleStateDotProps) {
  let backgroundColor = null;
  if (isError) {
    backgroundColor = red[3];
  } else {
    switch (state) {
      case DataState.Development:
        backgroundColor = orange[3];
        break;
      case DataState.Review:
        backgroundColor = purple[2];
        break;
      case DataState.Production:
        backgroundColor = green[3];
        break;
      case DataState.Retired:
        return <div />;
    }
  }
  if (useTableCellStyling) {
    return <span className={'dot2a'} style={{ backgroundColor }} />;
  }
  return <span className={'dot'} style={{ backgroundColor }} />;
}

export { LocaleStateDot };
