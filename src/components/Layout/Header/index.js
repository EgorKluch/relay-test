import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Profile from './Profile';


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
class Header extends React.PureComponent {
  render() {
    const {classes, props} = this.props;

    return (
      <>
        <AppBar>
          <Toolbar>
            <Typography className={classes.toolbarTitle} variant="h6" color="inherit" noWrap>
              Тестовое задание
            </Typography>
            {props ? <Profile user={props.user}/> : null}
          </Toolbar>
        </AppBar>
        <div className={classes.appBarSpacer} />
      </>
    );
  }
}

export default Header;
