import {
  ClothingSegmentsData,
  ClothingSegmentBounds,
  FabricLayer,
  FabricType,
  HeuristicItem,
  getBodyCoveragePercent,
  MaterialPercent,
  ItemType,
  ItemCategory,
  Gender,
  Material,
} from '@joshuarobs/clothing-framework';
import {UnderwearLowerBodyHeuristicItemList} from './z-heuristic-items/underwearLowerBody';
import {UnderwearUpperBodyHeuristicItemList} from './z-heuristic-items/underwearUpperBody';
import { MiscHeuristicItemList } from './z-heuristic-items/misc';
import {
  MidwearUpperBodyHeuristicItemList
} from './z-heuristic-items/midwearUpperBody';

// FOR QUICKLY DEVELOPING THE SAME FILE FOR THE FRAMEWORK
// THIS SHOULD BE PUT EVENTUALLY BACK INTO THE FRAMEWORK
// JUST KEEP THIS FILE HERE, DEVELOP IT, AND COPY CHANGES TO FRAMEWORK REPO

const HeuristicItemList: Map<number, HeuristicItem> = new Map();

UnderwearLowerBodyHeuristicItemList.forEach((value, key) => {
  HeuristicItemList.set(key, value);
});

UnderwearUpperBodyHeuristicItemList.forEach((value, key) => {
  HeuristicItemList.set(key, value);
});

MidwearUpperBodyHeuristicItemList.forEach((value, key) => {
  HeuristicItemList.set(key, value);
});

MiscHeuristicItemList.forEach((value, key) => {
  HeuristicItemList.set(key, value);
});

HeuristicItemList.forEach((value, key) => {
  // Add ids to each heuristic item based on it's key, as we want to do this
  // automatically instead of manually writing it (prone to human error)
  // @ts-ignore
  HeuristicItemList.get(key).id = key;
  // While we're at it, might as well set the percent coverage of the item
  // @ts-ignore
  HeuristicItemList.get(key).percentCoverage = getBodyCoveragePercent(
    // @ts-ignore
    HeuristicItemList.get(key).base_clothing_segments
  );
});

// console.log('HEURISTIC_ITEMS:', HeuristicItem);

export { HeuristicItemList };
