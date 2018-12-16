import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import cn from 'cn-decorator';
import Header from './Header/index';

import './index.css';

@cn('layout')
class Layout extends React.PureComponent {
  render(cn) {
    const {props} = this.props;

    return (
      <div className={cn()}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
        <CssBaseline/>
        <Header props={props}/>
        <div className={cn('content')}>
          {this.renderContent()}
        </div>
      </div>
    );
  }

  renderContent() {
    const {props, title, Content} = this.props;

    if (!props) {
      return (
        <Typography variant="h4">Загрузка...</Typography>
      );
    }

    return (
      <>
        <Typography variant="h4">{title}</Typography>
        <Content {...this.props}/>
      </>
    );
  }
}

export default Layout;
