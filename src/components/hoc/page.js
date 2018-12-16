import React from 'react';
import Layout from '../Layout/index';


const page = (title) => (Content) => {
  class Page extends React.PureComponent {
    render() {
      return <Layout
        title={title}
        Content={Content}
        {...this.props}
      />
    }
  }

  return Page;
};

export default page;
