import React from 'react';
import { MiniItemsFrame } from '../common/frames/MiniItemsFrame';
import { Get_Top_X_Unique_Items_For_Clothing_Shell_BB } from '../../queries/item_maindata_revisions/getTopXUniqueProdItemsForClothingShellBB';

interface MiniItemsFrameClothingShellProps {
  clothingShell: any;
}

function MiniItemsFrameClothingShell({
  clothingShell,
}: MiniItemsFrameClothingShellProps) {
  const counts = clothingShell.counts ? clothingShell.counts : {};
  return (
    <MiniItemsFrame
      id={clothingShell.id}
      count={counts.item_count}
      query={Get_Top_X_Unique_Items_For_Clothing_Shell_BB}
    />
  );
}

export { MiniItemsFrameClothingShell };
