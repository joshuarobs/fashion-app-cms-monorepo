const App_Shell = {
  Sidebar: {
    Groups: {
      General: 'General',
      Content: 'Content',
      Framework: 'Framework',
      Administrative: 'Administrative',
    },
    Pages: {
      Home: 'Home',
      My_Tasks: 'My Tasks',
      Items: 'Items',
      Item_Families: 'Item Families',
      Clothing_Shells: 'Clothing Shells',
      Fabric_Layers: 'Fabric Layers',
      Companies: 'Companies',
      Collections: 'Collections',
      Colours: 'Colours',
      Colour_Mix_Parts: 'Colour Mix Parts',
      Materials: 'Materials',
      Body_Segments: 'Body Segments',
      Templates: 'Templates',
      Localisations: 'Localisations',
      Settings: 'Settings',
      Users: 'Users',
      Base_Colours: 'Base Colours',
      Mask_Shapes: 'Mask Shapes',
      Fabric_Types: 'Fabric Types',
      Media: 'Media',
      // Clothing_features: "Clothing Features",
      Countries: 'Countries',
      Languages: 'Languages',
      Genders: 'Genders',
      Item_Types: 'Item Types',
      Item_Features: 'Item Features',
      Heuristic_Items: 'Heuristic Items',
      Other_Enums: 'Other Enums',
    },
    Footer: {
      Copyright: 'Copyright',
    },
  },
};

const Items = {
  Tabs: {
    Active: 'Active',
    Waiting_For_Approval: 'Waiting for Approval',
    Rejected: 'Rejected',
    Inactive: 'Inactive',
  },
  Filter_Categories: {
    Gender: 'Gender',
    Category: 'Category',
    Occasions: 'Occasions',
    Styles: 'Styles',
    Brands: 'Brands',
    Number_Of_Resellers: 'Number of Resellers',
    Featured_Resellers: 'Featured Resellers',
    Resellers: 'Resellers',
    Price: 'Price',
    Colours: 'Colours',
    Materials: 'Materials',
    Number_In_Closets: 'Number in Closets',
    Pick_rate: 'Pick Rate',
    Made_in: 'Made In',
  },
  Values: {
    Gender: {
      All: 'All',
      Male: 'Male',
      Female: 'Female',
      Other: 'Other',
    },
    Occasions: {
      Home: 'Home',
      Sleeping: 'Sleeping',
      Casual: 'Casual',
      Smart_Casual: 'Smart Casual',
      Workout: 'Workout',
      Hiking: 'Hiking',
      Sports: 'Sports',
      Uniform: 'Uniform',
      Business_Casual: 'Business Casual',
      Business_Formal: 'Business Formal',
      Semi_Formal: 'Semi Formal',
      Black_Tie: 'Black Tie',
      White_Tie: 'White Tie',
    },
    Styles: {
      General: 'General',
      Streetwear: 'Streetwear',
      Techwear: 'Techwear',
      High_Fashion: 'High Fashion',
      Preppy: 'Preppy',
      Minimalism: 'Minimalism',
      Sportswear: 'Sportswear',
      Hip_Hop: 'Hip Hop',
      Punk: 'Punk',
      Goth: 'Goth',
      Emo: 'Emo',
    },
    Company_Types: {
      All: 'All',
      Designers: 'Designers',
      Sellers: 'Sellers',
    },
  },
};

