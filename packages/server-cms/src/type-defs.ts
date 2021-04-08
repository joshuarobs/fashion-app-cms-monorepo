import { gql } from 'apollo-server';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Query {
    hello: String
    #    getItemsForItemsTableLatest: [items]
    #--------------------------------------------------
    # base_colours
    #--------------------------------------------------
    getBaseColours: [base_colours]
    #--------------------------------------------------
    # body_segments
    #--------------------------------------------------
    getBodySegments: [body_segments]
    #--------------------------------------------------
    #clothing_segment_data
    #--------------------------------------------------
    insertClothingSegmentData: clothing_segment_data
    insertNewBlankClothingSegmentData: clothing_segment_data
    updateClothingSegmentData: clothing_segment_data
    #--------------------------------------------------
    # clothing_shell_counts
    #--------------------------------------------------
    insertClothingShellCount: clothing_shell_counts
    updateClothingShellCount: clothing_shell_counts
    updateClothingShellCountByClothingShellId: clothing_shell_counts
    #--------------------------------------------------
    # clothing_shell_maindata
    #--------------------------------------------------
    insertClothingShellMaindata: clothing_shell_maindata
    insertClothingShellMaindataBarebones: clothing_shell_maindata
    updateClothingShellMaindata: clothing_shell_maindata
    #--------------------------------------------------
    # clothing_shell_maindata_revision_changes
    #--------------------------------------------------
    getClothingShellMaindataRevisionChanges: [clothing_shell_maindata_revision_changes]
    getClothingShellMaindataRevisionChangesPromosOnly: [clothing_shell_maindata_revision_changes]
    insertClothingShellMaindataRevisionChange: clothing_shell_maindata_revision_changes
    insertClothingShellMaindataRevisionChangePromoRetired: clothing_shell_maindata_revision_changes
    #--------------------------------------------------
    # clothing_shell_maindata_revisions
    #--------------------------------------------------
    getAllClothingShellMaindataRevisionsForClothingShell: [clothing_shell_maindata_revisions]
    getClothingShellMaindataRevisionByRevAndClothingShellId: [clothing_shell_maindata_revisions]
    getRevisionsForClothingShellBarebones: [clothing_shell_maindata_revisions]
    insertClothingShellMaindataRevision: clothing_shell_maindata_revisions
    updateClothingShellMaindataRevisionState: clothing_shell_maindata_revisions
    updateClothingShellMaindataRevisionToRetired: clothing_shell_maindata_revisions
    #--------------------------------------------------
    # clothing_shells
    #--------------------------------------------------
    getClothingShell: clothing_shells
    getClothingShellBaseDataByPk: clothing_shells
    getClothingShellsForClothingShellsTableLatest: [clothing_shells]
    getClothingShellsListBB: [clothing_shells]
    getItemClothingShell: clothing_shells
    insertEmptyClothingShell: clothing_shells
    updateClothingShellUpdatedAt: clothing_shells
    #--------------------------------------------------
    # companies
    #--------------------------------------------------
    getCompanies: [companies]
    getCompaniesListBB: [companies]
    getCompany: companies
    insertCompany: companies
    updateCompany: companies
    #--------------------------------------------------
    # company_counts
    #--------------------------------------------------
    insertCompanyCount: company_counts
    updateCompanyCount: company_counts
    #--------------------------------------------------
    # company_translation_revision_changes
    #--------------------------------------------------
    deleteCompanyTranslationRevisionChangesForRevision: company_translation_revision_changes
    getCompanyTranslationRevisionChanges: [company_translation_revision_changes]
    getCompanyTranslationRevisionChangesForLocale: [company_translation_revision_changes]
    getCompanyTranslationRevisionChangesPromosOnly: [company_translation_revision_changes]
    insertCompanyTranslationRevisionChange: company_translation_revision_changes
    insertCompanyTranslationRevisionChangeActUpdate: company_translation_revision_changes
    insertCompanyTranslationRevisionChangePromoProduction: company_translation_revision_changes
    insertCompanyTranslationRevisionChangePromoRetired: company_translation_revision_changes
    insertCompanyTranslationRevisionChangePromoReview: company_translation_revision_changes
    #--------------------------------------------------
    # company_translation_revisions
    #--------------------------------------------------
    deleteCompanyTranslationRevision: company_translation_revisions
    getCompanyTranslationRevisions: [company_translation_revisions]
    getCompanyTranslationRevisionsByLocaleCode: [company_translation_revisions]
    insertCompanyTranslationRevision: company_translation_revisions
    updateCompanyTranslationRevisionToProduction: company_translation_revisions
    updateCompanyTranslationRevisionToRetired: company_translation_revisions
    updateCompanyTranslationRevisionToReview: company_translation_revisions
    #--------------------------------------------------
    # company_translations
    #--------------------------------------------------
    deleteCompanyTranslationsForRevision: company_translations
    getCompanyTranslationsGivenUniqueKeys: [company_translations]
    insertCompanyTranslation: company_translations
    insertCompanyTranslationBlankDraft: company_translations
    updateCompanyTranslation: company_translations
    #--------------------------------------------------
    # countries
    #--------------------------------------------------
    getCountries: [countries]
    #--------------------------------------------------
    # fabric_layers
    #--------------------------------------------------
    getFabricLayersListBB: [fabric_layers]
    #--------------------------------------------------
    # genders
    #--------------------------------------------------
    getGenders: [genders]
    #--------------------------------------------------
    # item_maindata
    #--------------------------------------------------
    deleteItemMaindataForItem: item_maindata
    insertItemMaindata: item_maindata
    insertItemMaindataBarebones: item_maindata
    updateItemMaindata: item_maindata
    #--------------------------------------------------
    # item_maindata_revision_changes
    #--------------------------------------------------
    deleteItemMaindataRevisionChangesForItem: item_maindata_revision_changes
    getItemMaindataRevisionChanges: [item_maindata_revision_changes]
    getItemMaindataRevisionChangesPromosOnly: [item_maindata_revision_changes]
    insertItemMaindataRevisionChange: item_maindata_revision_changes
    insertItemMaindataRevisionChangePromoRetired: item_maindata_revision_changes
    #--------------------------------------------------
    # item_maindata_revisions
    #--------------------------------------------------
    deleteItemMaindataRevisionsForItem: item_maindata_revisions
    getItemMaindataRevision: item_maindata_revisions
    getItemMaindataRevisionByRevAndItemId: item_maindata_revisions
    getLatestProdItemMaindataRevByItemId: [item_maindata_revisions]
    getNumberOfUniqueItemsForClothingShell: hasura_aggregate_holder
    getNumberOfUniqueProdItemsForCompany: hasura_aggregate_holder
    getRevisionsForItemBarebones: [item_maindata_revisions]
    getTopXUniqueProdItemsForClothingShellBB: [item_maindata_revisions]
    getTopXUniqueProdItemsForCompanyBB: [item_maindata_revisions]
    getUniqueItemMaindataRevsForBrandProdOnly: [item_maindata_revisions]
    getUniqueProdItemsForCompany: [item_maindata_revisions]
    insertItemMaindataRevision: item_maindata_revisions
    updateItemMaindataRevisionState: item_maindata_revisions
    updateItemMaindataRevisionToRetired: item_maindata_revisions
    #--------------------------------------------------
    # item_translation_revision_changes
    #--------------------------------------------------
    deleteItemTranslationRevisionChangesForRevision: item_translation_revision_changes
    deleteItemTranslationRevisionChangesForItem: item_translation_revision_changes
    getItemTranslationRevisionChanges: [item_translation_revision_changes]
    getItemTranslationRevisionChangesForLocale: [item_translation_revision_changes]
    getItemTranslationRevisionChangesPromosOnly: [item_translation_revision_changes]
    insertItemTranslationRevisionChange: item_translation_revision_changes
    insertItemTranslationRevisionChangePromoProduction: item_translation_revision_changes
    insertItemTranslationRevisionChangePromoRetired: item_translation_revision_changes
    insertItemTranslationRevisionChangePromoReview: item_translation_revision_changes
    #--------------------------------------------------
    # item_translation_revisions
    #--------------------------------------------------
    deleteItemTranslationRevision: item_translation_revisions
    deleteItemTranslationRevisionsForItem: item_translation_revisions
    getItemTranslationRevisions: [item_translation_revisions]
    getItemTranslationRevisionsGivenLocaleCode: [item_translation_revisions]
    insertItemTranslationRevision: item_translation_revisions
    updateItemTranslationRevisionToProduction: item_translation_revisions
    updateItemTranslationRevisionToRetired: item_translation_revisions
    updateItemTranslationRevisionToReview: item_translation_revisions
    #--------------------------------------------------
    # item_translations
    #--------------------------------------------------
    deleteItemTranslationsForRevision: item_translations
    deleteItemTranslationsForItem: item_translations
    getItemTranslationsGivenUniqueKeys: [item_translations]
    insertItemTranslation: item_translations
    insertItemTranslationBlankDraft: item_translations
    updateItemTranslation: item_translations
    #--------------------------------------------------
    # item_types
    #--------------------------------------------------
    getItemTypes: [item_types]
    #--------------------------------------------------
    # items
    #--------------------------------------------------
    deleteItemByPk: items
    getItemBaseDataByPk: items
    getItemsForItemsTableDevelopmentOnly: [items]
    getItemsForItemsTableLatest: [items]
    getItemsForItemsTableProductionOnly: [items]
    getItemWithLocaleData: items
    newItem: items
    updateItemUpdatedAt: items
    #--------------------------------------------------
    # language_families
    #--------------------------------------------------
    getLanguageFamilies: [language_families]
    #--------------------------------------------------
    # locales
    #--------------------------------------------------
    getLocales: [locales]
    #--------------------------------------------------
    # mask_shapes
    #--------------------------------------------------
    #    getMaskShapes: [mask_shapes]
    #--------------------------------------------------
    # materials
    #--------------------------------------------------
    getMaterials: [materials]
    #--------------------------------------------------
    # staff_users
    #--------------------------------------------------
    getStaffUsers: [staff_users]
    #--------------------------------------------------
    # other
    #--------------------------------------------------
    getFabricLayer: fabric_layers
  }

  # Special Hasura types
  type hasura_aggregate {
    count: Int
  }

  type hasura_aggregate_holder {
    aggregate: hasura_aggregate
  }

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
    name: String
    uniform_thickness: Int
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
    percent: Int!
    # Relationships
    colour: colours
    fabric_layer_and_colour_mix_parts: [fabric_layer_and_colour_mix_part]
  }

  type colours {
    id: Int!
    name: String!
    base_colour: String
    colour_code: String
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
    company_translation_revision_changes: company_translation_revisions
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
    revision: company_translations
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
    thickness: Int
    type: String
    fabric_layer_type: String
    insulation: Int
    density: Int
    permeability: Int
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
    # Hasura Relationships
    item_maindata_revisions_aggregate: hasura_aggregate_holder
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
