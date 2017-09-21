// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Card from '../../components/Home/Card';

import { load } from '../../redux/modules/entities';
import { tweetCardInfoSelector } from './selector';

type Props = {
  load: Function,
  fetchStatus: string,
  tweets: Array<Object>
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
      return tweets.map(tweet => <Card {...tweet} />);
    }
  };

  render() {
    const { fetchStatus, tweets } = this.props;
    return (
      <div>
        {this.getHome()}
      </div>
    );
  }
}

const mapStateTopProps = state => ({
  fetchStatus: state.entities.fetchStatus,
  tweets: tweetCardInfoSelector(state)
});

const mapActionToProps = dispatch => ({
  load: bindActionCreators(load, dispatch)
});

export default connect(mapStateTopProps, mapActionToProps)(Home);
