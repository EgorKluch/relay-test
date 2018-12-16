import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = (theme) => {
  return {
    appBarSpacer: {
      ...theme.mixins.toolbar,
      minHeight: theme.mixins.toolbar.minHeight + 24
    }
  }
};

function Layout({classes}) {
  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
      <div className={classes.appBarSpacer} />
      <CssBaseline/>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Тестовое задание
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default withStyles(styles)(Layout);
