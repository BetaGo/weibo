// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { load } from '../../redux/modules/entities';
import { tweetCardInfoSelector } from './selector';

type Props = {
  load: Function,
  fetchStatus: string
};

class Home extends Component<Props> {
  componentDidMount() {
    this.props.load();
  }

  getHome = () => {
    if (this.props.fetchStatus !== 'loaded') {
      return <div>加载中</div>;
    } else {
      const { tweets } = this.props;
      
    }
  }

  render() {
    const { fetchStatus, tweets } = this.props;
    return (
      <div>
        hahahaha
      </div>
    );
  }
}

const mapStateTopProps = state => ({
  // tweets: tweetCardInfoSelector(state)
});

const mapActionToProps = dispatch => ({
  load: bindActionCreators(load, dispatch)
});

export default connect(mapStateTopProps, mapActionToProps)(Home);
