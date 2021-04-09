import { gql } from '@apollo/client';

const Get_Genders = gql`
  query getGenders {
    getGenders {
      value
      description
    }
  }
`;

export { Get_Genders };