const Framework_Items = {
  Types: {
    Clothes: 'Clothes',
    Accessories: 'Accessories',
  },
  Clothes: {
    All: 'All Clothes',
    Inner_Wear: 'Inner Wear',
    Inner_Wear_All: 'All Inner Wear',
    Tops: 'Tops',
    Tops_All: 'All Tops',
    Bras: 'Bras',
    Undershirts: 'Undershirts',
    Lower_Torso: 'Lower Torso',
    Lower_Torso_All: 'All Lower Torso',
    Briefs: 'Briefs',
    Panties: 'Panties',
    Pants: 'Pants',
    Socks: 'Socks',
    Mid_Wear: 'Mid Wear',
    Dresses: 'Dresses',
    Blouses: 'Blouses',
    Knitwear_And_Sweaters: 'Knitwear & Sweaters',
    Shirts: 'Shirts',
    Waistcoats: 'Waistcoats',
    Vests: 'Vests',
    Shorts: 'Shorts',
    Skirts: 'Skirts',
    Outer_Wear: 'Outer Wear',
    Jackets_And_Coats: 'Jackets & Coats',
    Jackets: 'Jackets',
    Coats: 'Coats',
    Shoes: 'Shoes',
    Other: 'Other',
  },
  Accessories: {
    All: 'All Accessories',
    Clothing_Like: 'Clothing-like',
    Head: 'Head',
    Hair_Accessories: 'Hair Accessories',
    Hats: 'Hats',
    Headphones: 'Headphones',
    Earrings: 'Earrings',
    Other: 'Other',
    Masks: 'Masks',
    Eyewear: 'Eyewear',
    Religious: 'Religious',
    Neck: 'Neck',
    Torso: 'Torso',
    Waist_And_Hip: 'Waist & Hip',
    Wrists: 'Wrists',
    Watches: 'Watches',
    Bracelets_And_Bands: 'Bracelets & Bands',
    Cuff_Links: 'Cuff Links',
    Hands: 'Hands',
    Gloves: 'Gloves',
    Rings: 'Rings',
    Feet: 'Feet',
    Bags: 'Bags',
    Items_In_Bag: 'Items in Bag',
    Bring_Along: 'Bring Along',
  },
};

const Generic = {
  Bool: {
    True: 'True',
    False: 'False',
  },
  Item_Types: {
    Accessory: 'Accessory',
    Clothing: 'Clothing',
  },
  Number_Filters: {
    Equal_To: 'Equal To',
    Range: 'Range',
    Min: 'Min',
    Max: 'Max',
    Greater_Than_Or_Equal_To: 'Greater than or Equal To',
    Lesser_Than_Or_Equal_To: 'Lesser than or Equal To',
  },
};

