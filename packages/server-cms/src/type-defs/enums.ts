import { gql } from '@apollo/client';

// Generated on: Mon, 19 Apr 2021 11:13:53 GMT

/* ============================================================
 * !!IMPORTANT!!
 *
 * This file should not be edited manually at all.
 *
 * If you need to update the enums, run the script:
 * `server-cms/scripts/get-enums.js`
 *
 * Ensure you have a `server-cms/schema.graphql` file before
 * doing so.
 *
 * All enums in this file are scraped from the schema file
 * via the script.
 * ============================================================
 */

const Enums = gql`
  #============================================================
  # Pure Value Type Enums
  #============================================================
  enum base_colours_enum {
    Black
    Blue
    Brown
    Cyan
    Green
    Grey
    Indigo
    Lime
    Orange
    Pink
    Purple
    Red
    White
    Yellow
  }

  enum body_groups_enum {
    Arms_And_Hands
    Head_And_Neck
    Legs_And_Feet
    Torso
  }

  enum body_segment_mask_shapes_enum {
    CUTOUT_FROM_BOTH_SIDES
    CUTOUT_FROM_BOTTOM
    CUTOUT_FROM_INNER_SIDE
    CUTOUT_FROM_LEFT_SIDE
    CUTOUT_FROM_OUTER_SIDE
    CUTOUT_FROM_RIGHT_SIDE
    CUTOUT_FROM_TOP
    Full
    OTHER
  }

  enum countries_enum {
    AE
    AT
    AU
    BD
    BE
    BR
    CA
    CN
    DE
    DK
    ES
    FI
    FR
    GB
    GR
    HK
    ID
    IE
    IN
    IT
    JP
    KH
    KR
    LK
    MA
    MM
    MX
    MY
    NL
    NO
    NZ
    PK
    PL
    PT
    RU
    SE
    SG
    TH
    TR
    TW
    US
    VN
    ZA
  }

  enum data_actions_enum {
    Create
    Delete
    Update
  }

  enum data_change_types_enum {
    Action
    Demotion
    Promotion
  }

  enum data_states_enum {
    Development
    Production
    Retired
    Review
  }

  enum fabric_layer_types_enum {
    Fill
    Interlining
    Lining
    Shell
  }

  enum genders_enum {
    All
    Female
    Male
    Other
  }

  enum item_types_enum {
    Accessory
    Clothing
  }

  enum language_families_enum {
    de
    en
    es
    fr
    it
    ja
    ko
    pt
    zh
  }

  #============================================================
  # Selection Keys Table Enums
  #============================================================
  enum base_colours_select_column {
    description
    value
  }

  enum body_groups_select_column {
    description
    value
  }

  enum body_segment_mask_shapes_select_column {
    description
    value
  }

  enum body_segment_masks_select_column {
    body_segment_id
    body_segment_mask_shape
    fill_layer_id
    fill_percent
    id
    interlining_layer_id
    lining_layer_id
    shell_layer_id
    uniform_segment_thickness
  }

  enum body_segments_select_column {
    body_group
    id
    name
  }

  enum clothing_features_select_column {
    description
    value
  }

  enum clothing_masks_select_column {
    id
    iso_coverage
    iso_id
    name
  }

  enum clothing_segment_bounds_select_column {
    value
  }

  enum clothing_segment_data_select_column {
    body_front_back_is_same
    body_is_symmetrical
    id
    left_body_end_back
    left_body_end_front
    left_body_start_back
    left_body_start_front
    left_sleeve_end_back
    left_sleeve_end_front
    left_sleeve_start_back
    left_sleeve_start_front
    right_body_end_back
    right_body_end_front
    right_body_start_back
    right_body_start_front
    right_sleeve_end_back
    right_sleeve_end_front
    right_sleeve_start_back
    right_sleeve_start_front
    sleeves_front_back_is_same
    sleeves_is_symmetrical
  }

  enum clothing_shell_and_body_segment_mask_select_column {
    body_segment_mask_id
    clothing_shell_id
  }

  enum clothing_shell_and_clothing_feature_select_column {
    clothing_feature
    clothing_shell_id
  }

  enum clothing_shell_counts_select_column {
    clothing_shell_id
    id
    item_count
  }

  enum clothing_shell_maindata_revision_changes_select_column {
    action
    change_type
    clothing_shell_maindata_revision_id
    date
    id
    to_state
    user_id
  }

  enum clothing_shell_maindata_revisions_select_column {
    clothing_shell_id
    id
    revision
    state
  }

  enum clothing_shell_maindata_select_column {
    clothing_segment_data_id
    default_fill_layer_id
    default_interlining_layer_id
    default_lining_layer_id
    default_shell_layer_id
    id
    is_release
    item_type
    name
    revision_id
    uniform_thickness
  }

  enum clothing_shells_select_column {
    created_at
    id
    updated_at
  }

  enum collab_company_and_collection_select_column {
    collection_id
    company_id
  }

  enum collections_select_column {
    brand_id
    created_at
    date_finished
    date_started
    for_gender
    id
    name
    updated_at
    website_url
  }

  enum colour_mix_parts_select_column {
    colour_id
    id
    percent
  }

  enum colours_select_column {
    base_colour
    colour_code
    id
    name
  }

  enum companies_select_column {
    affiliate_start_date
    created_at
    founded_in_id
    id
    is_affiliate
    is_reseller
    logo_url
    name
    short_id
    updated_at
    website_url
  }

  enum company_counts_select_column {
    company_id
    id
    item_count
  }

  enum company_translation_revision_changes_select_column {
    action
    change_type
    company_translation_revision_id
    date
    id
    to_state
    user_id
  }

  enum company_translation_revisions_select_column {
    company_id
    id
    locale_code
    revision
    state
  }

  enum company_translations_select_column {
    bio
    id
    is_release
    revision_id
    short_name
    stylised_name
  }

  enum countries_select_column {
    description
    value
  }

  enum data_actions_select_column {
    value
  }

  enum data_change_types_select_column {
    value
  }

  enum data_promotions_select_column {
    data_promotable_type
    date
    id
    item_translation_id
    item_translation_revision_id
    to_state
  }

  enum data_release_types_select_column {
    value
  }

  enum data_states_select_column {
    value
  }

  enum fabric_layer_and_colour_mix_part_select_column {
    colour_mix_part_id
    fabric_layer_id
  }

  enum fabric_layer_types_select_column {
    description
    value
  }

  enum fabric_layers_select_column {
    created_at
    density
    fabric_layer_type
    id
    insulation
    permeability
    thickness
    type
    updated_at
  }

  enum fabric_types_select_column {
    id
    name
  }

  enum genders_select_column {
    description
    value
  }

  enum item_and_clothing_shell_select_column {
    clothing_shell_id
    item_id
  }

  enum item_families_select_column {
    brand_id
    created_at
    id
    name
    updated_at
  }

  enum item_maindata_revision_changes_select_column {
    action
    change_type
    date
    id
    item_maindata_revision_id
    to_state
    user_id
  }

  enum item_maindata_revisions_select_column {
    id
    item_id
    revision
    state
  }

  enum item_maindata_select_column {
    brand_id
    clothing_shell_id
    for_gender
    id
    is_release
    item_family_id
    made_in_id
    name
    revision_id
    short_id
    type
  }

  enum item_translation_revision_changes_select_column {
    action
    change_type
    date
    id
    item_translation_revision_id
    to_state
    user_id
  }

  enum item_translation_revisions_select_column {
    id
    item_id
    locale_code
    revision
    state
  }

  enum item_translations_select_column {
    description
    full_name
    id
    is_release
    revision_id
    short_name
  }

  enum item_types_select_column {
    description
    value
  }

  enum items_select_column {
    created_at
    id
    item_family_id
    short_id
    updated_at
  }

  enum language_families_select_column {
    description
    value
  }

  enum locales_select_column {
    code
    country_code
    language_code
    name
  }

  enum materials_mix_parts_select_column {
    id
    material_id
    percent
  }

  enum materials_select_column {
    fabric_id
    id
    name
    non_fabric_id
  }

  enum staff_users_select_column {
    avatar_url
    created_at
    email
    id
    last_online
    name
    password
    role_id
    title
    updated_at
  }

  enum version_cms_items_db_select_column {
    description
    id
    value
  }

  #============================================================
  # Table Selection Keys
  #============================================================
  input base_colours_set_input {
    description: String
    value: String
  }

  input body_groups_set_input {
    description: String
    value: String
  }

  input body_segment_mask_shapes_set_input {
    description: String
    value: String
  }

  input body_segment_masks_set_input {
    body_segment_id: Int
    body_segment_mask_shape: body_segment_mask_shapes_enum
    fill_layer_id: Int
    fill_percent: Float
    id: Int
    interlining_layer_id: Int
    lining_layer_id: Int
    shell_layer_id: Int
    uniform_segment_thickness: Float
  }

  input body_segments_set_input {
    body_group: body_groups_enum
    id: Int
    name: String
  }

  input clothing_features_set_input {
    description: String
    value: String
  }

  input clothing_masks_set_input {
    id: Int
    iso_coverage: Float
    iso_id: String
    name: String
  }

  input clothing_segment_bounds_set_input {
    value: Int
  }

  input clothing_segment_data_set_input {
    body_front_back_is_same: Boolean
    body_is_symmetrical: Boolean
    id: String
    left_body_end_back: Int
    left_body_end_front: Int
    left_body_start_back: Int
    left_body_start_front: Int
    left_sleeve_end_back: Int
    left_sleeve_end_front: Int
    left_sleeve_start_back: Int
    left_sleeve_start_front: Int
    right_body_end_back: Int
    right_body_end_front: Int
    right_body_start_back: Int
    right_body_start_front: Int
    right_sleeve_end_back: Int
    right_sleeve_end_front: Int
    right_sleeve_start_back: Int
    right_sleeve_start_front: Int
    sleeves_front_back_is_same: Boolean
    sleeves_is_symmetrical: Boolean
  }

  input clothing_shell_and_body_segment_mask_set_input {
    body_segment_mask_id: Int
    clothing_shell_id: Int
  }

  input clothing_shell_and_clothing_feature_set_input {
    clothing_feature: String
    clothing_shell_id: Int
  }

  input clothing_shell_counts_set_input {
    clothing_shell_id: Int
    id: Int
    item_count: Int
  }

  input clothing_shell_maindata_revision_changes_set_input {
    action: data_actions_enum
    change_type: data_change_types_enum
    clothing_shell_maindata_revision_id: String
    date: String
    id: String
    to_state: data_states_enum
    user_id: Int
  }

  input clothing_shell_maindata_revisions_set_input {
    clothing_shell_id: Int
    id: String
    revision: Int
    state: data_states_enum
  }

  input clothing_shell_maindata_set_input {
    clothing_segment_data_id: String
    default_fill_layer_id: Int
    default_interlining_layer_id: Int
    default_lining_layer_id: Int
    default_shell_layer_id: Int
    id: String
    is_release: Boolean
    item_type: item_types_enum
    name: String
    revision_id: String
    uniform_thickness: Float
  }

  input clothing_shells_set_input {
    created_at: String
    id: Int
    updated_at: String
  }

  input collab_company_and_collection_set_input {
    collection_id: Int
    company_id: Int
  }

  input collections_set_input {
    brand_id: Int
    created_at: String
    date_finished: String
    date_started: String
    for_gender: genders_enum
    id: Int
    name: String
    updated_at: String
    website_url: String
  }

  input colour_mix_parts_set_input {
    colour_id: Int
    id: Int
    percent: Float
  }

  input colours_set_input {
    base_colour: base_colours_enum
    colour_code: String
    id: Int
    name: String
  }

  input companies_set_input {
    affiliate_start_date: String
    created_at: String
    founded_in_id: countries_enum
    id: Int
    is_affiliate: Boolean
    is_reseller: Boolean
    logo_url: String
    name: String
    short_id: Int
    updated_at: String
    website_url: String
  }

  input company_counts_set_input {
    company_id: Int
    id: Int
    item_count: Int
  }

  input company_translation_revision_changes_set_input {
    action: data_actions_enum
    change_type: data_change_types_enum
    company_translation_revision_id: String
    date: String
    id: String
    to_state: data_states_enum
    user_id: Int
  }

  input company_translation_revisions_set_input {
    company_id: Int
    id: String
    locale_code: String
    revision: Int
    state: data_states_enum
  }

  input company_translations_set_input {
    bio: String
    id: String
    is_release: Boolean
    revision_id: String
    short_name: String
    stylised_name: String
  }

  input countries_set_input {
    description: String
    value: String
  }

  input data_actions_set_input {
    value: String
  }

  input data_change_types_set_input {
    value: String
  }

  input data_promotions_set_input {
    data_promotable_type: String
    date: String
    id: Int
    item_translation_id: String
    item_translation_revision_id: String
    to_state: data_states_enum
  }

  input data_release_types_set_input {
    value: String
  }

  input data_states_set_input {
    value: String
  }

  input fabric_layer_and_colour_mix_part_set_input {
    colour_mix_part_id: Int
    fabric_layer_id: Int
  }

  input fabric_layer_types_set_input {
    description: String
    value: String
  }

  input fabric_layers_set_input {
    created_at: String
    density: Int
    fabric_layer_type: fabric_layer_types_enum
    id: Int
    insulation: Float
    permeability: Int
    thickness: Float
    type: String
    updated_at: String
  }

  input fabric_types_set_input {
    id: Int
    name: String
  }

  input genders_set_input {
    description: String
    value: String
  }

  input item_and_clothing_shell_set_input {
    clothing_shell_id: Int
    item_id: Int
  }

  input item_families_set_input {
    brand_id: Int
    created_at: String
    id: Int
    name: String
    updated_at: String
  }

  input item_maindata_revision_changes_set_input {
    action: data_actions_enum
    change_type: data_change_types_enum
    date: String
    id: String
    item_maindata_revision_id: String
    to_state: data_states_enum
    user_id: Int
  }

  input item_maindata_revisions_set_input {
    id: String
    item_id: Int
    revision: Int
    state: data_states_enum
  }

  input item_maindata_set_input {
    brand_id: Int
    clothing_shell_id: Int
    for_gender: genders_enum
    id: String
    is_release: Boolean
    item_family_id: Int
    made_in_id: countries_enum
    name: String
    revision_id: String
    short_id: Int
    type: item_types_enum
  }

  input item_translation_revision_changes_set_input {
    action: data_actions_enum
    change_type: data_change_types_enum
    date: String
    id: String
    item_translation_revision_id: String
    to_state: data_states_enum
    user_id: Int
  }

  input item_translation_revisions_set_input {
    id: String
    item_id: Int
    locale_code: String
    revision: Int
    state: data_states_enum
  }

  input item_translations_set_input {
    description: String
    full_name: String
    id: String
    is_release: Boolean
    revision_id: String
    short_name: String
  }

  input item_types_set_input {
    description: String
    value: String
  }

  input items_set_input {
    created_at: String
    id: Int
    item_family_id: Int
    short_id: Float
    updated_at: String
  }

  input language_families_set_input {
    description: String
    value: String
  }

  input locales_set_input {
    code: String
    country_code: countries_enum
    language_code: language_families_enum
    name: String
  }

  input materials_mix_parts_set_input {
    id: Int
    material_id: Int
    percent: Float
  }

  input materials_set_input {
    fabric_id: Int
    id: Int
    name: String
    non_fabric_id: Int
  }

  input staff_users_set_input {
    avatar_url: String
    created_at: String
    email: String
    id: Int
    last_online: String
    name: String
    password: String
    role_id: Int
    title: String
    updated_at: String
  }

  input version_cms_items_db_set_input {
    description: String
    id: Int
    value: String
  }
`;

export { Enums };
