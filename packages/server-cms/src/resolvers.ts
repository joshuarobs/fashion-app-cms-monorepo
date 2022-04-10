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
import { updateCompanyCountViaCompanyId } from './resolvers/company_counts/updateCompanyCountViaCompanyId';
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
import { insertItemTranslationRevisionAddLocale } from './resolvers/item_translation_revisions/insertItemTranslationRevisionAddLocale';
import { updateItemTranslationRevisionStatePromoteToReview } from './resolvers/item_translation_revisions/updateItemTranslationRevisionStatePromoteToReview';
import { insertItemTranslation } from './resolvers/item_translations/insertItemTranslation';
import { insertItemTranslationBlankDraft } from './resolvers/item_translations/insertItemTranslationBlankDraft';
import { getItemTranslationsGivenUniqueKeys } from './resolvers/item_translations/getItemTranslationsGivenUniqueKeys';
import { deleteItemTranslationsForRevision } from './resolvers/item_translations/deleteItemTranslationForRevision';
import { deleteItemTranslationsForItem } from './resolvers/item_translations/deleteItemTranslationsForItem';
import { updateItemTranslation } from './resolvers/item_translations/updateItemTranslation';
import { getItemsForItemsTableProductionOnly } from './resolvers/items/getItemsForItemsTableProductionOnly';
import { getItemTypes } from './resolvers/item_types/getItemTypes';
import { insertItem } from './resolvers/items/insertItem';
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
import { insertItemTranslationPromoteToReview } from './resolvers/item_translations/insertItemTranslationPromoteToReview';
import { updateItemTranslationRevisionStatePromoteToProduction } from './resolvers/item_translation_revisions/updateItemTranslationRevisionStatePromoteToProduction';
import { insertItemTranslationRevisionPromoteNewRevision } from './resolvers/item_translation_revisions/insertItemTranslationRevisionPromoteNewRevision';
import { deleteItemTranslationRevisionLocalePage } from './resolvers/item_translation_revisions/deleteItemTranslationRevisionLocalePage';
import { addItemMaindataRevisionFixPrompt } from './resolvers/item_maindata_revisions/addItemMaindataRevisionFixPrompt';
import { deleteItemMaindataRevisionAdminEdit } from './resolvers/item_maindata_revisions/deleteItemMaindataRevisionAdminEdit';
import { insertClothingShell } from './resolvers/clothing_shells/insertClothingShell';
import { deleteItem } from './resolvers/items/deleteItem';
import { deleteClothingShell } from './resolvers/clothing_shells/deleteClothingShell';
import { promoteClothingShellMaindataRevisionToReview } from './resolvers/clothing_shell_maindata_revisions/promoteClothingShellMaindataRevisionToReview';
import { demoteClothingShellMaindataRevisionToDevelopment } from './resolvers/clothing_shell_maindata_revisions/demoteClothingShellMaindataRevisionToDevelopment';
import { promoteClothingShellMaindataRevisionToProduction } from './resolvers/clothing_shell_maindata_revisions/promoteClothingShellMaindataRevisionToProduction';
import { promoteClothingShellMaindataRevisionNewRevision } from './resolvers/clothing_shell_maindata_revisions/promoteClothingShellMaindataRevisionNewRevision';
import { deleteCompany } from './resolvers/companies/deleteCompany';
import { getColoursListBB } from './resolvers/colours/getColoursListBB';
import { getColourMixPartsListBB } from './resolvers/colour_mix_parts/getColourMixPartsListBB';
import { getColourMixPartsMultipleByIds } from './resolvers/colour_mix_parts/getColourMixPartsMultipleByIds';
import { getAllColourMixPartsIds } from './resolvers/colour_mix_parts/getAllColourMixPartsIds';
import { insertFabricLayerWithColourMixParts } from './resolvers/fabric_layers/insertFabricLayerWithColourMixParts';
import { getFabricLayerByPk } from './resolvers/fabric_layers/getFabricLayerByPk';
import { deleteFabricLayerAndItsColourMixParts } from './resolvers/fabric_layers/deleteFabricLayerAndItsColourMixParts';
import { getMediaListBB } from './resolvers/media_items/getMediaListBB';
import { getItemAndMediaItemAssociatedForItemId } from './resolvers/item_and_media_item_associated/getItemAndMediaItemAssociatedForItemId';
import { getMediaItemsByIds } from './resolvers/media_items/getMediaItemsByIds';
import { insertAndDeleteManyMediaItemAssociatedByIds } from './resolvers/item_and_media_item_associated/insertAndDeleteManyMediaItemAssociatedByIds';

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
    updateClothingSegmentData: (_, { id, changes }) =>
      updateClothingSegmentData(id, changes),
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
    updateClothingShellMaindata: (_, { id, changes }, context) =>
      updateClothingShellMaindata(id, changes, context),
    //--------------------------------------------------
    // clothing_shell_maindata_revision_changes
    //--------------------------------------------------
    insertClothingShellMaindataRevisionChange,
    insertClothingShellMaindataRevisionChangePromoRetired,
    //--------------------------------------------------
    // clothing_shell_maindata_revisions
    //--------------------------------------------------
    demoteClothingShellMaindataRevisionToDevelopment: (_, { id }, context) =>
      demoteClothingShellMaindataRevisionToDevelopment(id, context),
    insertClothingShellMaindataRevision,
    updateClothingShellMaindataRevisionState,
    updateClothingShellMaindataRevisionToRetired,
    promoteClothingShellMaindataRevisionToReview: (_, { id }, context) =>
      promoteClothingShellMaindataRevisionToReview(id, context),
    promoteClothingShellMaindataRevisionToProduction: (_, { id }, context) =>
      promoteClothingShellMaindataRevisionToProduction(id, context),
    promoteClothingShellMaindataRevisionNewRevision: (_, { id }, context) =>
      promoteClothingShellMaindataRevisionNewRevision(id, context),
    //--------------------------------------------------
    // clothing_shells
    //--------------------------------------------------
    deleteClothingShell: (_, { id }) => deleteClothingShell(id),
    insertEmptyClothingShell,
    insertClothingShell: (_, { name, item_type }, context) =>
      insertClothingShell(name, item_type, context),
    updateClothingShellUpdatedAt,
    //--------------------------------------------------
    // companies
    //--------------------------------------------------
    insertCompany: (_, { name, website_url, is_reseller }) =>
      insertCompany(name, website_url, is_reseller),
    updateCompany: (_, { id, changes }) => updateCompany(id, changes),
    deleteCompany: (_, { id }) => deleteCompany(id),
    //--------------------------------------------------
    // company_counts
    //--------------------------------------------------
    insertCompanyCount,
    // Not accessible for the user, it should all be done via another
    // secure function ????
    // updateCompanyCount
    updateCompanyCountViaCompanyId: (_, { id }) =>
      updateCompanyCountViaCompanyId(id),
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
    insertFabricLayerWithColourMixParts: (
      _,
      { fabric_layer, colour_mix_parts_ids },
      context
    ) =>
      insertFabricLayerWithColourMixParts(
        fabric_layer,
        colour_mix_parts_ids,
        context
      ),
    deleteFabricLayerAndItsColourMixParts: (_, { id }, context) =>
      deleteFabricLayerAndItsColourMixParts(id, context),
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
    updateItemMaindata: (_, { id, changes, itemId, countsId }, context) =>
      updateItemMaindata(id, changes, itemId, countsId, context),
    //--------------------------------------------------
    // item_maindata_revision_changes
    //--------------------------------------------------
    deleteItemMaindataRevisionChangesForItem: (_, { id }) =>
      deleteItemMaindataRevisionChangesForItem(id),
    insertItemMaindataRevisionChange,
    insertItemMaindataRevisionChangePromoRetired,
    //--------------------------------------------------
    // item_maindata_revisions
    //--------------------------------------------------
    addItemMaindataRevisionFixPrompt: (_, { id, name, item_type }, context) =>
      addItemMaindataRevisionFixPrompt(id, name, item_type, context),
    deleteItemMaindataRevisionAdminEdit: (_, { id }, context) =>
      deleteItemMaindataRevisionAdminEdit(id, context),
    deleteItemMaindataRevisionsForItem,
    insertItemMaindataRevision,
    insertItemMaindataRevisionItemsPage: (_, { id }) =>
      insertItemMaindataRevisionItemsPage(id),
    updateItemMaindataRevisionState: (_, { id }) =>
      updateItemMaindataRevisionState(id),
    updateItemMaindataRevisionStatePromoteToReview: (_, { id }, context) =>
      updateItemMaindataRevisionStatePromoteToReview(id, context),
    updateItemMaindataRevisionStateDemoteToDevelopment: (_, { id }, context) =>
      updateItemMaindataRevisionStateDemoteToDevelopment(id, context),
    updateItemMaindataRevisionStatePromoteToProduction: (_, { id }, context) =>
      updateItemMaindataRevisionStatePromoteToProduction(id, context),
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
    deleteItemTranslationRevisionLocalePage: (_, { id }) =>
      deleteItemTranslationRevisionLocalePage(id),
    deleteItemTranslationRevisionsForItem,
    // insertItemTranslationRevision,
    insertItemTranslationRevisionAddLocale: (
      _,
      { item_id, locale_code, name },
      context
    ) =>
      insertItemTranslationRevisionAddLocale(
        item_id,
        locale_code,
        name,
        context
      ),
    // updateItemTranslationRevisionToProduction,
    insertItemTranslationRevisionPromoteNewRevision: (
      _,
      { id, locale_code },
      context
    ) =>
      insertItemTranslationRevisionPromoteNewRevision(id, locale_code, context),
    updateItemTranslationRevisionStatePromoteToProduction: (
      _,
      { id },
      context
    ) => updateItemTranslationRevisionStatePromoteToProduction(id, context),
    updateItemTranslationRevisionToRetired,
    updateItemTranslationRevisionStatePromoteToReview: (_, { id, userId }) =>
      updateItemTranslationRevisionStatePromoteToReview(),
    //--------------------------------------------------
    // item_translations
    //--------------------------------------------------
    deleteItemTranslationsForRevision,
    deleteItemTranslationsForItem,
    insertItemTranslation,
    insertItemTranslationBlankDraft,
    insertItemTranslationPromoteToReview: (_, { revision_id }, context) =>
      insertItemTranslationPromoteToReview(revision_id, context),
    updateItemTranslation: (_, { id, changes }, context) =>
      updateItemTranslation(id, changes, context),
    //--------------------------------------------------
    // item_types
    //--------------------------------------------------
    //--------------------------------------------------
    // items
    //--------------------------------------------------
    deleteItemByPk,
    deleteItem: (_, { id }) => deleteItem(id),
    insertItem: (_, { name, item_type }, context) =>
      insertItem(name, item_type, context),
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
    // media_items
    //--------------------------------------------------
    insertAndDeleteManyMediaItemAssociatedByIds: (
      _,
      { item_id, media_item_ids },
      context
    ) =>
      insertAndDeleteManyMediaItemAssociatedByIds(
        item_id,
        media_item_ids,
        context
      ),
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
    // colour_mix_parts
    //--------------------------------------------------
    getColourMixPartsListBB: (_, { limit, offset }) =>
      getColourMixPartsListBB(limit, offset),
    getAllColourMixPartsIds: (_, __, context) =>
      getAllColourMixPartsIds(context),
    getColourMixPartsMultipleByIds: (_, { ids }) =>
      getColourMixPartsMultipleByIds(ids),
    //--------------------------------------------------
    // colours
    //--------------------------------------------------
    getColoursListBB: (_, { limit, offset }) => getColoursListBB(limit, offset),
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
    getFabricLayerByPk: (_, { id }, context) => getFabricLayerByPk(id, context),
    //--------------------------------------------------
    // fabric_types
    //--------------------------------------------------
    getFabricTypes,
    //--------------------------------------------------
    // genders
    //--------------------------------------------------
    getGenders,
    //--------------------------------------------------
    // item_and_media_item_associated
    //--------------------------------------------------
    getItemAndMediaItemAssociatedForItemId: (_, { id, limit, offset }) =>
      getItemAndMediaItemAssociatedForItemId(id, limit, offset),
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
    getItemsForItemsTableLatest: (_, { limit }, context) =>
      getItemsForItemsTableLatest(limit, context),
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
    // media_items
    //--------------------------------------------------
    getMediaListBB: (_, { limit, offset }) => getMediaListBB(limit, offset),
    getMediaItemsByIds: (_, { ids }) => getMediaItemsByIds(ids),
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
