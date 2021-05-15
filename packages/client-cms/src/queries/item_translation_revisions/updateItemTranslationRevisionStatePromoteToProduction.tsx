import { gql } from '@apollo/client';

const Update_Item_Translation_Revision_State_Promote_To_Production = gql`
  mutation updateItemTranslationRevisionStatePromoteToProduction($id: String!) {
    updateItemTranslationRevisionStatePromoteToProduction(id: $id) {
      id
      item_id
      locale_code
      revision
      state
    }
  }
`;

export { Update_Item_Translation_Revision_State_Promote_To_Production };
