import { gql } from '@apollo/client';

const Update_Company_Translation = gql`
  mutation updateCompanyTranslation(
    $id: uuid!
    $changes: company_translations_set_input
  ) {
    update_company_translations_by_pk(pk_columns: { id: $id }, _set: $changes) {
      id
      revision_id
      is_release
      stylised_name
      short_name
      bio
    }
  }
`;

export { Update_Company_Translation };
