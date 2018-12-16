import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {createFragmentContainer} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';


const styles = (theme) => {
  return {
    appBarSpacer: {
      ...theme.mixins.toolbar,
      minHeight: theme.mixins.toolbar.minHeight + 24
    },
    toolbarTitle: {
      flex: 1
    }
  }
};

@withStyles(styles)
class Layout extends React.PureComponent {
  render() {
    const {classes, user} = this.props;

    return (
      <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
        <div className={classes.appBarSpacer} />
        <CssBaseline/>
        <AppBar>
          <Toolbar>
            <Typography className={classes.toolbarTitle} variant="h6" color="inherit" noWrap>
              Тестовое задание
            </Typography>
            {'Егор'}
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

export default createFragmentContainer(Layout, {
  user: graphql`
    fragment Layout_user on User {
      id
      name
    }
  `
});
