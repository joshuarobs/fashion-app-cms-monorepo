import { gql } from '@apollo/client';

const Get_Body_Segments = gql`
  query getBodySegments {
    getBodySegments {
      id
      name
      body_group
    }
  }
`;

export { Get_Body_Segments };
