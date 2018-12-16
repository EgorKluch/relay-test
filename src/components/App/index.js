import React from 'react';
import {Environment, Network, RecordSource, Store} from 'relay-runtime';
import graphql from 'babel-plugin-relay/macro';
import {QueryRenderer} from 'react-relay';
import fetchQuery from '../../models/fetchQuery';
import ProfilePage from '../pages/ProfilePage/index';


const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

function App() {
  return <QueryRenderer
    environment={environment}
    query={graphql`
      query AppQuery($userId: ID!, $query: String!) {
        user: node(id: $userId) {
          ...Profile_user
        }
        addresses (query: $query) {
          ...AddressesField_addresses
        }
      }
    `}
    variables={{userId: 'User:1', query: ''}}
    render={({error, props}) => {
      return <ProfilePage props={props} />;
    }}
  />
}

export default App;