const Common = {
  Saving_Changes: 'Saving Changes...',
  Changes_Saved: 'Changes Saved!',
  Copied_To_Clipboard: 'Copied to clipboard!',
  Creating_New_Clothing_Shell: 'Creating new Clothing Shell...',
  Created_New_Clothing_Shell: 'Created new Clothing Shell!',
  Creating_New_Company: 'Creating new Company...',
  Created_New_Company: 'Created new Company!',
  Creating_New_Item: 'Creating new Item...',
  Created_New_Item: 'Created new Item!',
  Deleting_Clothing_Shell: 'Deleting the Clothing Shell...',
  Deleted_Clothing_Shell: 'Deleted the Clothing Shell!',
  Deleting_Company: 'Deleting new Company...',
  Deleted_Company: 'Deleted new Company!',
  Deleting_Fabric_Layer: 'Deleting the Fabric Layer...',
  Deleted_Fabric_Layer: 'Deleted the Fabric Layer!',
  Deleting_Item: 'Deleting new Item...',
  Deleted_Item: 'Deleted new Item!',
  Adding_New_Locale: 'Adding new Locale...',
  Added_New_Locale: 'Added new Locale!',
  Adding_Locale: 'Adding new Locale...',
  Added_Locale: 'Added new Locale!',
  View_All: 'View All',
  Delete: 'Delete',
  Retire: 'Retire',
  Cancel: 'Cancel',
  No_Set_Name: 'No set name!',
  Updating_Item_Count: 'Updating Item Count...',
  Updated_Item_Count: 'Updated Item Count!',
  Item_Related: {
    Adding_New_Maindata_Revision:
      'Adding new Maindata Revision and Dependents...',
    Added_New_Maindata_Revision: 'Added new Maindata Revision and Dependents!',
  },
  Activity_Related: {},
  State_Related: {
    Error: 'Error',
    Dev_Short: 'Dev',
    Rev_Short: 'Review',
    Prod_Short: 'Prod',
    Development_Upper: 'Development',
    Review_Upper: 'Review',
    Production_Upper: 'Production',
    Retired_Upper: 'Retired',
    Development: 'Development',
    Review: 'Review',
    Production: 'Production',
    Retired: 'Retired',
    In_Development: 'In Development',
    In_Review: 'In Review',
    In_Production: 'In Production',
    In_Retirement: 'In Retirement',
    Desc_In_Development: 'A new Revision has been started.',
    Desc_In_Review: 'The new Revision is in waiting for review.',
    Desc_In_Production: 'Users can see the new changes.',
    Desc_In_Retirement: 'Revision can no longer be seen nor edited.',
    Promote_To_Review: 'Promote to Review',
    Promote_To_Production: 'Promote to Production',
    To_Be_Promoted: 'To be promoted',
    New_Revision: 'New Revision',
    Creating_New_Revision: 'Creating new Revision...',
    Created_New_Revision: 'Created new Revision!',
    Promoting_To_Review: 'Promoting to Review...',
    Promoted_To_Review: 'Promoted to Review!',
    Promoting_To_Production: 'Promoting to Production...',
    Promoted_To_Production: 'Promoted to Production!',
    Demoting_To_Development: 'Demoting back to Development...',
    Demoted_To_Development: 'Demoted to Development!',
    Overriding_To_Retired: 'Overriding to Retired...',
    Overrode_To_Retired: 'Overrode to Retired!',
    Warning_Delete_Localisation_Revision:
      'Are you sure you want to delete this Localisation Revision?',
    Warning_Retire_Maindata_Revision:
      'Are you sure you want to retire This Maindata Revision?',
    Warning_Delete_Fabric_Layer:
      'Are you sure you want to delete this Fabric Layer?',
    Warning_Delete_Confirmation_Part_1: 'Enter "',
    Warning_Delete_Confirmation_Part_2: '" below to confirm:',
    Deleting_Revision: 'Deleting Revision...',
    Deleted_Revision: 'Deleted Revision!',
  },
  New_Item_Related: {
    Warning_Usage:
      'You should only be adding a new Item if you absolutely have to, such' +
      ' as for testing purposes. \n' +
      'New Item entries should all be generated automatically from vendor' +
      ' APIs via the Home Screen.',
  },
  Localisation_Related: {
    Add_Locale: 'Add Locale',
    Add_Locale_Select_Clothing_Shell: 'Add Locale - Select Clothing Shell',
    Locale_Dashboard: 'Locale Dashboard',
  },
};

const Edit_Related = {
  Asterisks_2: '**',
};

const Fabric_Layer_Details_Frame = {
  General_Information: 'General Information',
  Fabric_Layer_Type: 'Fabric Layer Type',
  Colour_Pattern: 'Colour Pattern',
  Notes: 'Notes',
  Thermal_Attributes: 'Thermal Attributes',
  Thickness: 'Thickness (mm)',
  Insulation_Points: 'Insulation Points',
  Density: 'Density (?)',
  Permeability: 'Permeability',
  Colour_Mix_Parts: 'Colour Mix Parts',
  Select_Colour_Mix_Parts: 'Select Colour Mix Parts',
};

