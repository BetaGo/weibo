import * as React from 'react';
import { Route } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { withStyles, StyleRules, StyleRulesCallback } from 'material-ui/styles';

import TopBar from './TopBar';
import Home from '../Home';

import { loadEmotions, EmotionsAction } from '../../redux/modules/emotions';
import { loadUserInfo, SessionAction } from '../../redux/modules/session';

export interface LayoutProps {
  classes?: {
    content: string
  };
  loadEmotions: () => void;
  loadUserInfo: () => void;
}

const styles: StyleRules | StyleRulesCallback = {
  content: {
    marginTop: 98
  }
};

const mapDispatchToProps = (dispatch: Dispatch<EmotionsAction | SessionAction>) => ({
  loadEmotions: bindActionCreators(loadEmotions, dispatch),
  loadUserInfo: bindActionCreators(loadUserInfo, dispatch),
});

const Layout = (props: LayoutProps) => {
  const {loadEmotions, loadUserInfo, classes} = props;
  return (
    <div>
      <TopBar loadEmotions={loadEmotions} loadUserInfo={loadUserInfo} />
      <div className={classes.content}>
        <Route path="/home" component={Home} />
      </div>
    </div>
  );
};

// export default connect(null, mapDispatchToProps)(Layout);
const connectedLayout = connect(null, mapDispatchToProps)(Layout);
export default withStyles(styles)(connectedLayout);
