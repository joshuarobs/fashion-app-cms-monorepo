import React from 'react';
import { BreakdownsElement } from './BreakdownsElement';
import { useQuery } from '@apollo/client';
import { Get_Fabric_Layer } from '../../queries/getFabricLayer';
import { generateColourwayData } from '../../utils/generateColourwayData';
import { BreakdownsEmpty } from './BreakdownsEmpty';

interface BreakdownsColourwayProps {
  default_shell_layer_id: number | null;
  default_lining_layer_id: number | null;
  hasChanged: any;
  pageIsItem?: boolean;
}

function BreakdownsColourway({
  default_shell_layer_id,
  default_lining_layer_id,
  hasChanged,
  pageIsItem,
}: BreakdownsColourwayProps) {
  const title = 'Colourway';

  // console.error("hasChanged:", hasChanged);
  // console.log('default_shell_layer_id:', default_shell_layer_id);

  // Shell layer query
  const {
    loading: loadingShell,
    error: errorShell,
    data: dataShell,
  } = useQuery(Get_Fabric_Layer, {
    variables: { id: default_shell_layer_id },
    skip: !default_shell_layer_id,
  });

  // Lining layer query
  const {
    loading: loadingLining,
    error: errorLining,
    data: dataLining,
  } = useQuery(Get_Fabric_Layer, {
    variables: { id: default_lining_layer_id },
    skip: !default_lining_layer_id,
  });

  const loading = loadingShell || loadingLining;
  // const error = errorShell || errorLining;
  const dataLoaded = dataShell || dataLining;

  if (loading) return <div />;
  if (errorShell) return <div>Error (shell)! ${errorShell}</div>;
  if (errorLining) return <div>Error (lining)! ${errorLining}</div>;
  // console.log("data22:", data);

  const hasChangesMade =
    !pageIsItem && hasChanged ? hasChanged.default_shell_layer_id : false;

  if (!dataLoaded) {
    return <BreakdownsEmpty title={title} hasChangesMade={hasChangesMade} />;
  }

  const defaultShellLayer = dataShell ? dataShell.fabric_layers_by_pk : null;
  const defaultLiningLayer = dataLining ? dataLining.fabric_layers_by_pk : null;

  const shellData = generateColourwayData(defaultShellLayer);
  const liningData = generateColourwayData(defaultLiningLayer);
  // console.log('shellData:', shellData);
  // console.log("liningData:", liningData);
  const colourwayData = [];

  if (shellData.length > 0) {
    colourwayData.push({
      name: 'Shell',
      data: shellData,
    });
  }

  if (liningData.length > 0) {
    colourwayData.push({
      name: 'Lining',
      data: liningData,
    });
  }

  return (
    <BreakdownsElement
      title={title}
      data={colourwayData}
      hasChangesMade={hasChangesMade}
    />
  );
}

export { BreakdownsColourway };
