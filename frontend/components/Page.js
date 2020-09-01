import React, { Component } from "react";
import Nav from './Nav';
import Meta from './Meta';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
// render props vs high order components


class Page extends Component {
  
    render() {

        return (
          <div>
            <Meta />
            <Nav />
            <div>{this.props.children}</div>
          </div>
        );
    }

}

export default Page;
