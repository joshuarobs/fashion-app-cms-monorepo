//@ts-nocheck
import { getBaseColours } from './resolvers/base_colours/getBaseColours';
import { getBodySegments } from './resolvers/body_segments/getBodySegments';
import { insertClothingSegmentData } from './resolvers/clothing_segment_data/insertClothingSegmentData';
import { insertNewBlankClothingSegmentData } from './resolvers/clothing_segment_data/insertNewBlankClothingSegmentData';
import { updateClothingSegmentData } from './resolvers/clothing_segment_data/updateClothingSegmentData';
import { insertClothingShellCount } from './resolvers/clothing_shell_counts/insertClothingShellCount';
import { updateClothingShellCount } from './resolvers/clothing_shell_counts/updateClothingShellCount';
import { updateClothingShellCountByClothingShellId } from './resolvers/clothing_shell_counts/updateClothingShellCountByClothingShellid';
import { insertClothingShellMaindata } from './resolvers/clothing_shell_maindata/insertClothingShellMaindata';
import { insertClothingShellMaindataBarebones } from './resolvers/clothing_shell_maindata/insertClothingShellMaindataBarebones';
import { updateClothingShellMaindata } from './resolvers/clothing_shell_maindata/updateClothingShellMaindata';
import { getClothingShellMaindataRevisionChanges } from './resolvers/clothing_shell_maindata_revision_changes/getClothingShellMaindataRevisionChanges';
import { getClothingShellMaindataRevisionChangesPromosOnly } from './resolvers/clothing_shell_maindata_revision_changes/getClothingShellMaindataRevisionChangesPromosOnly';
import { insertClothingShellMaindataRevisionChange } from './resolvers/clothing_shell_maindata_revision_changes/insertClothingShellMaindataRevisionChange';
import { insertClothingShellMaindataRevisionChangePromoRetired } from './resolvers/clothing_shell_maindata_revision_changes/insertClothingShellMaindataRevisionChangePromoRetired';
import { updateClothingShellMaindataRevisionToRetired } from './resolvers/clothing_shell_maindata_revisions/updateClothingShellMaindataRevisionToRetired';
import { insertClothingShellMaindataRevision } from './resolvers/clothing_shell_maindata_revisions/insertClothingShellMaindataRevision';
import { getClothingShellMaindataRevisionByRevAndClothingShellId } from './resolvers/clothing_shell_maindata_revisions/getClothingShellMaindataRevisionByRevAndClothingShellId';
import { getAllClothingShellMaindataRevisionsForClothingShell } from './resolvers/clothing_shell_maindata_revisions/getAllClothingShellMaindataRevisionsForClothingShell';
import { getRevisionsForClothingShellBarebones } from './resolvers/clothing_shell_maindata_revisions/getRevisionsForClothingShellBB';
import { updateClothingShellMaindataRevisionState } from './resolvers/clothing_shell_maindata_revisions/updateClothingShellMaindataRevisionState';
import { insertEmptyClothingShell } from './resolvers/clothing_shells/insertEmptyClothingShell';
import { updateClothingShellUpdatedAt } from './resolvers/clothing_shells/updateClothingShellUpdatedAt';
import { getClothingShellBaseDataByPk } from './resolvers/clothing_shells/getClothingShellBaseDataByPk';
import { getClothingShellsForClothingShellsTableLatest } from './resolvers/clothing_shells/getClothingShellsForClothingShellsTableLatest';
import { getClothingShell } from './resolvers/clothing_shells/getClothingShell';
import { getClothingShellsListBB } from './resolvers/clothing_shells/getClothingShellsListBB';
import { getItemClothingShell } from './resolvers/clothing_shells/getItemClothingShell';
import { getCompanies } from './resolvers/companies/getCompanies';
import { getCompaniesListBB } from './resolvers/companies/getCompaniesListBB';
import { getCompany } from './resolvers/companies/getCompany';
import { updateCompany } from './resolvers/companies/updateCompany';
import { insertCompany } from './resolvers/companies/insertCompany';
import { insertCompanyCount } from './resolvers/company_counts/insertCompanyCount';
import { updateCompanyCount } from './resolvers/company_counts/updateCompanyCount';
import { deleteCompanyTranslationRevisionChangesForRevision } from './resolvers/company_translation_revision_changes/deleteCompanyTranslationRevisionChangesForRevision';
import { insertCompanyTranslationRevisionChangePromoReview } from './resolvers/company_translation_revision_changes/insertCompanyTranslationRevisionChangePromoReview';
import { insertCompanyTranslationRevisionChangePromoProduction } from './resolvers/company_translation_revision_changes/insertCompanyTranslationRevisionChangePromoProduction';
import { getCompanyTranslationRevisionChangesPromosOnly } from './resolvers/company_translation_revision_changes/getCompanyTranslationRevisionChangesPromosOnly';
import { insertCompanyTranslationRevisionChangeActUpdate } from './resolvers/company_translation_revision_changes/insertCompanyTranslationRevisionChangeActUpdate';
import { insertCompanyTranslationRevisionChangePromoRetired } from './resolvers/company_translation_revision_changes/insertCompanyTranslationRevisionChangePromoRetired';
import { getCompanyTranslationRevisionChanges } from './resolvers/company_translation_revision_changes/getCompanyTranslationRevisionChanges';
import { insertCompanyTranslationRevisionChange } from './resolvers/company_translation_revision_changes/insertCompanyTranslationRevisionChange';
import { getCompanyTranslationRevisionChangesForLocale } from './resolvers/company_translation_revision_changes/getCompanyTranslationRevisionChangesForLocale';
import { updateCompanyTranslationRevisionToReview } from './resolvers/company_translation_revisions/updateCompanyTranslationRevisionToReview';
import { deleteCompanyTranslationRevision } from './resolvers/company_translation_revisions/deleteCompanyTranslationRevision';
import { getCompanyTranslationRevisionsByLocaleCode } from './resolvers/company_translation_revisions/getCompanyTranslationRevisionsByLocaleCode';
import { getCompanyTranslationRevisions } from './resolvers/company_translation_revisions/getCompanyTranslationRevisions';
import { updateCompanyTranslationRevisionToRetired } from './resolvers/company_translation_revisions/updateCompanyTranslationRevisionToRetired';
import { insertCompanyTranslationRevision } from './resolvers/company_translation_revisions/insertCompanyTranslationRevision';
import { updateCompanyTranslationRevisionToProduction } from './resolvers/company_translation_revisions/updateCompanyTranslationRevisionToProduction';
import { getCompanyTranslationsGivenUniqueKeys } from './resolvers/company_translations/getCompanyTranslationsGivenUniqueKeys';
import { updateCompanyTranslation } from './resolvers/company_translations/updateCompanyTranslation';
import { insertCompanyTranslation } from './resolvers/company_translations/insertCompanyTranslation';
import { insertCompanyTranslationBlankDraft } from './resolvers/company_translations/insertCompanyTranslationBlankDraft';
import { deleteCompanyTranslationsForRevision } from './resolvers/company_translations/deleteCompanyTranslationsForRevision';
import { getCountries } from './resolvers/countries/getCountries';
import { getFabricLayersListBB } from './resolvers/fabric_layers/getFabricLayersListBB';
import { insertItemMaindataBarebones } from './resolvers/item_maindata/insertItemMaindataBarebones';
import { insertItemMaindata } from './resolvers/item_maindata/insertItemMaindata';
import { updateItemMaindata } from './resolvers/item_maindata/updateItemMaindata';
import { deleteItemMaindataForItem } from './resolvers/item_maindata/deleteItemMaindataForItem';
import { getItemMaindataRevisionChanges } from './resolvers/item_maindata_revision_changes/getItemMaindataRevisionChanges';
import { deleteItemMaindataRevisionChangesForItem } from './resolvers/item_maindata_revision_changes/deleteItemMaindataRevisionChangesForItem';
import { insertItemMaindataRevisionChangePromoRetired } from './resolvers/item_maindata_revision_changes/insertItemMaindataRevisionChangePromoRetired';
import { insertItemMaindataRevisionChange } from './resolvers/item_maindata_revision_changes/insertItemMaindataRevisionChange';
import { getItemMaindataRevisionChangesPromosOnly } from './resolvers/item_maindata_revision_changes/getItemMaindataRevisionChangesPromosOnly';
import { getTopXUniqueProdItemsForCompanyBB } from './resolvers/item_maindata_revisions/getTopXUniqueProdItemsForCompanyBB';
import { getRevisionsForItemBarebones } from './resolvers/item_maindata_revisions/getRevisionsForItemBB';
import { updateItemMaindataRevisionToRetired } from './resolvers/item_maindata_revisions/updateItemMaindataRevisionToRetired';
import { getItemMaindataRevisionWithItemMaindataByRevAndItemId } from './resolvers/item_maindata_revisions/getItemMaindataRevisionWithItemMaindataByRevAndItemId';
import { getNumberOfUniqueItemsForClothingShell } from './resolvers/item_maindata_revisions/getNumberOfUniqueItemsForClothingShell';
import { getUniqueProdItemsForCompany } from './resolvers/item_maindata_revisions/getUniqueProdItemsForCompany';
import { insertItemMaindataRevision } from './resolvers/item_maindata_revisions/insertItemMaindataRevision';
import { getNumberOfUniqueProdItemsForCompany } from './resolvers/item_maindata_revisions/getNumberOfUniqueProdItemsForCompany';
import { getUniqueItemMaindataRevsForBrandProdOnly } from './resolvers/item_maindata_revisions/getUniqueItemMaindataRevisionsForBrandInProduction';
import { getTopXUniqueProdItemsForClothingShellBB } from './resolvers/item_maindata_revisions/getTopXUniqueProdItemsForClothingShellBB';
import { deleteItemMaindataRevisionsForItem } from './resolvers/item_maindata_revisions/deleteItemMaindataRevisionsForItem';
import { getItemMaindataRevision } from './resolvers/item_maindata_revisions/getItemMaindataRevision';
import { updateItemMaindataRevisionState } from './resolvers/item_maindata_revisions/updateItemMaindataRevisionState';
import { getLatestProdItemMaindataRevByItemId } from './resolvers/item_maindata_revisions/getLatestProdItemMaindataRevByItemId';
import { getItemTranslationRevisionChangesPromosOnly } from './resolvers/item_translation_revision_changes/getItemTranslationRevisionChangesPromosOnly';
import { insertItemTranslationRevisionChangePromoRetired } from './resolvers/item_translation_revision_changes/insertItemTranslationRevisionChangePromoRetired';
import { insertItemTranslationRevisionChange } from './resolvers/item_translation_revision_changes/insertItemTranslationRevisionChange';
import { deleteItemTranslationRevisionChangesForRevision } from './resolvers/item_translation_revision_changes/deleteItemTranslationRevisionChangeForRevision';
import { getItemTranslationRevisionChanges } from './resolvers/item_translation_revision_changes/getItemTranslationRevisionChanges';
import { getItemTranslationRevisionChangesForLocale } from './resolvers/item_translation_revision_changes/getItemTranslationRevisionChangesForLocale';
import { insertItemTranslationRevisionChangePromoProduction } from './resolvers/item_translation_revision_changes/insertItemTranslationRevisionChangePromoProduction';
import { insertItemTranslationRevisionChangePromoReview } from './resolvers/item_translation_revision_changes/insertItemTranslationRevisionChangePromoReview';
import { deleteItemTranslationRevisionChangesForItem } from './resolvers/item_translation_revision_changes/deleteItemTranslationRevisionChangesForItem';
import { getItemTranslationRevisionsGivenLocaleCode } from './resolvers/item_translation_revisions/getItemTranslationRevisionsGivenLocaleCode';
import { getItemTranslationRevisions } from './resolvers/item_translation_revisions/getItemTranslationRevisions';
import { updateItemTranslationRevisionToRetired } from './resolvers/item_translation_revisions/updateItemTranslationRevisionToRetired';
import { deleteItemTranslationRevision } from './resolvers/item_translation_revisions/deleteItemTranslationRevision';
import { updateItemTranslationRevisionToProduction } from './resolvers/item_translation_revisions/updateItemTranslationRevisionToProduction';
import { deleteItemTranslationRevisionsForItem } from './resolvers/item_translation_revisions/deleteItemTranslationRevisionsForItem';
import { insertItemTranslationRevision } from './resolvers/item_translation_revisions/insertItemTranslationRevision';
import { updateItemTranslationRevisionToReview } from './resolvers/item_translation_revisions/updateItemTranslationRevisionToReview';
import { insertItemTranslation } from './resolvers/item_translations/insertItemTranslation';
import { insertItemTranslationBlankDraft } from './resolvers/item_translations/insertItemTranslationBlankDraft';
import { getItemTranslationsGivenUniqueKeys } from './resolvers/item_translations/getItemTranslationsGivenUniqueKeys';
import { deleteItemTranslationsForRevision } from './resolvers/item_translations/deleteItemTranslationForRevision';
import { deleteItemTranslationsForItem } from './resolvers/item_translations/deleteItemTranslationsForItem';
import { updateItemTranslation } from './resolvers/item_translations/updateItemTranslation';
import { getItemsForItemsTableProductionOnly } from './resolvers/items/getItemsForItemsTableProductionOnly';
import { getItemTypes } from './resolvers/item_types/getItemTypes';
import { newItem } from './resolvers/items/insertItem';
import { deleteItemByPk } from './resolvers/items/deleteItemByPk';
import { getItemBaseDataByPk } from './resolvers/items/getItemBaseDataByPk';
import { getItemsForItemsTableDevelopmentOnly } from './resolvers/items/getItemsForItemsTableDevelopmentOnly';
import { getItemWithLocaleData } from './resolvers/items/getItemWithLocaleData';
import { getItemsForItemsTableLatest } from './resolvers/items/getItemsForItemsTableLatest';
import { updateItemUpdatedAt } from './resolvers/items/updateItemUpdatedAt';
import { getMaterials } from './resolvers/materials/getMaterials';
import { getLanguageFamilies } from './resolvers/language_families/getLanguageFamilies';
import { getLocales } from './resolvers/locales/getLocales';
import { getMaskShapes } from './resolvers/mask_shapes/getMaskShapes';
import { getStaffUsers } from './resolvers/staff_users/getStaffUsers';
import { getFabricLayer } from './resolvers/getFabricLayer';
import { getItemRevisionChangesAggregates } from './resolvers/getItemRevisionChangesAggregates';
import { getGenders } from './resolvers/genders/getGenders';
import { getFabricTypes } from './resolvers/fabric_types/getFabricTypes';
import { updateItemMaindataRevisionStatePromoteToReview } from './resolvers/item_maindata_revisions/updateItemMaindataRevisionStatePromoteToReview';
import { updateItemMaindataRevisionStateDemoteToDevelopment } from './resolvers/item_maindata_revisions/updateItemMaindataRevisionStateDemoteToDevelopment';
import { getItemMaindataRevisionByRevAndItemIdBarebones } from './resolvers/item_maindata_revisions/getItemMaindataRevisionByRevAndItemIdBB';
import { updateItemMaindataRevisionStatePromoteToProduction } from './resolvers/item_maindata_revisions/updateItemMaindataRevisionStatePromoteToProduction';
import { insertItemMaindataRevisionItemsPage } from './resolvers/item_maindata_revisions/insertItemMaindataRevisionItemsPage';

