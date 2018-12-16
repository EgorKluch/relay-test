import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import {createRefetchContainer} from 'react-relay';
import AutocompleteInput from '../../common/AutocompleteInput';
import cn from 'cn-decorator';
import compact from 'lodash/compact';
import debounce from 'lodash/debounce';


@cn()
class AddressesField extends React.PureComponent {
  constructor() {
    super();

    this.onInputChange = debounce((query) => {
      this.props.relay.refetch({query});
    }, 100);
  }

  get options() {
    const {addresses} = this.props;

    return addresses.map(({id, country, region, area, locality, street, house, block, flat}) => {
      return {
        value: id,
        label: compact([country, region, area, locality, street, house, block, flat]).join(', ')
      };
    });
  }

  onInputChange(query) {
    this.props.relay.refetch({query});
  }

  render(cn) {
    return (
      <AutocompleteInput
        className={cn()}
        label='Домашний адрес'
        noOptionsText='Введите существующий адрес'
        onInputChange={this.onInputChange}
        options={this.options}
      />
    );
  }
}

export default createRefetchContainer(AddressesField, {
  addresses: graphql`
    fragment AddressesField_addresses on Address
    @relay(plural: true) {
      id
      postalCode
      country
      region
      area
      locality
      street
      house
      block
      flat
    }
  `
}, graphql`  
  query AddressesFieldRefetchQuery($query: String!) {
    addresses(query: $query) {
      ...AddressesField_addresses
    }
  }
`);