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

const MidwearUpperBodyHeuristicItemList = new Map();

// ==================================================
// MID-WEAR - UPPER BODY
// ==================================================
// Long Sleeve Shirt, cotton
MidwearUpperBodyHeuristicItemList.set(
  100054,
  new HeuristicItem(
    null,
    'Long Sleeve Shirt, cotton',
    ItemType.Clothing,
    ItemCategory.Mid_Wear__Tops__Shirts__Shirt_Generic,
    33,
    362,
    false,
    Gender.All,
    new FabricLayer('white', FabricType.Twill, [
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

// Short Sleeve Shirt, cotton
MidwearUpperBodyHeuristicItemList.set(
  100056,
  new HeuristicItem(
    null,
    'Short Sleeve Shirt, cotton',
    ItemType.Clothing,
    ItemCategory.Mid_Wear__Tops__Shirts__Shirt_Generic,
    24,
    284,
    false,
    Gender.All,
    new FabricLayer('light-blue', FabricType.Twill, [
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

// Sleeveless Tank Top, cotton twill
MidwearUpperBodyHeuristicItemList.set(
  100058,
  new HeuristicItem(
    null,
    'Sleeveless Tank Top, cotton twill',
    ItemType.Clothing,
    ItemCategory.Mid_Wear__Tops__Knit_Shirts__Sleeveless_T_Shirt,
    18,
    210,
    false,
    Gender.All,
    new FabricLayer('white', FabricType.Twill, [
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

// Long Sleeve Blouse
MidwearUpperBodyHeuristicItemList.set(
  100061,
  new HeuristicItem(
    null,
    'Long Sleeve Blouse',
    ItemType.Clothing,
    ItemCategory.Mid_Wear__Tops__Blouses__Blouse_Generic,
    33,
    382,
    false,
    Gender.Female,
    new FabricLayer('burgundy', FabricType.Twill, [
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

// Boat Neck Blouse, 3/4 Sleeves
MidwearUpperBodyHeuristicItemList.set(
  100066,
  new HeuristicItem(
    null,
    'Boat Neck Blouse, 3/4 Sleeves',
    ItemType.Clothing,
    ItemCategory.Mid_Wear__Tops__Shirts__Shirt_Generic,
    27,
    142,
    false,
    Gender.All,
    new FabricLayer('green', FabricType.Broadcloth, [
      new MaterialPercent(Material.Cotton, 100),
    ]),
    null,
    null,
    null,
    new ClothingSegmentsData(
      ClothingSegmentBounds.Arms_410_Top_Shoulder_Sleeve,
      ClothingSegmentBounds.Arms_450_Forearm_50,
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

// Cap Sleeve Shirt, Boat Neck
MidwearUpperBodyHeuristicItemList.set(
  100067,
  new HeuristicItem(
    null,
    'Cap Sleeve Shirt, Boat Neck',
    ItemType.Clothing,
    ItemCategory.Mid_Wear__Tops__Shirts__Shirt_Generic,
    21,
    113,
    false,
    Gender.All,
    new FabricLayer('green', FabricType.Broadcloth, [
      new MaterialPercent(Material.Cotton, 100),
    ]),
    null,
    null,
    null,
    new ClothingSegmentsData(
      ClothingSegmentBounds.Arms_410_Top_Shoulder_Sleeve,
      ClothingSegmentBounds.Arms_450_Forearm_50,
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

// Tube Top
MidwearUpperBodyHeuristicItemList.set(
  100069,
  new HeuristicItem(
    null,
    'Tube Top',
    ItemType.Clothing,
    ItemCategory.Mid_Wear__Tops__Shirts__Shirt_Generic,
    6,
    67,
    false,
    Gender.Female,
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
      ClothingSegmentBounds.Body_50_Above_Lower_Chest,
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

// Long Sleeve Shirt, A
MidwearUpperBodyHeuristicItemList.set(
  100073,
  new HeuristicItem(
    null,
    'Long Sleeve Shirt, A',
    ItemType.Clothing,
    ItemCategory.Mid_Wear__Tops__Shirts__Shirt_Generic,
    18,
    220,
    false,
    Gender.All,
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
      true,
      true,
      true,
      true
    )
  )
);

// Long Sleeve Blouse, thin
MidwearUpperBodyHeuristicItemList.set(
  100074,
  new HeuristicItem(
    null,
    'Long Sleeve Blouse, thin',
    ItemType.Clothing,
    ItemCategory.Mid_Wear__Tops__Blouses__Blouse_Generic,
    25,
    206,
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
      true,
      true,
      true,
      true
    )
  )
);

// Long Sleeve Shirt, cotton-polyester blend
MidwearUpperBodyHeuristicItemList.set(
  100075,
  new HeuristicItem(
    null,
    'Long Sleeve Shirt, cotton-polyester blend',
    ItemType.Clothing,
    ItemCategory.Mid_Wear__Tops__Shirts__Shirt_Generic,
    25,
    196,
    false,
    Gender.All,
    new FabricLayer('light-grey', FabricType.Plain_Weave, [
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

// Flannel, Long Sleeve
MidwearUpperBodyHeuristicItemList.set(
  100076,
  new HeuristicItem(
    null,
    'Flannel, Long Sleeve',
    ItemType.Clothing,
    ItemCategory.Mid_Wear__Tops__Shirts__Shirt_Generic,
    34,
    309,
    false,
    Gender.All,
    new FabricLayer('red', FabricType.Plain_Weave, [
      new MaterialPercent(Material.Cotton, 80),
      new MaterialPercent(Material.Polyester, 20),
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

// Short Sleeve Shirt, light
MidwearUpperBodyHeuristicItemList.set(
  100077,
  new HeuristicItem(
    null,
    'Short Sleeve Shirt, light',
    ItemType.Clothing,
    ItemCategory.Mid_Wear__Tops__Shirts__Shirt_Generic,
    19,
    156,
    false,
    Gender.All,
    new FabricLayer('white', FabricType.Plain_Weave, [
      new MaterialPercent(Material.Polyester, 80),
      new MaterialPercent(Material.Cotton, 20),
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

// Long Sleeve Shirt, B
MidwearUpperBodyHeuristicItemList.set(
  100078,
  new HeuristicItem(
    null,
    'Long Sleeve Shirt, B',
    ItemType.Clothing,
    ItemCategory.Mid_Wear__Tops__Shirts__Shirt_Generic,
    26,
    245,
    false,
    Gender.All,
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
      true,
      true,
      true,
      true
    )
  )
);

// Polo Shirt, short sleeve
MidwearUpperBodyHeuristicItemList.set(
  100079,
  new HeuristicItem(
    null,
    'Polo Shirt, short sleeve',
    ItemType.Clothing,
    ItemCategory.Mid_Wear__Tops__Knit_Shirts__Polo_Shirt,
    17,
    228,
    false,
    Gender.All,
    null,
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

export { MidwearUpperBodyHeuristicItemList };
