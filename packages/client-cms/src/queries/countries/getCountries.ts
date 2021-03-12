import { gql } from '@apollo/client';

const Get_Countries = gql`
  query getCountries {
    countries {
      value
      description
    }
  }
`;

export { Get_Countries };
