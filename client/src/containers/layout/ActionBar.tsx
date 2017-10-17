import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';

import ActionBar from '../../components/Layout/ActionBar';

import { loadEmotions, EmotionsAction } from '../../redux/modules/emotions';
import { loadUserInfo, SessionAction } from '../../redux/modules/session';

// HOC
import fetchDataOnDidMount from '../../hoc/fetchDataOnDidMount';

interface ActionBarProps {
  loadUserInfo: () => (dispatch: Dispatch<SessionAction>) => Promise<void>;
  loadEmotions: () => (dispatch: Dispatch<EmotionsAction>) => Promise<void>;
}
class LayoutActionBar extends React.Component<ActionBarProps> {
  render() {
    const { loadEmotions, loadUserInfo } = this.props;
    const EnhancedComponent = fetchDataOnDidMount(loadEmotions, loadUserInfo)(ActionBar);
    return <EnhancedComponent />;
    // return <ActionBar loadEmotions={loadEmotions} loadUserInfo={loadUserInfo} />;
  }
}

const mapDispatchToProps = (dispatch: Dispatch<EmotionsAction | SessionAction>) => ({
  loadEmotions: bindActionCreators(loadEmotions, dispatch),
  loadUserInfo: bindActionCreators(loadUserInfo, dispatch),
});

export default connect(null, mapDispatchToProps)(LayoutActionBar);
