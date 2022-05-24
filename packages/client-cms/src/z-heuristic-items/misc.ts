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

const MiscHeuristicItemList = new Map();

// ==================================================
// MISC
// ==================================================
// Down Jacket
MiscHeuristicItemList.set(
  100185,
  new HeuristicItem(
    null,
    'Down Jacket',
    ItemType.Clothing,
    ItemCategory.Outer_Wear__Jackets_And_Coats__Jackets__Down,
    55,
    880,
    false,
    Gender.All,
    new FabricLayer('black', FabricType.Taffeta, [
      new MaterialPercent(Material.Nylon, 100),
    ]),
    new FabricLayer('white', null, [new MaterialPercent(Material.Down, 100)]),
    new FabricLayer('black', FabricType.Taffeta, [
      new MaterialPercent(Material.Nylon, 100),
    ]),
    null,
    new ClothingSegmentsData(
      ClothingSegmentBounds.Arms_410_Top_Shoulder_Sleeve,
      ClothingSegmentBounds.Arms_470_Wrist,
      null,
      null,
      null,
      null,
      null,
      null,
      ClothingSegmentBounds.Body_30_Above_Upper_Chest,
      ClothingSegmentBounds.Body_170_Hips,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      true,
      true,
      true,
      true
    )
  )
);

// Short Shorts
MiscHeuristicItemList.set(
  100083,
  new HeuristicItem(
    null,
    'Short Shorts',
    ItemType.Clothing,
    ItemCategory.Mid_Wear__Shorts__Short_Shorts,
    8,
    342,
    false,
    Gender.Female,
    new FabricLayer('light-blue', FabricType.Denim, [
      new MaterialPercent(Material.Cotton, 100),
    ]),
    null,
    null,
    null,
    new ClothingSegmentsData(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      ClothingSegmentBounds.Body_140_Lower_Abdomen_33,
      ClothingSegmentBounds.Body_200_Upper_Thigh_55,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      true,
      true,
      true,
      true
    )
  )
);

// Apron
MiscHeuristicItemList.set(
  100269,
  new HeuristicItem(
    null,
    'Apron',
    ItemType.Clothing,
    12,
    1,
    400, // TODO: idk, figure it out
    false,
    Gender.All,
    null,
    null,
    null,
    null,
    new ClothingSegmentsData(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      ClothingSegmentBounds.Body_50_Above_Lower_Chest,
      ClothingSegmentBounds.Body_240_Knee,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      true,
      true,
      true,
      false
    )
  )
);

// Test Asymmetrical Shirt
MiscHeuristicItemList.set(
  200083,
  new HeuristicItem(
    null,
    'Test Asymmetrical Shirt',
    ItemType.Clothing,
    ItemCategory.Mid_Wear__Tops__Other,
    8,
    342,
    false,
    Gender.Female,
    null,
    null,
    null,
    null,
    new ClothingSegmentsData(
      ClothingSegmentBounds.Arms_410_Top_Shoulder_Sleeve,
      ClothingSegmentBounds.Arms_470_Wrist,
      null,
      null,
      null,
      null,
      null,
      null,
      ClothingSegmentBounds.Body_30_Above_Upper_Chest,
      ClothingSegmentBounds.Body_170_Hips,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      false,
      true,
      true,
      true
    )
  )
);

// Sleeveless Short Open Back Dress
// https://www.tobi.com/au/product/66331-tobi-90s-baby-open-back-dress?color_id=95575
MiscHeuristicItemList.set(
  200090,
  new HeuristicItem(
    null,
    'Sleeveless Short Open Back Dress',
    ItemType.Clothing,
    ItemCategory.Mid_Wear__Dresses__Other,
    16, // 23 - 7
    110, // 153 - ?
    false,
    Gender.Female,
    null,
    null,
    null,
    null,
    new ClothingSegmentsData(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      ClothingSegmentBounds.Body_30_Above_Upper_Chest,
      ClothingSegmentBounds.Body_220_Thigh_25,
      ClothingSegmentBounds.Body_120_Waist,
      ClothingSegmentBounds.Body_220_Thigh_25,
      null,
      null,
      null,
      null,
      null,
      null,
      false,
      true,
      true,
      false
    )
  )
);

export { MiscHeuristicItemList };
