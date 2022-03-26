import { gql } from '@apollo/client';

const Get_Media_List_BB = gql`
  query getMediaListBB($limit: Int, $offset: Int) {
    getMediaListBB(limit: $limit, offset: $offset) {
      id
      name
      description
      type
      url
      created_at
      updated_at
    }
  }
`;

export { Get_Media_List_BB };
