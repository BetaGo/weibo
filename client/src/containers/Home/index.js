// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import pullDownRequest from '../../hoc/pullDownRequest';

import Card from '../../components/Home/Card';

import {
  loadHomeTimeline,
  loadNextTimeline,
  loadSinceTimeline
} from '../../redux/modules/entities';
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
    if (this.props.fetchStatus === 'loading') {
      return <div>加载中</div>;
    } else if (this.props.fetchStatus === 'error') {
      return <div>出错啦o(╥﹏╥)o</div>;
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
  max_id: state.entities.max_id,
  since_id: state.entities.since_id,
  tweets: tweetCardInfoSelector(state)
});

const mapActionToProps = dispatch => ({
  loadHomeTimeline: bindActionCreators(loadHomeTimeline, dispatch),
  loadNextTimeline: bindActionCreators(loadNextTimeline, dispatch),
  loadSinceTimeline: bindActionCreators(loadSinceTimeline, dispatch)
});

const HomeWithPullDownRequest = pullDownRequest(() => {})(Home);

// export default connect(mapStateTopProps, mapActionToProps)(Home);
export default connect(mapStateTopProps, mapActionToProps)(
  HomeWithPullDownRequest
);
