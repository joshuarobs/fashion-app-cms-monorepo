import React from 'react';
import { ColumnOfFrames } from '../components/common/frames/ColumnOfFrames';
import { DetailsFrame } from '../components/heuristic-item/DetailsFrame';
import { ClothingShellOverviewFrame } from '../components/common/frames/ClothingShellOverviewFrame/_ClothingShellOverviewFrame';
import { ClothingShellDetailsMoreFrame } from '../components/common/frames/ClothingShellDetailsMoreFrame';
import { HeaderFrame } from '../components/heuristic-item/HeaderFrame';
import { pageStyles } from './pageStyles';
import { HeuristicItemList } from '../draft-test-items';
import { useParams, useRouteMatch } from 'react-router-dom';
import { Footer } from '../components/app-shell/Footer';

function HeuristicItemPage() {
  console.log('this page');
  const { path, url } = useRouteMatch();
  // @ts-ignore
  const { id } = useParams();

  const item = HeuristicItemList.get(Number.parseInt(id, 10));
  console.log('item:', item);

  return (
    <>
      <HeaderFrame data={item} />
      {/* @ts-ignore */}
      <div style={pageStyles.content}>
        <ColumnOfFrames>
          {/*<GenericInformationFrame data={item} />*/}
          <DetailsFrame item={item} />
        </ColumnOfFrames>
        <ColumnOfFrames>
          <ClothingShellOverviewFrame
            currentClothingShellId={null}
            pageIsItem
            disabled
            heuristicItem={item}
          />
        </ColumnOfFrames>
        <ColumnOfFrames>
          <ClothingShellDetailsMoreFrame />
        </ColumnOfFrames>
      </div>
      <Footer />
    </>
  );
}

export { HeuristicItemPage };
