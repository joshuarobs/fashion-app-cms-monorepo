import { gql } from 'apollo-server';
import { Enums } from './type-defs/enums';
import { Queries } from './type-defs/queries';
import { Mutations } from './type-defs/mutations';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Mutations
  ${Mutations}

  # Queries
  ${Queries}

  # Enums
  ${Enums}

  # Special Hasura types
  type hasura_aggregate {
    count: Int
  }

  type hasura_aggregate_holder {
    aggregate: hasura_aggregate
    # distinct_on: item_maindata_revisions_select_column
  }

  # Custom types for queries with multiple return types
  type item_translation_revision_changes_aggregate_holder {
    item_maindata_revision_changes_aggregate: hasura_aggregate_holder
    item_translation_revision_changes_aggregate: hasura_aggregate_holder
  }

  # Types we created in the database
  type base_colours {
    value: String!
    description: String
  }

  type body_groups {
    value: String!
    description: String
    # Relationships
    body_segments: [body_segments]
  }

  type body_segment_mask_shapes {
    value: String!
    description: String
  }

  type body_segment_masks {
    id: Int!
    body_segment_mask_shape: String!
    fill_percent: Int!
    uniform_segment_thickness: Int
    shell_layer_id: Int
    fill_layer_id: Int
    lining_layer_id: Int
    interlining_layer_id: Int
    body_segment_id: Int!
    # Relationships
    body_segment: body_segments
    fill_layer: fabric_layers
    interlining_layer: fabric_layers
    lining_layer: fabric_layers
    shell_layer: fabric_layers
    clothing_shell_and_body_segment_masks: [clothing_shell_and_body_segment_mask]
  }

  type body_segments {
    id: Int!
    name: String
    body_group: String!
  }

  type clothing_segment_bounds {
    value: Int!
  }

  type clothing_segment_data {
    id: String!
    right_sleeve_start_front: Int
    right_sleeve_end_front: Int
    right_sleeve_start_back: Int
    right_sleeve_end_back: Int
    left_sleeve_start_front: Int
    left_sleeve_end_front: Int
    left_sleeve_start_back: Int
    left_sleeve_end_back: Int
    right_body_start_front: Int
    right_body_end_front: Int
    right_body_start_back: Int
    right_body_end_back: Int
    left_body_start_front: Int
    left_body_end_front: Int
    left_body_start_back: Int
    left_body_end_back: Int
    sleeves_is_symmetrical: Boolean!
    sleeves_front_back_is_same: Boolean!
    body_is_symmetrical: Boolean!
    body_front_back_is_same: Boolean!
    # Relationships
    clothing_shell_maindata: clothing_shell_maindata
  }

  type clothing_shell_and_body_segment_mask {
    body_segment_mask_id: Int!
    clothing_shell_id: Int!
    # Relationships
    body_segment_mask: body_segment_masks
    clothing_shell: clothing_shells
  }

  type clothing_shell_counts {
    id: Int!
    clothing_shell_id: Int
    item_count: Int
    # Relationships
    clothing_shell: clothing_shells
  }

  type clothing_shell_maindata {
    id: String!
    revision_id: String!
    is_release: Boolean!
    name: String
    uniform_thickness: Float
    default_shell_layer_id: Int
    default_fill_layer_id: Int
    default_lining_layer_id: Int
    default_interlining_layer_id: Int
    item_type: String!
    clothing_segment_data_id: String!
    # Relationships
    default_shell_layer: fabric_layers
    default_lining_layer: fabric_layers
    default_interlining_layer: fabric_layers
    default_fill_layer: fabric_layers
    clothing_segment_data: clothing_segment_data
    revision: clothing_shell_maindata_revisions
  }

  type clothing_shell_maindata_revision_changes {
    id: String!
    clothing_shell_maindata_revision_id: String!
    user_id: Int!
    change_type: String!
    to_state: String
    action: String
    date: String
    # Relationships
    user: staff_users
    clothing_shell_maindata_revision: clothing_shell_maindata_revisions
  }

  type clothing_shell_maindata_revisions {
    id: String!
    clothing_shell_id: Int!
    revision: Int!
    state: String!
    # Relationships
    clothing_shell: clothing_shells
    clothing_shell_maindata: [clothing_shell_maindata]
  }

  type clothing_shells {
    id: Int!
    created_at: String!
    updated_at: String!
    # Relationships
    counts: clothing_shell_counts
    clothing_shell_and_body_segment_masks: [clothing_shells]
    #    clothing_shell_and_clothing_features: [clothing_shell_and_clothing_feature]
    item_maindata: [item_maindata]
    clothing_shell_maindata_revisions: [clothing_shell_maindata_revisions]
    # Special Relationships - used in queries
    latest_revision: [clothing_shell_maindata_revisions]
    latest_prod: [clothing_shell_maindata_revisions]
    # Hasura Relationships
    clothing_shell_maindata_revisions_aggregate: hasura_aggregate_holder
    clothing_shell_and_body_segment_masks_aggregate: hasura_aggregate_holder
  }

  type collab_company_and_collection {
    company_id: Int!
    collection_id: Int!
    # Relationships
    collection: collections
    company: companies
  }

  type collections {
    id: Int!
    name: String!
    website_url: String
    date_started: String
    date_finished: String
    created_at: String!
    updated_at: String!
    brand_id: Int
    for_gender: String!
    # Relationships
    company: companies
    gender: genders
    collab_company_and_collections: [collab_company_and_collection]
  }

  type colour_mix_parts {
    id: Int!
    colour_id: Int
    percent: Float!
    # Relationships
    colour: colours
    fabric_layer_and_colour_mix_parts: [fabric_layer_and_colour_mix_part]
    fabric_layer_and_colour_mix_parts_aggregate: hasura_aggregate_holder
  }

  type colours {
    id: Int!
    name: String!
    base_colour: String
    colour_code: String
    created_at: String
    updated_at: String
  }

  type companies {
    id: Int!
    name: String!
    website_url: String!
    is_reseller: Boolean!
    is_affiliate: Boolean!
    logo_url: String
    created_at: String
    updated_at: String
    affiliate_start_date: String
    short_id: Int
    founded_in_id: String
    # Relationships
    counts: company_counts
    founded_in: countries
    collab_company_and_collections: [collab_company_and_collection]
    collections: [collections]
    company_translations: [company_translation_revisions]
    item_families: [item_families]
    item_maindata: [item_maindata]
    # Hasura Relationships
    item_maindata_aggregate: hasura_aggregate_holder
    collections_aggregate: hasura_aggregate_holder
    company_translation_revisions_aggregate(
      distinct_on: company_translation_revisions_select_column
    ): hasura_aggregate_holder
  }

  type companies_and_companies_aggregate {
    companies: [companies]
    companies_aggregate: hasura_aggregate_holder
  }

  type company_counts {
    id: Int!
    company_id: Int!
    item_count: Int!
    # Relationships
    company: companies
  }

  type company_translation_revision_changes {
    id: String!
    company_translation_revision_id: String!
    user_id: Int!
    change_type: String!
    to_state: String
    action: String
    date: String!
    # Relationships
    company_translation_revision: company_translation_revisions
    user: staff_users
  }

  type company_translation_revisions {
    id: String!
    company_id: Int!
    locale_code: String!
    revision: Int!
    state: String!
    # Relationships
    company: companies
    locale: locales
    company_translations: [company_translations]
  }

  type company_translations {
    id: String!
    revision_id: String!
    is_release: Boolean!
    stylised_name: String!
    short_name: String!
    bio: String
    # Relationships
    revision: company_translation_revisions
  }

  type countries {
    value: String!
    description: String!
  }

  type data_actions {
    value: String!
  }

  type data_change_types {
    value: String!
  }

  type data_promotions {
    id: Int!
    to_state: String!
    date: String!
    data_promotable_type: String!
    item_translation_revision_id: String
    item_translation_id: String
  }

  type data_release_types {
    value: String!
  }

  type data_states {
    value: String!
  }

  type fabric_layer_and_colour_mix_part {
    fabric_layer_id: Int!
    colour_mix_part_id: Int!
    # Relationships
    colour_mix_part: colour_mix_parts
    fabric_layer: fabric_layers
  }

  type fabric_layer_types {
    value: String!
    description: String
    # Relationships
    fabric_layers: [fabric_layers]
  }

  type fabric_layers {
    id: Int!
    thickness: Float
    type: String
    fabric_layer_type: String
    insulation: Int
    density: Int
    permeability: Int
    notes: String
    created_at: String
    updated_at: String
    # Relationships
    fabric_layer_and_colour_mix_parts: [fabric_layer_and_colour_mix_part]
  }

  type fabric_types {
    id: Int!
    name: String!
  }

  type genders {
    value: String!
    description: String
    # Relationships
    collections: [collections]
    item_maindata: [item_maindata]
  }

  type item_and_media_item_associated {
    item_id: Int!
    media_item_id: String!
    media_item: media_items!
  }

  type item_families {
    id: Int!
    name: String
    brand_id: Int
    created_at: String!
    updated_at: String!
    # Relationships
    company: companies
    item: [items]
  }

  type item_global_media {
    id: String!
    revision_id: String!
    is_release: Boolean!
    media_1_id: String
    media_2_id: String
    media_3_id: String
    media_4_id: String
    media_5_id: String
    media_6_id: String
    media_7_id: String
    media_8_id: String
    media_9_id: String
    media_10_id: String
    notes: String
    # Relationships
    media_1: media_items
    media_2: media_items
    media_3: media_items
    media_4: media_items
    media_5: media_items
    media_6: media_items
    media_7: media_items
    media_8: media_items
    media_9: media_items
    media_10: media_items
  }

  type item_global_media_revision_changes {
    id: String!
    item_global_media_revision_id: String!
    user_id: String!
    change_type: String!
    to_state: String
    action: String
    date: String!
    # Relationships
    item_global_media_revision: item_global_media_revisions
    user: staff_users
  }

  type item_global_media_revisions {
    id: String!
    item_id: Int!
    revision: Int!
    state: String!
    # Relationships
    item_global_media: [item_global_media]
    # item: items
    # item_maindata: [item_maindata]
  }

  type item_maindata {
    id: String!
    revision_id: String!
    is_release: Boolean!
    name: String
    type: String!
    short_id: Int
    brand_id: Int
    item_family_id: Int
    for_gender: String!
    clothing_shell_id: Int
    made_in_id: String
    # Relationships
    brand: companies
    clothing_shell: clothing_shells
    item_family: item_families
    made_in: countries
    revisions: item_maindata_revisions
  }

  type item_maindata_revision_changes {
    id: String!
    item_maindata_revision_id: String!
    user_id: String!
    change_type: String!
    to_state: String
    action: String
    date: String!
    # Relationships
    item_maindata_revision: item_maindata_revisions
    user: staff_users
  }

  type item_maindata_revisions {
    id: String!
    item_id: Int!
    revision: Int!
    state: String!
    # Relationships
    item: items
    item_maindata: [item_maindata]
  }

  type item_translation_revision_changes {
    id: String!
    item_translation_revision_id: String!
    user_id: Int!
    date: String!
    change_type: String!
    to_state: String
    action: String
    # Relationships
    item_translation_revision: item_translation_revisions
    user: staff_users
  }

  type item_translation_revisions {
    id: String!
    item_id: Int!
    locale_code: String!
    revision: Int!
    state: String!
    # Relationships
    item: items
    locale: locales
    item_translations: [item_translations]
  }

  type item_translations {
    id: String!
    revision_id: String!
    is_release: Boolean!
    full_name: String!
    short_name: String
    description: String
    # Relationships
    revision: item_translation_revisions
  }

  type item_types {
    value: String!
    description: String
  }

  type items {
    id: Int!
    created_at: String
    updated_at: String
    short_id: Int
    item_family_id: Int
    # Relationships
    item_maindata_revisions: [item_maindata_revisions]
    item_translation_revisions: [item_translation_revisions]
    item_and_media_item_associations: [item_and_media_item_associated]
    # Hasura Relationships
    item_maindata_revisions_aggregate: hasura_aggregate_holder
    item_translation_revisions_aggregate: hasura_aggregate_holder
    # Special Relationships - used in queries
    latest_revision: [item_maindata_revisions]
    latest_prod: [item_maindata_revisions]
  }

  type language_families {
    value: String!
    description: String!
  }

  type locales {
    code: String!
    name: String!
    language_code: String!
    country_code: String!
    # Relationships
    country: countries
    language: language_families
  }

  type materials {
    id: Int!
    name: String!
    fabric_id: Int
    non_fabric_id: Int
    # Relationships
    materials_mix_parts: [materials_mix_parts]
  }

  type materials_mix_parts {
    id: Int!
    percent: Int!
    material_id: Int!
    # Relationships
    material: materials
  }

  type media_items {
    id: String!
    name: String!
    description: String
    type: String!
    url: String!
    created_at: String!
    updated_at: String!
  }

  type staff_users {
    id: Int!
    email: String!
    password: String!
    name: String!
    title: String!
    role_id: Int
    last_online: String
    avatar_url: String
    created_at: String!
    updated_at: String!
  }

  type version_cms_items_db {
    id: Int!
    value: String!
    description: String
  }
`;

export { typeDefs };
