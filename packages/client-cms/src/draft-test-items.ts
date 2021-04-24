import {
  ClothingSegmentsData,
  FabricLayer,
  HeuristicItem,
  Enums,
} from '@joshuarobs/clothing-framework';
import { MaterialPercent } from '@joshuarobs/clothing-framework/build/framework/classes/MaterialPercent';
import { getBodyCoveragePercent } from '@joshuarobs/clothing-framework/build/framework/classes/ClothingSegmentsData/getBodyCoveragePercent';

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
    Enums.ItemType.Clothing,
    Enums.ItemCategory.Inner_Wear__Lower_Torso__Panties,
    3,
    27,
    false,
    Enums.Gender.Female,
    new FabricLayer('white', null, [
      new MaterialPercent(Enums.Material.Cotton, 100),
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
      Enums.ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      // Enums.ClothingSegmentBounds.BODY_190_BELOW_GROIN,
      Enums.ClothingSegmentBounds.Body_170_Hips,
      Enums.ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      Enums.ClothingSegmentBounds.Body_210_Thigh_5,
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
    Enums.ItemType.Clothing,
    Enums.ItemCategory.Inner_Wear__Pants__Pantyhose,
    2,
    39,
    false,
    Enums.Gender.Female,
    new FabricLayer('black', null, [
      new MaterialPercent(Enums.Material.Nylon, 100),
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
      Enums.ClothingSegmentBounds.Body_120_Waist,
      Enums.ClothingSegmentBounds.Body_270_Ankle,
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
    Enums.ItemType.Clothing,
    Enums.ItemCategory.Inner_Wear__Lower_Torso__Briefs,
    4,
    67,
    false,
    Enums.Gender.Male,
    new FabricLayer('navy-blue', Enums.FabricType.Single_Jersey, [
      new MaterialPercent(Enums.Material.Wool, 100),
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
      Enums.ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      Enums.ClothingSegmentBounds.Body_170_Hips,
      Enums.ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      Enums.ClothingSegmentBounds.Body_210_Thigh_5,
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
    Enums.ItemType.Clothing,
    Enums.ItemCategory.Inner_Wear__Pants__Short_Legged_1_4,
    5, // 4 > 5
    70,
    false,
    Enums.Gender.Male,
    new FabricLayer('navy-blue', Enums.FabricType.Single_Jersey, [
      new MaterialPercent(Enums.Material.Wool, 100),
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
      Enums.ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      Enums.ClothingSegmentBounds.Body_210_Thigh_5,
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
    Enums.ItemType.Clothing,
    Enums.ItemCategory.Inner_Wear__Lower_Torso__Briefs,
    4,
    65,
    false,
    Enums.Gender.Male,
    new FabricLayer('black', Enums.FabricType.Single_Jersey, [
      new MaterialPercent(Enums.Material.Cotton, 100),
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
      Enums.ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      Enums.ClothingSegmentBounds.Body_190_Below_Groin,
      Enums.ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      Enums.ClothingSegmentBounds.Body_210_Thigh_5,
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
    Enums.ItemType.Clothing,
    Enums.ItemCategory.Inner_Wear__Pants__Long_Legged_1_2,
    6,
    137,
    false,
    Enums.Gender.All,
    new FabricLayer('dark-grey', Enums.FabricType.Single_Jersey, [
      new MaterialPercent(Enums.Material.Wool, 100),
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
      Enums.ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      Enums.ClothingSegmentBounds.Body_230_Thigh_80,
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
    Enums.ItemType.Clothing,
    Enums.ItemCategory.Inner_Wear__Pants__Long_Johns,
    12,
    198,
    false,
    Enums.Gender.All,
    new FabricLayer('light-grey', Enums.FabricType.Single_Jersey, [
      new MaterialPercent(Enums.Material.Wool, 100),
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
      Enums.ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      Enums.ClothingSegmentBounds.Body_270_Ankle,
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
    Enums.ItemType.Clothing,
    Enums.ItemCategory.Inner_Wear__Lower_Torso__Briefs,
    3,
    66,
    false,
    Enums.Gender.Male,
    new FabricLayer('dark-grey', Enums.FabricType.Single_Jersey, [
      new MaterialPercent(Enums.Material.Cotton, 50),
      new MaterialPercent(Enums.Material.Polyester, 50),
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
      Enums.ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      Enums.ClothingSegmentBounds.Body_190_Below_Groin,
      Enums.ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      Enums.ClothingSegmentBounds.Body_210_Thigh_5,
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
    Enums.ItemType.Clothing,
    Enums.ItemCategory.Inner_Wear__Pants__Long_Johns,
    8,
    162,
    false,
    Enums.Gender.All,
    new FabricLayer('light-grey', Enums.FabricType.Single_Jersey, [
      new MaterialPercent(Enums.Material.Cotton, 100),
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
      Enums.ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      Enums.ClothingSegmentBounds.Body_270_Ankle,
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
    Enums.ItemType.Clothing,
    Enums.ItemCategory.Inner_Wear__Pants__Long_Legged_3_4,
    8,
    186,
    false,
    Enums.Gender.All,
    new FabricLayer('grey', Enums.FabricType.Single_Jersey, [
      new MaterialPercent(Enums.Material.Cotton, 100),
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
      Enums.ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      Enums.ClothingSegmentBounds.Body_260_Calf_50,
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
    Enums.ItemType.Clothing,
    Enums.ItemCategory.Inner_Wear__Pants__Long_Johns,
    10,
    193,
    false,
    Enums.Gender.All,
    new FabricLayer('grey', Enums.FabricType.Single_Jersey, [
      new MaterialPercent(Enums.Material.Cotton, 100),
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
      Enums.ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      Enums.ClothingSegmentBounds.Body_270_Ankle,
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
    Enums.ItemType.Clothing,
    Enums.ItemCategory.Inner_Wear__Pants__Long_Johns,
    15,
    210,
    false,
    Enums.Gender.All,
    new FabricLayer('grey', Enums.FabricType.Waffle_Knit, [
      new MaterialPercent(Enums.Material.Cotton, 50),
      new MaterialPercent(Enums.Material.Polyester, 50),
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
      Enums.ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      Enums.ClothingSegmentBounds.Body_270_Ankle,
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
    Enums.ItemType.Clothing,
    Enums.ItemCategory.Inner_Wear__Pants__Long_Johns,
    10,
    221,
    false,
    Enums.Gender.All,
    new FabricLayer('grey', null, [
      new MaterialPercent(Enums.Material.Cotton, 50),
      new MaterialPercent(Enums.Material.Wool, 50),
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
      Enums.ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      Enums.ClothingSegmentBounds.Body_270_Ankle,
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
    Enums.ItemType.Clothing,
    Enums.ItemCategory.Inner_Wear__Pants__Long_Johns,
    13,
    165,
    false,
    Enums.Gender.All,
    new FabricLayer('black', null, [
      new MaterialPercent(Enums.Material.Polypropylene, 100),
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
      Enums.ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      Enums.ClothingSegmentBounds.Body_270_Ankle,
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
    Enums.ItemType.Clothing,
    Enums.ItemCategory.Inner_Wear__Pants__Long_Johns,
    22,
    270,
    true,
    Enums.Gender.All,
    new FabricLayer('navy-blue', Enums.FabricType.Rib_1x1, [
      new MaterialPercent(Enums.Material.Wool, 50),
      new MaterialPercent(Enums.Material.Polyester, 50),
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
      Enums.ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      Enums.ClothingSegmentBounds.Body_270_Ankle,
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
    Enums.ItemType.Clothing,
    Enums.ItemCategory.Inner_Wear__Pants__Long_Johns,
    7,
    155,
    false,
    Enums.Gender.All,
    new FabricLayer('light-grey', Enums.FabricType.Single_Jersey, [
      new MaterialPercent(Enums.Material.Cotton, 50),
      new MaterialPercent(Enums.Material.Modal, 50),
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
      Enums.ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      Enums.ClothingSegmentBounds.Body_270_Ankle,
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
    Enums.ItemType.Clothing,
    Enums.ItemCategory.Inner_Wear__Tops__Bras,
    1,
    44,
    false,
    Enums.Gender.Female,
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
      Enums.ClothingSegmentBounds.Body_50_Above_Lower_Chest,
      Enums.ClothingSegmentBounds.Body_80_Above_Upper_Abdomen,
      Enums.ClothingSegmentBounds.Body_70_Lower_Chest_85,
      Enums.ClothingSegmentBounds.Body_80_Above_Upper_Abdomen,
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
    Enums.ItemType.Clothing,
    Enums.ItemCategory.Inner_Wear__Tops__Undershirts,
    8,
    105,
    false,
    Enums.Gender.All,
    null,
    null,
    null,
    null,
    new ClothingSegmentsData(
      Enums.ClothingSegmentBounds.Arms_410_Top_Shoulder_Sleeve,
      Enums.ClothingSegmentBounds.Arms_430_Biceps_Triceps_15,
      null,
      null,
      null,
      null,
      null,
      null,
      Enums.ClothingSegmentBounds.Body_30_Above_Upper_Chest,
      Enums.ClothingSegmentBounds.Body_170_Hips,
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
    Enums.ItemType.Clothing,
    Enums.ItemCategory.Inner_Wear__Tops__Undershirts,
    12,
    200,
    false,
    Enums.Gender.All,
    new FabricLayer('white', Enums.FabricType.Single_Jersey, [
      new MaterialPercent(Enums.Material.Cotton, 100),
    ]),
    null,
    null,
    null,
    new ClothingSegmentsData(
      Enums.ClothingSegmentBounds.Arms_410_Top_Shoulder_Sleeve,
      Enums.ClothingSegmentBounds.Arms_470_Wrist,
      null,
      null,
      null,
      null,
      null,
      null,
      Enums.ClothingSegmentBounds.Body_30_Above_Upper_Chest,
      Enums.ClothingSegmentBounds.Body_170_Hips,
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
    Enums.ItemType.Clothing,
    Enums.ItemCategory.Outer_Wear__Jackets_And_Coats__Jackets__Down,
    55,
    880,
    false,
    Enums.Gender.All,
    new FabricLayer('black', Enums.FabricType.Taffeta, [
      new MaterialPercent(Enums.Material.Nylon, 100),
    ]),
    new FabricLayer('white', null, [
      new MaterialPercent(Enums.Material.Down, 100),
    ]),
    new FabricLayer('black', Enums.FabricType.Taffeta, [
      new MaterialPercent(Enums.Material.Nylon, 100),
    ]),
    null,
    new ClothingSegmentsData(
      Enums.ClothingSegmentBounds.Arms_410_Top_Shoulder_Sleeve,
      Enums.ClothingSegmentBounds.Arms_470_Wrist,
      null,
      null,
      null,
      null,
      null,
      null,
      Enums.ClothingSegmentBounds.Body_30_Above_Upper_Chest,
      Enums.ClothingSegmentBounds.Body_170_Hips,
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
    Enums.ItemType.Clothing,
    Enums.ItemCategory.Mid_Wear__Shorts__Short_Shorts,
    8,
    342,
    false,
    Enums.Gender.Female,
    new FabricLayer('light-blue', Enums.FabricType.Denim, [
      new MaterialPercent(Enums.Material.Cotton, 100),
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
      Enums.ClothingSegmentBounds.Body_140_Lower_Abdomen_33,
      Enums.ClothingSegmentBounds.Body_200_Upper_Thigh_55,
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
    Enums.ItemType.Clothing,
    12,
    1,
    400, // TODO: idk, figure it out
    false,
    Enums.Gender.All,
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
      Enums.ClothingSegmentBounds.Body_50_Above_Lower_Chest,
      Enums.ClothingSegmentBounds.Body_240_Knee,
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
    Enums.ItemType.Clothing,
    Enums.ItemCategory.Mid_Wear__Tops__Other,
    8,
    342,
    false,
    Enums.Gender.Female,
    null,
    null,
    null,
    null,
    new ClothingSegmentsData(
      Enums.ClothingSegmentBounds.Arms_410_Top_Shoulder_Sleeve,
      Enums.ClothingSegmentBounds.Arms_470_Wrist,
      null,
      null,
      null,
      null,
      null,
      null,
      Enums.ClothingSegmentBounds.Body_30_Above_Upper_Chest,
      Enums.ClothingSegmentBounds.Body_170_Hips,
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
    Enums.ItemType.Clothing,
    Enums.ItemCategory.Mid_Wear__Dresses__Other,
    16, // 23 - 7
    110, // 153 - ?
    false,
    Enums.Gender.Female,
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
      Enums.ClothingSegmentBounds.Body_30_Above_Upper_Chest,
      Enums.ClothingSegmentBounds.Body_220_Thigh_25,
      Enums.ClothingSegmentBounds.Body_120_Waist,
      Enums.ClothingSegmentBounds.Body_220_Thigh_25,
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
