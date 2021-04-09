import { gql } from '@apollo/client';

const Get_Countries = gql`
  query getCountries {
    getCountries {
      value
      description
    }
  }
`;

export { Get_Countries };
