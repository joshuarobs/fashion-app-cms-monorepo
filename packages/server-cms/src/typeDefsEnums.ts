import { gql } from '@apollo/client';

const typeDefsEnums = gql`
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
`;

export { typeDefsEnums };
