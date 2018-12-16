import React from 'react';
import cn from 'cn-decorator';
import page from '../../hoc/page';
import addAddressToUser from '../../../models/mutations/AddAddressToUserMutation';

import './index.css';
import AddressesField from './AddressesField';

@page('Настройки профиля')
@cn('page')
class ProfilePage extends React.Component {
  render(cn) {
    const {props} = this.props;

    return (
      <div className={cn({'profile-settings': true})}>
        <AddressesField
          className={cn('field')}
          addresses={props.addresses}
        />
      </div>
    );
  }
}

export default ProfilePage;
