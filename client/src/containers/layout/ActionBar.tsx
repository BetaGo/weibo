import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';

import ActionBar, { ActionBarProps } from '../../components/Layout/ActionBar';

import { loadEmotions, EmotionsAction } from '../../redux/modules/emotions';
import { loadUserInfo, SessionAction } from '../../redux/modules/session';

class LayoutActionBar extends React.Component<ActionBarProps> {
  render() {
    const { loadEmotions, loadUserInfo } = this.props;
    return <ActionBar loadEmotions={loadEmotions} loadUserInfo={loadUserInfo} />;
  }
}

const mapDispatchToProps = (dispatch: Dispatch<EmotionsAction | SessionAction>) => ({
  loadEmotions: bindActionCreators(loadEmotions, dispatch),
  loadUserInfo: bindActionCreators(loadUserInfo, dispatch),
});

export default connect(null, mapDispatchToProps)(LayoutActionBar);