const Item_Details_Frame = {
  General_Details: 'General Details',
  Brand: 'Brand',
  Item_Family: 'Item Family',
  Item_Name: 'Item Name',
  Database_Item_Name: 'Database Item Name',
  Database_Item_Name_Tooltip:
    "The item's internal name displayed only within this CMS. Only staff can" +
    ' see this.',
  Item_Type: 'Item Type',
  Short_Id: 'Short Id',
  Item_Category: 'Item Category',
  Occasions: 'Occasions',
  From_Category: 'From Category',
  Item_Specific: 'Item Specific',
  Styles: 'Styles',
  Release_Date: 'Release Date',
  Designer_Item_Id: 'Designer Item Id',
  Gender_Intended_For: 'Gender Intended For',
  Made_In: 'Made In',
  Heuristic_Item_Name: 'Heuristic Item Name',
  Weight_g: 'Weight (g)',
  Insulation_Points: 'Insulation Points',
  Highly_Insulating: 'Highly Insulating?',
  Database_Company_Name: 'Database Company Name',
  Database_Company_Name_Tooltip:
    "The company's internal name displayed only within this CMS. Only staff" +
    ' can see this.',
  Website_Url: 'Website Url',
  Is_Affiliate: 'Is Affiliate?',
  Is_Reseller: 'Is Reseller?',
  Affiliate_Start_Date: 'Affiliate Start Date',
  Logo_Url: 'Logo Url',
  Founding_Date: 'Founding Date',
  Country_Founded: 'Country Founded',
  Clothing_Shell_Name: 'Clothing Shell Name',
  Uniform_Thickness: 'Uniform Thickness (mm)',
};

const Popup_New_Entry = {
  Add_New_Clothing_Shell: 'Add New Clothing Shell',
  Add_Maindata_Revision_For: 'Add Maindata Revision for',
};

const Table_Descriptions = {
  Base_Colours:
    'The base colour names that all other colours may be derived from. This includes the list of all major classifications of colours.',
  Body_Segments:
    'Enum-like types of different body segments (regions) that make up the' +
    ' body.',
  Clothing_Shells:
    'A description of the physical properties (e.g. shape,' +
    ' colour and materials) of a clothing item.',
  Colours:
    'All the possible main kinds of colour groups that can occur in' +
    ' clothing. It can be generic colour groups (e.g. red, blue, green,' +
    ' black, white. etc) or specific colours, such as "Charcoal Black" which' +
    ' can be a unique colour used by a certain brand (and would still be' +
    ' part of the generic black colour group.)',
  Colour_Mix_Parts:
    'All the possible combinations of a colour and what' +
    ' percentage it makes up for usage in a fabric layer.',
  Countries:
    'The list of all the countries of the world, according to the ISO 3166' +
    ' and ISO 3166-1 standards.',
  Item_Types: 'The types a clothing item can be in.',
  Genders:
    'The genders intended for items. This will not only include' +
    ' individual genders on their own, but also sets and combinations of' +
    ' multiple genders.',
  Languages:
    'All the main languages in the world, according to the ISO' +
    ' 639-1 standard. This does not encompass regional variants, dialects,' +
    ' etc. but rather only encompasses the group that a specific language' +
    ' can be in.',
  Locales: 'The list of all the unique language and country combinations.',
  Mask_Shapes:
    'The different shapes to describe how a layer of a body segment is' +
    ' physically.',
  Other_Enums: 'A variety of minor enums.',
  Fabric_Types:
    'The different types/ways in which a fabric can be constructed in.',
  Materials:
    'The physical materials that make up the clothing’s main build' +
    ' (fabric layers) or its small parts (e.g. buttons, zips, etc.)',
  Users:
    'The staff user accounts of this Content Management System application.',
};

