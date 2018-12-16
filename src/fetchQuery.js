import typeDefs from './data/schema.graphql';
import {makeExecutableSchema} from 'graphql-tools/dist/index';
import {graphql} from 'graphql';
import axios from 'axios';


const resolvers = {
  Node: {
    __resolveType: ({id}) => {
      const [type] = id.split(':');
      return type;
    }
  },
  Query: {
    node(_, {id}) {
      const [type] = id.split(':');
      if (type === 'User') {
        return {
          id,
          name: 'Егор',
          address: null
        }
      }
    },
    user() {
      return {
        id: 'User:1',
        name: 'Егор',
        address: null
      }
    },
    async addresses(_, {query}) {
      return await axios({
        url: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
        method: 'POST',
        responseType: 'json',
        data: {query, count: 20},
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Token cdd1410a745906c7458825d7ba0702b51d46404e'
        }
      }).then(({data: {suggestions}}) => suggestions);
    }
  }
};

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export async function fetchQuery(operation, variableValues) {
  const result = await graphql(executableSchema, operation.text, null, null, variableValues);
  console.log(result);
  return result;
}