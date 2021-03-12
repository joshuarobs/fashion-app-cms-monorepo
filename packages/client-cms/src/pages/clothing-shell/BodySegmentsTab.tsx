import React, { useState } from 'react';
import { ColumnOfFrames } from '../../components/common/frames/ColumnOfFrames';
import { BodySegmentsOverviewFrame } from '../../components/clothing-shell/BodySegmentsOverviewFrame';
import { ClothingShellOverviewFrame } from '../../components/common/frames/ClothingShellOverviewFrame/_ClothingShellOverviewFrame';

interface BodySegmentsProps {
  clothingShell: any;
}

function BodySegmentsTab({ clothingShell }: BodySegmentsProps) {
  // The clothing shell's name
  const [name, setName] = useState(
    clothingShell.name ? clothingShell.name : ''
  );

  // The clothing shell's thickness
  const [uniform_thickness, setUniformThickness] = useState(
    clothingShell.uniform_thickness ? clothingShell.uniform_thickness : null
  );

  // The clothing shell's default_shell_layer_id
  const [default_shell_layer_id, setDefaultShellLayerId] = useState(
    clothingShell.default_shell_layer_id
      ? clothingShell.default_shell_layer_id
      : null
  );

  // The clothing shell's default_fill_layer_id
  const [default_fill_layer_id, setDefaultFillLayerId] = useState(
    clothingShell.default_fill_layer_id
      ? clothingShell.default_fill_layer_id
      : null
  );

  // The clothing shell's default_lining_layer_id
  const [default_lining_layer_id, setDefaultLiningLayerId] = useState(
    clothingShell.default_lining_layer_id
      ? clothingShell.default_lining_layer_id
      : null
  );

  // The clothing shell's default_interlining_layer_id
  const [default_interlining_layer_id, setDefaultInterliningLayerId] = useState(
    clothingShell.default_interlining_layer_id
      ? clothingShell.default_interlining_layer_id
      : null
  );

  const hasChanged = {
    name: name !== clothingShell.name,
    uniform_thickness: uniform_thickness !== clothingShell.uniform_thickness,
    default_shell_layer_id:
      default_shell_layer_id !== clothingShell.default_shell_layer_id,
    default_fill_layer_id:
      default_fill_layer_id !== clothingShell.default_fill_layer_id,
    default_lining_layer_id:
      default_lining_layer_id !== clothingShell.default_lining_layer_id,
    default_interlining_layer_id:
      default_interlining_layer_id !==
      clothingShell.default_interlining_layer_id,
  };

  return (
    <>
      <ColumnOfFrames>
        <BodySegmentsOverviewFrame clothingShell={clothingShell} />
      </ColumnOfFrames>
      <ColumnOfFrames></ColumnOfFrames>
      <ColumnOfFrames>
        <ClothingShellOverviewFrame
          overrideClothingShell={clothingShell}
          default_shell_layer_id={default_shell_layer_id}
          default_lining_layer_id={default_lining_layer_id}
          hasChanged={hasChanged}
        />
      </ColumnOfFrames>
    </>
  );
}

export { BodySegmentsTab };