const Clothing_Segment_Bounds = {
  // ------------------------------
  // Sleeves
  // ------------------------------
  Bounds_410: {
    Simple: '410 - Sleeveless',
    Specific: '410 - Top of Shoulder',
  },
  Bounds_420: {
    Simple: '420 - Cap Sleeve',
    Specific: '420 - Shoulder 55%',
  },
  Bounds_430: {
    Simple: '430 - Short Sleeve',
    Specific: '430 - Bicep/Triceps 15%',
  },
  Bounds_440: {
    Simple: '440 - Elbow Length Sleeve',
    Specific: '440 - Elbow',
  },
  Bounds_450: {
    Simple: '450 - Three Quarter Sleeve',
    Specific: '450 - Forearm 50%',
  },
  Bounds_460: {
    Simple: '460 - Near Wrist Sleeve',
    Specific: '460 - Forearm 85%',
  },
  Bounds_470: {
    Simple: '470 - Long Sleeve',
    Specific: '470 - Wrist',
  },
  // ------------------------------
  // Body - Top Torso Start Heights
  // ------------------------------
  Bounds_10: {
    Simple: '10 - Top of Neck',
    Specific: '10 - Top of Neck',
  },
  Bounds_20: {
    Simple: '20 - Turtleneck',
    Specific: '20 - Middle of Neck',
  },
  Bounds_30: {
    Simple: '30 - Standard',
    Specific: '30 - Above Upper Chest',
  },
  Bounds_40: {
    Simple: '40 - Off Shoulder',
    Specific: '40 - Upper Chest 60%',
  },
  Bounds_50: {
    Simple: '50 - Above Breast',
    Specific: '50 - Above Lower Chest',
  },
  Bounds_60: {
    Simple: '60 - Mid Breast',
    Specific: '60 - Lower Chest 30%',
  },
  // ------------------------------
  // Body - Top Torso Lengths / Pants Waist Heights
  // ------------------------------
  Bounds_70: {
    Simple: '70 - Underbreast',
    Specific: '70 - Lower Chest 85%',
  },
  Bounds_80: {
    Simple: '80 - Below Bust',
    Specific: '80 - Above Upper Abdomen',
  },
  Bounds_90: {
    Simple: '90 - Very High Midriff',
    Specific: '90 - Upper Abdomen 20%',
  },
  Bounds_100: {
    Simple: '100 - High Midriff',
    Specific: '100 - Upper Abdomen 60%',
  },
  Bounds_110: {
    Simple: '110 - Ultra High Rise',
    Specific: '110 - Upper Abdomen 95%',
  },
  Bounds_120: {
    Simple: '120 - Above Navel',
    Specific: '120 - Waist',
  },
  Bounds_130: {
    Simple: '130 - High Rise',
    Specific: '130 - Lower Abdomen 10%',
  },
  Bounds_140: {
    Simple: '140 - Mid Rise / Below Navel',
    Specific: '140 - Lower Abdomen 33%',
  },
  Bounds_150: {
    Simple: '150 - Low Rise',
    Specific: '150 - Lower Abdomen 66%',
  },
  Bounds_160: {
    Simple: '160 - Very Low Rise / Standard Shirt',
    Specific: '160 - Lower Abdomen 80%',
  },
  Bounds_170: {
    Simple: '170 - Ultra Low Rise "No Rise"',
    Specific: '170 - Hips',
  },
  Bounds_180: {
    Simple: '180 - High Tuck-In',
    Specific: '180 - Hip Area 60%',
  },
  // ------------------------------
  // Body - Pants Length / Dress Length
  // ------------------------------
  Bounds_190: {
    Simple: '190 - Booty Shorts / Medium Tuck-In',
    Specific: '190 - Below Groin',
  },
  Bounds_200: {
    Simple: '200 - Short Shorts',
    Specific: '200 - Upper Thigh 55%',
  },
  Bounds_210: {
    Simple: '210 - Shorts / Micro Skirt / Low Tuck-In',
    Specific: '210 - Thigh 5%',
  },
  Bounds_220: {
    Simple: '220 - Mid Thigh / Mini Skirt',
    Specific: '220 - Thigh 25%',
  },
  Bounds_230: {
    Simple: '230 - Above Knee "Bermuda"',
    Specific: '230 - Thigh 80%',
  },
  Bounds_240: {
    Simple: '240 - Knee Length',
    Specific: '240 - Knee',
  },
  Bounds_250: {
    Simple: '250 - Below Knee',
    Specific: '250 - Calf 15%',
  },
  Bounds_260: {
    Simple: '260 - Midi "Mid Calf" / Capri',
    Specific: '260 - Calf 50%',
  },
  Bounds_270: {
    Simple: '270 - Maxi / Ankle Length',
    Specific: '270 - Ankle',
  },
};

export {
  App_Shell,
  Items,
  Fabric_Layer_Details_Frame,
  Framework_Items,
  Popup_New_Entry,
  Generic,
  Common,
  Edit_Related,
  Item_Details_Frame,
  Table_Descriptions,
  Clothing_Segment_Bounds,
};
