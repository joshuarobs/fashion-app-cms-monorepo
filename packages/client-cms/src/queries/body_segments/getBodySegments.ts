import { gql } from '@apollo/client';

const Get_Body_Segments = gql`
  query getBodySegments {
    body_segments(order_by: { id: asc }) {
      id
      name
      body_group
    }
  }
`;

export { Get_Body_Segments };
