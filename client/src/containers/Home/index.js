// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Card from '../../components/Home/Card';

import { loadHomeTimeline } from '../../redux/modules/entities';
import { tweetCardInfoSelector } from './selector';

type Props = {
  loadHomeTimeline: Function,
  fetchStatus: string,
  tweets: Array<Object>,
  emotions: Object
};

class Home extends Component<Props> {
  componentDidMount() {
    this.props.loadHomeTimeline();
  }

  getHome = () => {
    if (this.props.fetchStatus !== 'loaded') {
      return <div>加载中</div>;
    } else {
      const { tweets, emotions } = this.props;
      return tweets.map(tweet => (
        <Card key={tweet.id} {...tweet} emotions={emotions} />
      ));
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
  emotions: state.emotions,
  fetchStatus: state.entities.fetchStatus,
  tweets: tweetCardInfoSelector(state)
});

const mapActionToProps = dispatch => ({
  loadHomeTimeline: bindActionCreators(loadHomeTimeline, dispatch)
});

export default connect(mapStateTopProps, mapActionToProps)(Home);
