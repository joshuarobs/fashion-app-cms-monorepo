import { gql } from 'apollo-server';

const Queries = gql`
  type Query {
    hello: String
    #--------------------------------------------------
    # base_colours
    #--------------------------------------------------
    getBaseColours: [base_colours]
    #--------------------------------------------------
    # body_segments
    #--------------------------------------------------
    getBodySegments: [body_segments]
    #--------------------------------------------------
    # clothing_segment_data
    #--------------------------------------------------
    #--------------------------------------------------
    # clothing_shell_counts
    #--------------------------------------------------
    #--------------------------------------------------
    # clothing_shell_maindata
    #--------------------------------------------------
    #--------------------------------------------------
    # clothing_shell_maindata_revision_changes
    #--------------------------------------------------
    getClothingShellMaindataRevisionChanges(
      id: Int!
      limit: Int
      offset: Int
    ): [clothing_shell_maindata_revision_changes]
    getClothingShellMaindataRevisionChangesPromosOnly(
      clothingShellId: Int!
      revision: Int!
      limit: Int
      offset: Int
    ): [clothing_shell_maindata_revision_changes]
    #--------------------------------------------------
    # clothing_shell_maindata_revisions
    #--------------------------------------------------
    getAllClothingShellMaindataRevisionsForClothingShell(
      clothingShellId: Int!
      limit: Int
      offset: Int
    ): [clothing_shell_maindata_revisions]
    getClothingShellMaindataRevisionByRevAndClothingShellId(
      clothingShellId: Int!
      revision: Int!
    ): [clothing_shell_maindata_revisions]
    getRevisionsForClothingShellBarebones(
      id: Int!
    ): [clothing_shell_maindata_revisions]
    #--------------------------------------------------
    # clothing_shells
    #--------------------------------------------------
    getClothingShell: clothing_shells
    getClothingShellBaseDataByPk(id: Int!): clothing_shells
    getClothingShellsForClothingShellsTableLatest(
      limit: Int
      offset: Int
    ): [clothing_shells]
    getClothingShellsListBB(limit: Int, offset: Int): [clothing_shells]
    getItemClothingShell: clothing_shells
    #--------------------------------------------------
    # colour_mix_parts
    #--------------------------------------------------
    getColourMixPartsListBB(limit: Int, offset: Int): [colour_mix_parts]
    getColourMixPartsMultipleByIds(ids: [Int!]): [colour_mix_parts]
    #--------------------------------------------------
    # colours
    #--------------------------------------------------
    getColoursListBB(limit: Int, offset: Int): [colours]
    #--------------------------------------------------
    # companies
    #--------------------------------------------------
    getCompanies(limit: Int, offset: Int): [companies]
    getCompaniesListBB(limit: Int, offset: Int): [companies]
    getCompany(id: Int!): companies
    #--------------------------------------------------
    # company_counts
    #--------------------------------------------------
    #--------------------------------------------------
    # company_translation_revision_changes
    #--------------------------------------------------
    getCompanyTranslationRevisionChanges(
      companyId: Int!
      limit: Int
      offset: Int
    ): [company_translation_revision_changes]
    getCompanyTranslationRevisionChangesForLocale(
      companyId: Int!
      localeCode: String!
      limit: Int
      offset: Int
    ): [company_translation_revision_changes]
    getCompanyTranslationRevisionChangesPromosOnly(
      companyId: Int!
      localeCode: String!
      revision: Int!
    ): [company_translation_revision_changes]
    #--------------------------------------------------
    # company_translation_revisions
    #--------------------------------------------------
    getCompanyTranslationRevisions(id: Int!): [company_translation_revisions]
    getCompanyTranslationRevisionsByLocaleCode(
      companyId: Int!
      localeCode: String!
    ): [company_translation_revisions]
    #--------------------------------------------------
    # company_translations
    #--------------------------------------------------
    getCompanyTranslationsGivenUniqueKeys(
      revision: Int!
      companyId: Int!
      localeCode: String!
    ): [company_translations]
    #--------------------------------------------------
    # countries
    #--------------------------------------------------
    getCountries(limit: Int, offset: Int): [countries]
    #--------------------------------------------------
    # fabric_layers
    #--------------------------------------------------
    getFabricLayersListBB(
      limit: Int
      offset: Int
      fabricLayerTypes: [fabric_layer_types_enum!]
    ): [fabric_layers]
    #--------------------------------------------------
    # fabric_types
    #--------------------------------------------------
    getFabricTypes: [fabric_types]
    #--------------------------------------------------
    # genders
    #--------------------------------------------------
    getGenders: [genders]
    #--------------------------------------------------
    # item_maindata
    #--------------------------------------------------
    #--------------------------------------------------
    # item_maindata_revision_changes
    #--------------------------------------------------
    getItemMaindataRevisionChanges(
      id: Int!
      limit: Int
    ): [item_maindata_revision_changes]
    getItemMaindataRevisionChangesPromosOnly(
      itemId: Int!
      revision: Int!
    ): [item_maindata_revision_changes]
    #--------------------------------------------------
    # item_maindata_revisions
    #--------------------------------------------------
    getItemMaindataRevision: item_maindata_revisions
    getItemMaindataRevisionByRevAndItemIdBarebones(
      itemId: Int!
      revision: Int!
    ): [item_maindata_revisions]
    getItemMaindataRevisionWithItemMaindataByRevAndItemId(
      itemId: Int!
      revision: Int!
    ): [item_maindata_revisions]
    getLatestProdItemMaindataRevByItemId(
      itemId: Int!
    ): [item_maindata_revisions]
    getNumberOfUniqueItemsForClothingShell: hasura_aggregate_holder
    getNumberOfUniqueProdItemsForCompany(id: Int!): hasura_aggregate_holder
    getRevisionsForItemBarebones(id: Int!): [item_maindata_revisions]
    getTopXUniqueProdItemsForClothingShellBB(
      id: Int!
      limit: Int
      offset: Int
    ): [item_maindata_revisions]
    getTopXUniqueProdItemsForCompanyBB(
      id: Int!
      limit: Int
      offset: Int
    ): [item_maindata_revisions]
    getUniqueItemMaindataRevsForBrandProdOnly(id: Int!): hasura_aggregate_holder
    getUniqueProdItemsForCompany: [item_maindata_revisions]
    #--------------------------------------------------
    # item_translation_revision_changes
    #--------------------------------------------------
    getItemTranslationRevisionChanges(
      id: Int!
      limit: Int
      offset: Int
    ): [item_translation_revision_changes]
    getItemTranslationRevisionChangesForLocale(
      itemId: Int!
      localeCode: String!
      limit: Int
      offset: Int
    ): [item_translation_revision_changes]
    getItemTranslationRevisionChangesPromosOnly(
      itemId: Int!
      localeCode: String!
      revision: Int!
    ): [item_translation_revision_changes]
    #--------------------------------------------------
    # item_translation_revisions
    #--------------------------------------------------
    getItemTranslationRevisions(id: Int!): [item_translation_revisions]
    getItemTranslationRevisionsGivenLocaleCode(
      itemId: Int!
      localeCode: String!
    ): [item_translation_revisions]
    #--------------------------------------------------
    # item_translations
    #--------------------------------------------------
    getItemTranslationsGivenUniqueKeys(
      revision: Int!
      itemId: Int!
      localeCode: String!
    ): [item_translations]
    #--------------------------------------------------
    # item_types
    #--------------------------------------------------
    getItemTypes: [item_types]
    #--------------------------------------------------
    # items
    #--------------------------------------------------
    getItemBaseDataByPk(id: Int!): items
    getItemsForItemsTableDevelopmentOnly: [items]
    getItemsForItemsTableLatest: [items]
    getItemsForItemsTableProductionOnly: [items]
    getItemWithLocaleData: items
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
    getMaskShapes: [body_segment_mask_shapes]
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
    getFabricLayer(id: Int!): fabric_layers
    getItemRevisionChangesAggregates(
      itemId: Int!
    ): item_translation_revision_changes_aggregate_holder
  }
`;

export { Queries };
