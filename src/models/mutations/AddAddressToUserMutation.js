import {commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

const mutation = graphql`
  mutation AddAddressToUserMutation($input: AddAddressToUserInput!) {
    addAddressToUser(input: $input) {
      address {
        id
      }
    }
  }
`;

export default function addAddressToUser(environment, query) {
  return commitMutation(environment, {
    mutation,
    variables: {query}
  });
}
