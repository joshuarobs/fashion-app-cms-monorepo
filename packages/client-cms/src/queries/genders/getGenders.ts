import { gql } from '@apollo/client';

const Get_Genders = gql`
  query getGenders {
    genders {
      value
      description
    }
  }
`;

export { Get_Genders };
