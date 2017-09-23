import React, { Component } from 'react';
import { Route } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TopBar from './TopBar';
import Home from '../Home';

import { loadEmotions } from '../../redux/modules/emotions';
import { loadUserInfo } from '../../redux/modules/session';

class Layout extends Component {
  componentDidMount() {
    this.props.loadEmotions();
    this.props.loadUserInfo();
  }
  render() {
    return (
      <div>
        <TopBar />
        <Route path="/home" component={Home} />
      </div>
    );
  }
}

export default connect(undefined, dispatch => ({
  loadEmotions: bindActionCreators(loadEmotions, dispatch),
  loadUserInfo: bindActionCreators(loadUserInfo, dispatch)
}))(Layout);
