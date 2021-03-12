import {
  ClothingSegmentBounds,
  FabricType,
  Gender,
  ItemCategory,
  ItemType,
  Material,
} from '@joshuarobs/clothing-enums';
import {
  ClothingSegmentsData,
  FabricLayer,
  HeuristicItem,
} from '@joshuarobs/clothing-framework';
import { MaterialPercent } from '@joshuarobs/clothing-framework/build/classes/MaterialPercent';
import { getBodyCoveragePercent } from '@joshuarobs/clothing-framework/build/classes/ClothingSegmentsData/getBodyCoveragePercent';

// FOR QUICKLY DEVELOPING THE SAME FILE FOR THE FRAMEWORK
// THIS SHOULD BE PUT EVENTUALLY BACK INTO THE FRAMEWORK
// JUST KEEP THIS FILE HERE, DEVELOP IT, AND COPY CHANGES TO FRAMEWORK REPO

const HeuristicItemList: Map<number, HeuristicItem> = new Map();
// ==================================================
// UNDERWEAR - LOWER BODY
// ==================================================
// Panties
HeuristicItemList.set(
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
HeuristicItemList.set(
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
HeuristicItemList.set(
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
HeuristicItemList.set(
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
HeuristicItemList.set(
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
HeuristicItemList.set(
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
HeuristicItemList.set(
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
HeuristicItemList.set(
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
HeuristicItemList.set(
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
HeuristicItemList.set(
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
HeuristicItemList.set(
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
HeuristicItemList.set(
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
HeuristicItemList.set(
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
HeuristicItemList.set(
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
HeuristicItemList.set(
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
HeuristicItemList.set(
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

// ==================================================
// UNDERWEAR - UPPER BODY
// ==================================================
HeuristicItemList.set(
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

// T-Shirt
HeuristicItemList.set(
  100030,
  new HeuristicItem(
    null,
    'T-Shirt',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Tops__Undershirts,
    8,
    105,
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

// Long Sleeve Shirt
HeuristicItemList.set(
  100033,
  new HeuristicItem(
    null,
    'Long Sleeve Shirt',
    ItemType.Clothing,
    ItemCategory.Inner_Wear__Tops__Undershirts,
    12,
    200,
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

// ==================================================
// MID-WEAR - UPPER BODY
// ==================================================
// ==================================================
// MID-WEAR - LOWER BODY
// ==================================================
// ==================================================
// MID-WEAR - FULL BODY
// ==================================================
// ==================================================
// OUTER-WEAR - UPPER BODY
// ==================================================
// ==================================================
// MISC
// ==================================================
// Down Jacket
HeuristicItemList.set(
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
HeuristicItemList.set(
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
HeuristicItemList.set(
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
HeuristicItemList.set(
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
HeuristicItemList.set(
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
