import React, { Component } from 'react';
import { Route } from 'react-router';
import TopBar from './TopBar';
import Home from '../components/Home';

class Layout extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <Route path="/home" component={Home} />
      </div>
    );
  }
}

export default Layout;
