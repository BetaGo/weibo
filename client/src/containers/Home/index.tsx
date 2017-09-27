import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';

import pullDownRequest from '../../hoc/pullDownRequest';

import Card from '../../components/Home/Card';
import {
  loadHomeTimeline,
  loadNextTimeline,
  loadSinceTimeline,
  EntitiesAction,
} from '../../redux/modules/entities';
import { StoreState } from '../../types';

import { tweetCardInfoSelector } from './selector';

type Props = {
  loadHomeTimeline: () => void,
  fetchStatus: string,
  tweets: Array<Object>,
  emotions: Object
};

class Home extends React.Component<Props> {
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
  }

  render() {
    // const { fetchStatus, tweets } = this.props;
    return (
      <div>
        {this.getHome()}
      </div>
    );
  }
}

const mapStateTopProps = (state: StoreState) => ({
  emotions: state.emotions,
  fetchStatus: state.entities.fetchStatus,
  max_id: state.entities.max_id,
  since_id: state.entities.since_id,
  tweets: tweetCardInfoSelector(state)
});

const mapActionToProps = (dispatch: Dispatch<EntitiesAction>) => ({
  loadHomeTimeline: bindActionCreators(loadHomeTimeline, dispatch),
  loadNextTimeline: bindActionCreators(loadNextTimeline, dispatch),
  loadSinceTimeline: bindActionCreators(loadSinceTimeline, dispatch)
});

const HomeWithPullDownRequest = pullDownRequest(() => { console.log('pull down~'); })(Home);

// export default connect(mapStateTopProps, mapActionToProps)(Home);
export default connect(mapStateTopProps, mapActionToProps)(
  HomeWithPullDownRequest
);
