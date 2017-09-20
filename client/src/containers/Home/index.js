// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { load } from '../../redux/modules/entities';

type Props = {
  load: Function
};

class Home extends Component<Props> {
  componentDidMount() {
    this.props.load();
  }

  render() {
    // const { fetchStatus, tweets } = this.props;
    return (
      <div>
        hahahaha
      </div>
    );
  }
}

const mapActionToProps = dispatch => ({
  load: bindActionCreators(load, dispatch)
});

export default connect(() => {}, mapActionToProps)(Home);