const resolvers = {
  //**********************************************************************
  //======================================================================
  // Mutation
  //======================================================================
  //**********************************************************************
  Mutation: {
    //--------------------------------------------------
    // base_colours
    //--------------------------------------------------
    //--------------------------------------------------
    // body_segments
    //--------------------------------------------------
    //--------------------------------------------------
    // clothing_segment_data
    //--------------------------------------------------
    insertClothingSegmentData,
    insertNewBlankClothingSegmentData,
    updateClothingSegmentData,
    //--------------------------------------------------
    // clothing_shell_counts
    //--------------------------------------------------
    insertClothingShellCount,
    updateClothingShellCount,
    updateClothingShellCountByClothingShellId,
    //--------------------------------------------------
    // clothing_shell_maindata
    //--------------------------------------------------
    insertClothingShellMaindata,
    insertClothingShellMaindataBarebones,
    updateClothingShellMaindata,
    //--------------------------------------------------
    // clothing_shell_maindata_revision_changes
    //--------------------------------------------------
    insertClothingShellMaindataRevisionChange,
    insertClothingShellMaindataRevisionChangePromoRetired,
    //--------------------------------------------------
    // clothing_shell_maindata_revisions
    //--------------------------------------------------
    insertClothingShellMaindataRevision,
    updateClothingShellMaindataRevisionState,
    updateClothingShellMaindataRevisionToRetired,
    //--------------------------------------------------
    // clothing_shells
    //--------------------------------------------------
    insertEmptyClothingShell,
    updateClothingShellUpdatedAt,
    //--------------------------------------------------
    // companies
    //--------------------------------------------------
    insertCompany,
    updateCompany,
    //--------------------------------------------------
    // company_counts
    //--------------------------------------------------
    insertCompanyCount,
    // Not accessible for the user, it should all be done via another
    // secure function
    // updateCompanyCount,
    //--------------------------------------------------
    // company_translation_revision_changes
    //--------------------------------------------------
    deleteCompanyTranslationRevisionChangesForRevision,
    insertCompanyTranslationRevisionChange,
    insertCompanyTranslationRevisionChangeActUpdate,
    insertCompanyTranslationRevisionChangePromoProduction,
    insertCompanyTranslationRevisionChangePromoRetired,
    insertCompanyTranslationRevisionChangePromoReview,
    //--------------------------------------------------
    // company_translation_revisions
    //--------------------------------------------------
    deleteCompanyTranslationRevision,
    insertCompanyTranslationRevision,
    updateCompanyTranslationRevisionToProduction,
    updateCompanyTranslationRevisionToRetired,
    updateCompanyTranslationRevisionToReview,
    //--------------------------------------------------
    // company_translations
    //--------------------------------------------------
    deleteCompanyTranslationsForRevision,
    insertCompanyTranslation,
    insertCompanyTranslationBlankDraft,
    updateCompanyTranslation,
    //--------------------------------------------------
    // countries
    //--------------------------------------------------
    //--------------------------------------------------
    // fabric_layers
    //--------------------------------------------------
    //--------------------------------------------------
    // fabric_types
    //--------------------------------------------------
    //--------------------------------------------------
    // genders
    //--------------------------------------------------
    //--------------------------------------------------
    // item_maindata
    //--------------------------------------------------
    deleteItemMaindataForItem,
    insertItemMaindata,
    insertItemMaindataBarebones,
    updateItemMaindata: (_, { id, changes, itemId, countsId }) =>
      updateItemMaindata(id, changes, itemId, countsId),
    //--------------------------------------------------
    // item_maindata_revision_changes
    //--------------------------------------------------
    deleteItemMaindataRevisionChangesForItem,
    insertItemMaindataRevisionChange,
    insertItemMaindataRevisionChangePromoRetired,
    //--------------------------------------------------
    // item_maindata_revisions
    //--------------------------------------------------
    deleteItemMaindataRevisionsForItem,
    insertItemMaindataRevision,
    insertItemMaindataRevisionItemsPage: (_, { id }) =>
      insertItemMaindataRevisionItemsPage(id),
    updateItemMaindataRevisionState: (_, { id }) =>
      updateItemMaindataRevisionState(id),
    updateItemMaindataRevisionStatePromoteToReview: (_, { id, userId }) =>
      updateItemMaindataRevisionStatePromoteToReview(id, userId),
    updateItemMaindataRevisionStateDemoteToDevelopment: (_, { id, userId }) =>
      updateItemMaindataRevisionStateDemoteToDevelopment(id, userId),
    updateItemMaindataRevisionStatePromoteToProduction: (_, { id, userId }) =>
      updateItemMaindataRevisionStatePromoteToProduction(id, userId),
    // updateItemMaindataRevisionStatePromoteNewRevision
    updateItemMaindataRevisionToRetired,
    //--------------------------------------------------
    // item_translation_revision_changes
    //--------------------------------------------------
    deleteItemTranslationRevisionChangesForRevision,
    deleteItemTranslationRevisionChangesForItem,
    insertItemTranslationRevisionChange,
    insertItemTranslationRevisionChangePromoProduction,
    insertItemTranslationRevisionChangePromoRetired,
    insertItemTranslationRevisionChangePromoReview,
    //--------------------------------------------------
    // item_translation_revisions
    //--------------------------------------------------
    deleteItemTranslationRevision,
    deleteItemTranslationRevisionsForItem,
    insertItemTranslationRevision,
    updateItemTranslationRevisionToProduction,
    updateItemTranslationRevisionToRetired,
    updateItemTranslationRevisionToReview,
    //--------------------------------------------------
    // item_translations
    //--------------------------------------------------
    deleteItemTranslationsForRevision,
    deleteItemTranslationsForItem,
    insertItemTranslation,
    insertItemTranslationBlankDraft,
    updateItemTranslation,
    //--------------------------------------------------
    // item_types
    //--------------------------------------------------
    //--------------------------------------------------
    // items
    //--------------------------------------------------
    deleteItemByPk,
    newItem,
    updateItemUpdatedAt,
    //--------------------------------------------------
    // language_families
    //--------------------------------------------------
    //--------------------------------------------------
    // locales
    //--------------------------------------------------
    //--------------------------------------------------
    // mask_shapes
    //--------------------------------------------------
    //--------------------------------------------------
    // materials
    //--------------------------------------------------
    //--------------------------------------------------
    // staff_users
    //--------------------------------------------------
    //--------------------------------------------------
    // other
    //--------------------------------------------------
  },
  //**********************************************************************
  //======================================================================
  // Query
  //======================================================================
  //**********************************************************************
  Query: {
    hello: () => {
      return 'Hello from Apollo Server';
    },
    //--------------------------------------------------
    // base_colours
    //--------------------------------------------------
    getBaseColours,
    //--------------------------------------------------
    // body_segments
    //--------------------------------------------------
    getBodySegments,
    //--------------------------------------------------
    // clothing_segment_data
    //--------------------------------------------------
    //--------------------------------------------------
    // clothing_shell_counts
    //--------------------------------------------------
    //--------------------------------------------------
    // clothing_shell_maindata
    //--------------------------------------------------
    //--------------------------------------------------
    // clothing_shell_maindata_revision_changes
    //--------------------------------------------------
    getClothingShellMaindataRevisionChanges: (_, { id, limit, offset }) =>
      getClothingShellMaindataRevisionChanges(id, limit, offset),
    getClothingShellMaindataRevisionChangesPromosOnly: (
      _,
      { clothingShellId, revision, limit, offset }
    ) =>
      getClothingShellMaindataRevisionChangesPromosOnly(
        clothingShellId,
        revision,
        limit,
        offset
      ),
    //--------------------------------------------------
    // clothing_shell_maindata_revisions
    //--------------------------------------------------
    getAllClothingShellMaindataRevisionsForClothingShell: (
      _,
      { clothingShellId, limit, offset }
    ) =>
      getAllClothingShellMaindataRevisionsForClothingShell(
        clothingShellId,
        limit,
        offset
      ),
    getClothingShellMaindataRevisionByRevAndClothingShellId: (
      _,
      { clothingShellId, revision }
    ) =>
      getClothingShellMaindataRevisionByRevAndClothingShellId(
        clothingShellId,
        revision
      ),
    getRevisionsForClothingShellBarebones: (_, { id }) =>
      getRevisionsForClothingShellBarebones(id),
    //--------------------------------------------------
    // clothing_shells
    //--------------------------------------------------
    getClothingShell,
    getClothingShellBaseDataByPk: (_, { id }) =>
      getClothingShellBaseDataByPk(id),
    getClothingShellsForClothingShellsTableLatest: (_, { limit, offset }) =>
      getClothingShellsForClothingShellsTableLatest(limit, offset),
    getClothingShellsListBB: (_, { limit, offset }) =>
      getClothingShellsListBB(limit, offset),
    getItemClothingShell,
    //--------------------------------------------------
    // companies
    //--------------------------------------------------
    getCompanies: (_, { limit, offset }) => getCompanies(limit, offset),
    getCompaniesListBB: (_, { limit, offset }) =>
      getCompaniesListBB(limit, offset),
    getCompany: (_, { id }) => getCompany(id),
    //--------------------------------------------------
    // company_counts
    //--------------------------------------------------
    //--------------------------------------------------
    // company_translation_revision_changes
    //--------------------------------------------------
    getCompanyTranslationRevisionChanges: (_, { companyId, limit, offset }) =>
      getCompanyTranslationRevisionChanges(companyId, limit, offset),
    getCompanyTranslationRevisionChangesForLocale: (
      _,
      { companyId, localeCode, limit, offset }
    ) =>
      getCompanyTranslationRevisionChangesForLocale(
        companyId,
        localeCode,
        limit,
        offset
      ),
    getCompanyTranslationRevisionChangesPromosOnly: (
      _,
      { companyId, localeCode, revision }
    ) =>
      getCompanyTranslationRevisionChangesPromosOnly(
        companyId,
        localeCode,
        revision
      ),
    //--------------------------------------------------
    // company_translation_revisions
    //--------------------------------------------------
    getCompanyTranslationRevisions: (_, { id }) =>
      getCompanyTranslationRevisions(id),
    getCompanyTranslationRevisionsByLocaleCode: (
      _,
      { companyId, localeCode }
    ) => getCompanyTranslationRevisionsByLocaleCode(companyId, localeCode),
    //--------------------------------------------------
    // company_translations
    //--------------------------------------------------
    getCompanyTranslationsGivenUniqueKeys: (
      _,
      { revision, companyId, localeCode }
    ) => getCompanyTranslationsGivenUniqueKeys(revision, companyId, localeCode),
    //--------------------------------------------------
    // countries
    //--------------------------------------------------
    getCountries: (_, { limit, offset }) => getCountries(limit, offset),
    //--------------------------------------------------
    // fabric_layers
    //--------------------------------------------------
    getFabricLayersListBB: (_, { limit, offset, fabricLayerTypes }) =>
      getFabricLayersListBB(limit, offset, fabricLayerTypes),
    //--------------------------------------------------
    // fabric_types
    //--------------------------------------------------
    getFabricTypes,
    //--------------------------------------------------
    // genders
    //--------------------------------------------------
    getGenders,
    //--------------------------------------------------
    // item_maindata
    //--------------------------------------------------
    //--------------------------------------------------
    // item_maindata_revision_changes
    //--------------------------------------------------
    getItemMaindataRevisionChanges: (_, { id, limit }) =>
      getItemMaindataRevisionChanges(id, limit),
    getItemMaindataRevisionChangesPromosOnly: (_, { itemId, revision }) =>
      getItemMaindataRevisionChangesPromosOnly(itemId, revision),
    //--------------------------------------------------
    // item_maindata_revisions
    //--------------------------------------------------
    getItemMaindataRevision,
    getItemMaindataRevisionByRevAndItemIdBarebones: (_, { itemId, revision }) =>
      getItemMaindataRevisionByRevAndItemIdBarebones(itemId, revision),
    getItemMaindataRevisionWithItemMaindataByRevAndItemId: (
      _,
      { itemId, revision }
    ) =>
      getItemMaindataRevisionWithItemMaindataByRevAndItemId(itemId, revision),
    getLatestProdItemMaindataRevByItemId: (_, { itemId }) =>
      getLatestProdItemMaindataRevByItemId(itemId),
    getNumberOfUniqueItemsForClothingShell,
    getNumberOfUniqueProdItemsForCompany,
    getRevisionsForItemBarebones: (_, { id }) =>
      getRevisionsForItemBarebones(id),
    getTopXUniqueProdItemsForClothingShellBB: (_, { id, limit, offset }) =>
      getTopXUniqueProdItemsForClothingShellBB(id, limit, offset),
    getTopXUniqueProdItemsForCompanyBB: (_, { id, limit, offset }) =>
      getTopXUniqueProdItemsForCompanyBB(id, limit, offset),
    getUniqueItemMaindataRevsForBrandProdOnly: (_, { id }) =>
      getUniqueItemMaindataRevsForBrandProdOnly(id),
    getUniqueProdItemsForCompany,
    //--------------------------------------------------
    // item_translation_revision_changes
    //--------------------------------------------------
    getItemTranslationRevisionChanges: (_, { id, limit, offset }) =>
      getItemTranslationRevisionChanges(id, limit, offset),
    getItemTranslationRevisionChangesForLocale: (
      _,
      { itemId, localeCode, limit, offset }
    ) =>
      getItemTranslationRevisionChangesForLocale(
        itemId,
        localeCode,
        limit,
        offset
      ),
    getItemTranslationRevisionChangesPromosOnly: (
      _,
      { itemId, localeCode, revision }
    ) =>
      getItemTranslationRevisionChangesPromosOnly(itemId, localeCode, revision),
    //--------------------------------------------------
    // item_translation_revisions
    //--------------------------------------------------
    getItemTranslationRevisions: (_, { id }) => getItemTranslationRevisions(id),
    getItemTranslationRevisionsGivenLocaleCode: (_, { itemId, localeCode }) =>
      getItemTranslationRevisionsGivenLocaleCode(itemId, localeCode),
    //--------------------------------------------------
    // item_translations
    //--------------------------------------------------
    getItemTranslationsGivenUniqueKeys: (_, { revision, itemId, localeCode }) =>
      getItemTranslationsGivenUniqueKeys(revision, itemId, localeCode),
    //--------------------------------------------------
    // item_types
    //--------------------------------------------------
    getItemTypes,
    //--------------------------------------------------
    // items
    //--------------------------------------------------
    getItemBaseDataByPk: (_, { id }) => getItemBaseDataByPk(id),
    getItemsForItemsTableDevelopmentOnly,
    getItemsForItemsTableLatest,
    getItemsForItemsTableProductionOnly,
    getItemWithLocaleData,
    //--------------------------------------------------
    // language_families
    //--------------------------------------------------
    getLanguageFamilies,
    //--------------------------------------------------
    // locales
    //--------------------------------------------------
    getLocales,
    //--------------------------------------------------
    // mask_shapes
    //--------------------------------------------------
    getMaskShapes,
    //--------------------------------------------------
    // materials
    //--------------------------------------------------
    getMaterials,
    //--------------------------------------------------
    // staff_users
    //--------------------------------------------------
    getStaffUsers,
    //--------------------------------------------------
    // other
    //--------------------------------------------------
    getFabricLayer: (_, { id }) => getFabricLayer(id),
    getItemRevisionChangesAggregates: (_, { itemId }) =>
      getItemRevisionChangesAggregates(itemId),
  },
};

export { resolvers };
