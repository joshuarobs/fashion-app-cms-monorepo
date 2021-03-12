import { gql } from '@apollo/client';

const Get_Locales = gql`
  query getLocales {
    locales {
      code
      name
      language {
        description
      }
      country {
        description
      }
    }
  }
`;

export { Get_Locales };
