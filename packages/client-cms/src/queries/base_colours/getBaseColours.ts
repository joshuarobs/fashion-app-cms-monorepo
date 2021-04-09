import { gql } from '@apollo/client';

const Get_Base_Colours = gql`
  query getBaseColours {
    getBaseColours {
      value
      description
    }
  }
`;

export { Get_Base_Colours };
