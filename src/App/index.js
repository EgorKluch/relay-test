import React from 'react';
import {Environment, Network, RecordSource, Store} from 'relay-runtime';
import graphql from 'babel-plugin-relay/macro';
import {QueryRenderer} from 'react-relay';
import {fetchQuery} from '../fetchQuery';
import Layout from './Layout';


const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export function App() {
  return <QueryRenderer
    environment={environment}
    query={graphql`
      query AppQuery($userId: ID!) {
        user: node(id: $userId) {
          ...Layout_user
        }
      }
    `}
    variables={{userId: 'User:1'}}
    render={() => <Layout/>}
  />
}
