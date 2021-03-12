import { gql } from '@apollo/client';

const Get_Base_Colours = gql`
  query getBaseColours {
    base_colours {
      value
      description
    }
  }
`;

export { Get_Base_Colours };
