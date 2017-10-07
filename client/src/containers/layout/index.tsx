import * as React from 'react';
import { Route } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';

import TopBar from './TopBar';
import Home from '../Home';

import { loadEmotions, EmotionsAction } from '../../redux/modules/emotions';
import { loadUserInfo, SessionAction } from '../../redux/modules/session';

export interface LayoutProps {
  loadEmotions: () => void;
  loadUserInfo: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch<EmotionsAction | SessionAction>) => ({
  loadEmotions: bindActionCreators(loadEmotions, dispatch),
  loadUserInfo: bindActionCreators(loadUserInfo, dispatch),
});

const Layout = (props: LayoutProps) => {
  const {loadEmotions, loadUserInfo} = props;
  return (
    <div>
      <TopBar loadEmotions={loadEmotions} loadUserInfo={loadUserInfo} />
      <Route path="/home" component={Home} />
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Layout);
