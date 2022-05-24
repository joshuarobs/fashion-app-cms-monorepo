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

const UnderwearLowerBodyHeuristicItemList = new Map();

// ==================================================
// UNDERWEAR - LOWER BODY
// ==================================================
// Panties
UnderwearLowerBodyHeuristicItemList.set(
  100001,
  new HeuristicItem(
    null,
    'Panties',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Lower_Torso__Panties,
    3,
    27,
    false,
    Gender.Female,
    new FabricLayer('white', null, [new MaterialPercent(Material.Cotton, 100)]),
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
      ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      // ClothingSegmentBounds.BODY_190_BELOW_GROIN,
      ClothingSegmentBounds.Body_170_Hips,
      ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      ClothingSegmentBounds.Body_210_Thigh_5,
      null,
      null,
      null,
      null,
      'FULL',
      null,
      true,
      true,
      true,
      false
    )
  )
);

// Pantyhose
UnderwearLowerBodyHeuristicItemList.set(
  100003,
  new HeuristicItem(
    null,
    'Pantyhose',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Pants__Pantyhose,
    2,
    39,
    false,
    Gender.Female,
    new FabricLayer('black', null, [new MaterialPercent(Material.Nylon, 100)]),
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
      ClothingSegmentBounds.Body_120_Waist,
      ClothingSegmentBounds.Body_270_Ankle,
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

// Y-front Briefs
UnderwearLowerBodyHeuristicItemList.set(
  100006,
  new HeuristicItem(
    null,
    'Y-front Briefs',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Lower_Torso__Briefs,
    4,
    67,
    false,
    Gender.Male,
    new FabricLayer('navy-blue', FabricType.Single_Jersey, [
      new MaterialPercent(Material.Wool, 100),
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
      ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      ClothingSegmentBounds.Body_170_Hips,
      ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      ClothingSegmentBounds.Body_210_Thigh_5,
      null,
      null,
      null,
      null,
      'FULL',
      null,
      true,
      true,
      true,
      false
    )
  )
);

// Boxer Briefs
UnderwearLowerBodyHeuristicItemList.set(
  100007,
  new HeuristicItem(
    null,
    'Boxer Briefs',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Pants__Short_Legged_1_4,
    5, // 4 > 5
    70,
    false,
    Gender.Male,
    new FabricLayer('navy-blue', FabricType.Single_Jersey, [
      new MaterialPercent(Material.Wool, 100),
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
      ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      ClothingSegmentBounds.Body_210_Thigh_5,
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

// Cotton Jersey Briefs
UnderwearLowerBodyHeuristicItemList.set(
  100008,
  new HeuristicItem(
    null,
    'Cotton Jersey Briefs',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Lower_Torso__Briefs,
    4,
    65,
    false,
    Gender.Male,
    new FabricLayer('black', FabricType.Single_Jersey, [
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
      ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      ClothingSegmentBounds.Body_190_Below_Groin,
      ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      ClothingSegmentBounds.Body_210_Thigh_5,
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

// Knee-length Under Pants
UnderwearLowerBodyHeuristicItemList.set(
  100009,
  new HeuristicItem(
    null,
    'Knee-length Underwear Pants',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Pants__Long_Legged_1_2,
    6,
    137,
    false,
    Gender.All,
    new FabricLayer('dark-grey', FabricType.Single_Jersey, [
      new MaterialPercent(Material.Wool, 100),
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
      ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      ClothingSegmentBounds.Body_230_Thigh_80,
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

// Wool Long John Underpants
UnderwearLowerBodyHeuristicItemList.set(
  100010,
  new HeuristicItem(
    null,
    'Wool Long John Underpants',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Pants__Long_Johns,
    12,
    198,
    false,
    Gender.All,
    new FabricLayer('light-grey', FabricType.Single_Jersey, [
      new MaterialPercent(Material.Wool, 100),
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
      ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      ClothingSegmentBounds.Body_270_Ankle,
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

// Y-front Cotton-blend Briefs
UnderwearLowerBodyHeuristicItemList.set(
  100020,
  new HeuristicItem(
    null,
    'Y-front Cotton-blend Briefs',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Lower_Torso__Briefs,
    3,
    66,
    false,
    Gender.Male,
    new FabricLayer('dark-grey', FabricType.Single_Jersey, [
      new MaterialPercent(Material.Cotton, 50),
      new MaterialPercent(Material.Polyester, 50),
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
      ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      ClothingSegmentBounds.Body_190_Below_Groin,
      ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      ClothingSegmentBounds.Body_210_Thigh_5,
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

// Cotton Long John Underpants
UnderwearLowerBodyHeuristicItemList.set(
  100022,
  new HeuristicItem(
    null,
    'Cotton Long John Underpants',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Pants__Long_Johns,
    8,
    162,
    false,
    Gender.All,
    new FabricLayer('light-grey', FabricType.Single_Jersey, [
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
      ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      ClothingSegmentBounds.Body_270_Ankle,
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

// 3/4 Long John Underpants
UnderwearLowerBodyHeuristicItemList.set(
  100025,
  new HeuristicItem(
    null,
    '3/4 Long John Underpants',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Pants__Long_Legged_3_4,
    8,
    186,
    false,
    Gender.All,
    new FabricLayer('grey', FabricType.Single_Jersey, [
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
      ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      ClothingSegmentBounds.Body_260_Calf_50,
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

// Long John Underpants
UnderwearLowerBodyHeuristicItemList.set(
  100026,
  new HeuristicItem(
    null,
    'Long John Underpants',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Pants__Long_Johns,
    10,
    193,
    false,
    Gender.All,
    new FabricLayer('grey', FabricType.Single_Jersey, [
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
      ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      ClothingSegmentBounds.Body_270_Ankle,
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

// Waffle-knit Long John Underpants
UnderwearLowerBodyHeuristicItemList.set(
  100027,
  new HeuristicItem(
    null,
    'Waffle-knit Long John Underpants',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Pants__Long_Johns,
    15,
    210,
    false,
    Gender.All,
    new FabricLayer('grey', FabricType.Waffle_Knit, [
      new MaterialPercent(Material.Cotton, 50),
      new MaterialPercent(Material.Polyester, 50),
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
      ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      ClothingSegmentBounds.Body_270_Ankle,
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

// Cotton-Wool Long John Underpants
UnderwearLowerBodyHeuristicItemList.set(
  100028,
  new HeuristicItem(
    null,
    'Cotton-Wool Long John Underpants',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Pants__Long_Johns,
    10,
    221,
    false,
    Gender.All,
    new FabricLayer('grey', null, [
      new MaterialPercent(Material.Cotton, 50),
      new MaterialPercent(Material.Wool, 50),
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
      ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      ClothingSegmentBounds.Body_270_Ankle,
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

// Polypropylene Long John Underpants
UnderwearLowerBodyHeuristicItemList.set(
  100043,
  new HeuristicItem(
    null,
    'Polypropylene Long John Underpants',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Pants__Long_Johns,
    13,
    165,
    false,
    Gender.All,
    new FabricLayer('black', null, [
      new MaterialPercent(Material.Polypropylene, 100),
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
      ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      ClothingSegmentBounds.Body_270_Ankle,
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

// Thick Wool-blend Long John Underpants
UnderwearLowerBodyHeuristicItemList.set(
  100046,
  new HeuristicItem(
    null,
    'Thick Wool-blend Long John Underpants',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Pants__Long_Johns,
    22,
    270,
    true,
    Gender.All,
    new FabricLayer('navy-blue', FabricType.Rib_1x1, [
      new MaterialPercent(Material.Wool, 50),
      new MaterialPercent(Material.Polyester, 50),
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
      ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      ClothingSegmentBounds.Body_270_Ankle,
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

// Lightweight Long John Underpants
UnderwearLowerBodyHeuristicItemList.set(
  100048,
  new HeuristicItem(
    null,
    'Lightweight Long John Underpants',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Pants__Long_Johns,
    7,
    155,
    false,
    Gender.All,
    new FabricLayer('light-grey', FabricType.Single_Jersey, [
      new MaterialPercent(Material.Cotton, 50),
      new MaterialPercent(Material.Modal, 50),
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
      ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      ClothingSegmentBounds.Body_270_Ankle,
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

export { UnderwearLowerBodyHeuristicItemList };
