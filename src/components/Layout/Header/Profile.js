import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import {createFragmentContainer} from 'react-relay';


function Profile({user}) {
  return <div>{user.name}</div>;
}

export default createFragmentContainer(Profile, {
  user: graphql`
    fragment Profile_user on User {
      id
      name
    }
  `
})
