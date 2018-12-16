import typeDefs from './schema.graphql';
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
      const suggestions =  await axios({
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

      return suggestions.map(({value, data}) => {
        const {
          postal_code,
          country,
          region,
          city,
          area,
          street,
          house,
          block,
          flat
        } = data;

        return {
          id: `Address:${value}`,
          postalCode: postal_code || '',
          country: country || '',
          region: region || '',
          locality: city || '',
          area: area || '',
          street: street || '',
          house: house || '',
          block: block || '',
          flat: flat || ''
        };
      });
    }
  }
};

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

async function fetchQuery(operation, variableValues) {
  return await graphql(executableSchema, operation.text, null, null, variableValues);
}

export default fetchQuery;
