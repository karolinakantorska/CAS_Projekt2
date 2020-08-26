import React, { Component } from "react";
import Nav from './Nav';
import Meta from './Meta';

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
