import { gql } from '@apollo/client';

const Get_Media_Items_By_Ids = gql`
  query getMediaItemsByIds($ids: [String!]) {
    getMediaItemsByIds(ids: $ids) {
      id
      name
      url
    }
  }
`;

export { Get_Media_Items_By_Ids };
