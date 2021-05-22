import { gql } from 'apollo-server';

const Mutations = gql`
  type Mutation {
    #--------------------------------------------------
    # base_colours
    #--------------------------------------------------
    #--------------------------------------------------
    # body_segments
    #--------------------------------------------------
    #--------------------------------------------------
    # clothing_segment_data
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
    insertClothingShellMaindataRevisionChange: clothing_shell_maindata_revision_changes
    insertClothingShellMaindataRevisionChangePromoRetired: clothing_shell_maindata_revision_changes
    #--------------------------------------------------
    # clothing_shell_maindata_revisions
    #--------------------------------------------------
    insertClothingShellMaindataRevision: clothing_shell_maindata_revisions
    updateClothingShellMaindataRevisionState: clothing_shell_maindata_revisions
    updateClothingShellMaindataRevisionToRetired: clothing_shell_maindata_revisions
    #--------------------------------------------------
    # clothing_shells
    #--------------------------------------------------
    insertEmptyClothingShell: clothing_shells
    updateClothingShellUpdatedAt: clothing_shells
    #--------------------------------------------------
    # companies
    #--------------------------------------------------
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
    insertCompanyTranslationRevisionChange: company_translation_revision_changes
    insertCompanyTranslationRevisionChangeActUpdate: company_translation_revision_changes
    insertCompanyTranslationRevisionChangePromoProduction: company_translation_revision_changes
    insertCompanyTranslationRevisionChangePromoRetired: company_translation_revision_changes
    insertCompanyTranslationRevisionChangePromoReview: company_translation_revision_changes
    #--------------------------------------------------
    # company_translation_revisions
    #--------------------------------------------------
    deleteCompanyTranslationRevision: company_translation_revisions
    insertCompanyTranslationRevision: company_translation_revisions
    updateCompanyTranslationRevisionToProduction: company_translation_revisions
    updateCompanyTranslationRevisionToRetired: company_translation_revisions
    updateCompanyTranslationRevisionToReview: company_translation_revisions
    #--------------------------------------------------
    # company_translations
    #--------------------------------------------------
    deleteCompanyTranslationsForRevision: company_translations
    insertCompanyTranslation: company_translations
    insertCompanyTranslationBlankDraft: company_translations
    updateCompanyTranslation: company_translations
    #--------------------------------------------------
    # countries
    #--------------------------------------------------
    #--------------------------------------------------
    # fabric_layers
    #--------------------------------------------------
    #--------------------------------------------------
    # fabric_types
    #--------------------------------------------------
    #--------------------------------------------------
    # genders
    #--------------------------------------------------
    #--------------------------------------------------
    # item_maindata
    #--------------------------------------------------
    deleteItemMaindataForItem: item_maindata
    insertItemMaindata: item_maindata
    insertItemMaindataBarebones: item_maindata
    updateItemMaindata(
      id: String!
      changes: item_maindata_set_input
      itemId: Int!
      countsId: Int
    ): item_maindata
    #--------------------------------------------------
    # item_maindata_revision_changes
    #--------------------------------------------------
    deleteItemMaindataRevisionChangesForItem: item_maindata_revision_changes
    insertItemMaindataRevisionChange: item_maindata_revision_changes
    insertItemMaindataRevisionChangePromoRetired: item_maindata_revision_changes
    #--------------------------------------------------
    # item_maindata_revisions
    #--------------------------------------------------
    deleteItemMaindataRevisionsForItem: item_maindata_revisions
    insertItemMaindataRevision: item_maindata_revisions
    insertItemMaindataRevisionItemsPage(id: Int!): item_maindata_revisions
    updateItemMaindataRevisionState: item_maindata_revisions
    updateItemMaindataRevisionStatePromoteToReview(
      id: String!
      userId: Int
    ): item_maindata_revisions
    updateItemMaindataRevisionStateDemoteToDevelopment(
      id: String!
      userId: Int
    ): item_maindata_revisions
    updateItemMaindataRevisionStatePromoteToProduction(
      id: String!
      userId: Int
    ): item_maindata_revisions
    updateItemMaindataRevisionStatePromoteNewRevision(
      id: String!
      userId: Int
    ): item_maindata_revisions
    updateItemMaindataRevisionToRetired: item_maindata_revisions
    #--------------------------------------------------
    # item_translation_revision_changes
    #--------------------------------------------------
    deleteItemTranslationRevisionChangesForRevision: item_translation_revision_changes
    deleteItemTranslationRevisionChangesForItem: item_translation_revision_changes
    insertItemTranslationRevisionChange: item_translation_revision_changes
    insertItemTranslationRevisionChangePromoProduction: item_translation_revision_changes
    insertItemTranslationRevisionChangePromoRetired: item_translation_revision_changes
    insertItemTranslationRevisionChangePromoReview: item_translation_revision_changes
    #--------------------------------------------------
    # item_translation_revisions
    #--------------------------------------------------
    deleteItemTranslationRevision: item_translation_revisions
    deleteItemTranslationRevisionsForItem: item_translation_revisions
    insertItemTranslationRevision: item_translation_revisions
    #    updateItemTranslationRevisionToProduction: item_translation_revisions
    insertItemTranslationRevisionPromoteNewRevision(
      id: Int!
      locale_code: String!
    ): item_translation_revisions
    updateItemTranslationRevisionStatePromoteToProduction(
      id: String!
    ): item_translation_revisions
    updateItemTranslationRevisionToRetired: item_translation_revisions
    updateItemTranslationRevisionToReview: item_translation_revisions
    updateItemTranslationRevisionStatePromoteToReview(
      id: String!
    ): item_translation_revisions
    #--------------------------------------------------
    # item_translations
    #--------------------------------------------------
    deleteItemTranslationsForRevision: item_translations
    deleteItemTranslationsForItem: item_translations
    insertItemTranslation: item_translations
    insertItemTranslationBlankDraft: item_translations
    insertItemTranslationPromoteToReview(
      revision_id: String! #      is_release: Boolean! #      full_name: String! #      short_name: String #      description: String
    ): item_translations
    updateItemTranslation(
      id: String!
      changes: item_translations_set_input!
    ): item_translations
    #--------------------------------------------------
    # item_types
    #--------------------------------------------------
    #--------------------------------------------------
    # items
    #--------------------------------------------------
    deleteItemByPk: items
    insertItem(name: String!, item_type: item_types_enum!): items
    updateItemUpdatedAt: items
    #--------------------------------------------------
    # language_families
    #--------------------------------------------------
    #--------------------------------------------------
    # locales
    #--------------------------------------------------
    #--------------------------------------------------
    # mask_shapes
    #--------------------------------------------------
    #--------------------------------------------------
    # materials
    #--------------------------------------------------
    #--------------------------------------------------
    # staff_users
    #--------------------------------------------------
    #--------------------------------------------------
    # other
    #--------------------------------------------------
  }
`;

export { Mutations };
