import { gql } from '@apollo/client';

const Get_Locales = gql`
  query getLocales {
    getLocales {
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
