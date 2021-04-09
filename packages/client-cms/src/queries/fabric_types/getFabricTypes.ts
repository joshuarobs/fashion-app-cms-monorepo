import { gql } from '@apollo/client';

const Get_Fabric_Types = gql`
  query getFabricTypes {
    getFabricTypes {
      id
      name
    }
  }
`;

export { Get_Fabric_Types };
