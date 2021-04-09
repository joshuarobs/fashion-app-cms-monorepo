import { gql } from '@apollo/client';

const Get_Language_Families = gql`
  query getLanguageFamilies {
    getLanguageFamilies {
      value
      description
    }
  }
`;

export { Get_Language_Families };
