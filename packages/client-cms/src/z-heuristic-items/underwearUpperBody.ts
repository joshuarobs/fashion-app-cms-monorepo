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

const UnderwearUpperBodyHeuristicItemList = new Map();

// ==================================================
// UNDERWEAR - UPPER BODY
// ==================================================
UnderwearUpperBodyHeuristicItemList.set(
  100002,
  new HeuristicItem(
    null,
    'Bra',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Tops__Bras,
    1,
    44,
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
      ClothingSegmentBounds.Body_50_Above_Lower_Chest,
      ClothingSegmentBounds.Body_80_Above_Upper_Abdomen,
      ClothingSegmentBounds.Body_70_Lower_Chest_85,
      ClothingSegmentBounds.Body_80_Above_Upper_Abdomen,
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

// Tricot-Nylon Half Slip
UnderwearUpperBodyHeuristicItemList.set(
  100004,
  new HeuristicItem(
    null,
    'Tricot-Nylon Half Slip',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Other__Slips__Half,
    14,
    65,
    false,
    Gender.Female,
    new FabricLayer('off-white', FabricType.Full_Tricot, [
      new MaterialPercent(Material.Nylon, 100),
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
      ClothingSegmentBounds.Body_50_Above_Lower_Chest,
      ClothingSegmentBounds.Body_220_Thigh_25,
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

// Full Slip, tricot-nylon
UnderwearUpperBodyHeuristicItemList.set(
  100005,
  new HeuristicItem(
    null,
    'Full Slip, tricot-nylon',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Other__Slips__Full,
    16,
    82,
    false,
    Gender.Female,
    new FabricLayer('off-white', FabricType.Full_Tricot, [
      new MaterialPercent(Material.Nylon, 100),
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
      ClothingSegmentBounds.Body_50_Above_Lower_Chest,
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

// Singlet, Cotton
UnderwearUpperBodyHeuristicItemList.set(
  100013,
  new HeuristicItem(
    null,
    'Singlet, cotton',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Tops__Undershirts__Sleeveless_Singlet,
    6,
    150,
    false,
    Gender.All,
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

// Singlet, cotton-polyester blend
UnderwearUpperBodyHeuristicItemList.set(
  100029,
  new HeuristicItem(
    null,
    'Singlet, cotton-polyester blend',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Tops__Undershirts__Sleeveless_Singlet,
    5,
    106,
    false,
    Gender.All,
    new FabricLayer('white', null, [
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

// T-Shirt, cotton
UnderwearUpperBodyHeuristicItemList.set(
  100030,
  new HeuristicItem(
    null,
    'T-Shirt, cotton',
    ItemType.Clothing,
    ItemCategory.Mid_Wear__Tops__Knit_Shirts__T_Shirt_Generic,
    8,
    105,
    false,
    Gender.All,
    new FabricLayer('white', FabricType.Single_Jersey, [
      new MaterialPercent(Material.Cotton, 100),
    ]),
    null,
    null,
    null,
    new ClothingSegmentsData(
      ClothingSegmentBounds.Arms_410_Top_Shoulder_Sleeve,
      ClothingSegmentBounds.Arms_430_Biceps_Triceps_15,
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

// T-Shirt, heavy cotton
UnderwearUpperBodyHeuristicItemList.set(
  100031,
  new HeuristicItem(
    null,
    'T-Shirt, heavy cotton',
    ItemType.Clothing,
    ItemCategory.Mid_Wear__Tops__Knit_Shirts__T_Shirt_Generic,
    10,
    180,
    false,
    Gender.All,
    new FabricLayer('white', FabricType.Single_Jersey, [
      new MaterialPercent(Material.Cotton, 100),
    ]),
    null,
    null,
    null,
    new ClothingSegmentsData(
      ClothingSegmentBounds.Arms_410_Top_Shoulder_Sleeve,
      ClothingSegmentBounds.Arms_430_Biceps_Triceps_15,
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

// Long Sleeve T-Shirt, cotton
UnderwearUpperBodyHeuristicItemList.set(
  100033,
  new HeuristicItem(
    null,
    'Long Sleeve T-Shirt, cotton',
    ItemType.Clothing,
    ItemCategory.Mid_Wear__Tops__Knit_Shirts__T_Shirt_Generic,
    12,
    200,
    false,
    Gender.All,
    new FabricLayer('grey', FabricType.Single_Jersey, [
      new MaterialPercent(Material.Cotton, 100),
    ]),
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
      true,
      true,
      true,
      true
    )
  )
);

// T-Shirt short sleeve, cotton-wool blend
UnderwearUpperBodyHeuristicItemList.set(
  100036,
  new HeuristicItem(
    null,
    'T-Shirt short sleeve, cotton-wool blend',
    ItemType.Clothing,
    ItemCategory.Mid_Wear__Tops__Knit_Shirts__T_Shirt_Generic,
    9,
    196,
    false,
    Gender.All,
    new FabricLayer('olive', FabricType.Single_Jersey, [
      new MaterialPercent(Material.Cotton, 50),
      new MaterialPercent(Material.Wool, 50),
    ]),
    null,
    null,
    null,
    new ClothingSegmentsData(
      ClothingSegmentBounds.Arms_410_Top_Shoulder_Sleeve,
      ClothingSegmentBounds.Arms_430_Biceps_Triceps_15,
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

// T-Shirt long sleeve, cotton-wool blend
UnderwearUpperBodyHeuristicItemList.set(
  100037,
  new HeuristicItem(
    null,
    'T-Shirt long sleeve, cotton-wool blend',
    ItemType.Clothing,
    ItemCategory.Mid_Wear__Tops__Knit_Shirts__T_Shirt_Generic,
    16,
    236,
    false,
    Gender.All,
    new FabricLayer('dark-grey', FabricType.Single_Jersey, [
      new MaterialPercent(Material.Cotton, 50),
      new MaterialPercent(Material.Wool, 50),
    ]),
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
      true,
      true,
      true,
      true
    )
  )
);

// Long-john T-shirt long sleeve
UnderwearUpperBodyHeuristicItemList.set(
  100041,
  new HeuristicItem(
    null,
    'Long-john T-shirt long sleeve',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Tops__Undershirts__Long_Sleeves,
    16,
    200,
    true,
    Gender.All,
    new FabricLayer('black', FabricType.Waffle_Knit, [
      new MaterialPercent(Material.Cotton, 50),
      new MaterialPercent(Material.Polyester, 50),
    ]),
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
      true,
      true,
      true,
      true
    )
  )
);

// Mid-neck T-shirt long sleeve
UnderwearUpperBodyHeuristicItemList.set(
  100042,
  new HeuristicItem(
    null,
    'Mid-neck T-shirt long sleeve',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Tops__Undershirts__Turtle_Neck,
    16,
    182,
    false,
    Gender.All,
    new FabricLayer('black', null, [
      new MaterialPercent(Material.Polypropylene, 100),
    ]),
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
      ClothingSegmentBounds.Body_20_Middle_Of_Neck,
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

// Thick T-shirt long sleeve, wool-blend
UnderwearUpperBodyHeuristicItemList.set(
  100055,
  new HeuristicItem(
    null,
    'Thick T-shirt long sleeve, wool-blend',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Tops__Undershirts__Long_Sleeves,
    25,
    360,
    false,
    Gender.All,
    new FabricLayer('black', FabricType.Waffle_Knit, [
      new MaterialPercent(Material.Cotton, 50),
      new MaterialPercent(Material.Polyester, 50),
    ]),
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
      true,
      true,
      true,
      true
    )
  )
);

export { UnderwearUpperBodyHeuristicItemList };
