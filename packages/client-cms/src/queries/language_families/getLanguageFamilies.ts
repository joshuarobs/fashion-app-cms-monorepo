import { gql } from '@apollo/client';

const Get_Language_Families = gql`
  query getLanguageFamilies {
    language_families {
      value
      description
    }
  }
`;

export { Get_Language_Families };
