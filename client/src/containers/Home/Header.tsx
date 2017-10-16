import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';

// Types
import { StoreState } from '../../types';
import { EntitiesAction, loadHomeTimeline } from '../../redux/modules/entities';

// Components
import Header from '../../components/Home/Header';

// HOCs
import fetchOnDidMount from '../../hoc/fetchDataOnDidMount';

interface HeaderProps {
  profile_image_url: string;
  loadHomeTimeline: () => (dispatch: Dispatch<EntitiesAction>) => Promise<void>;
}

const HomeHeader = (
  { profile_image_url, loadHomeTimeline }: HeaderProps
) => {
  const HeaderWithData = () => <Header profile_image_url={profile_image_url} />;
  const EnhancedComponent = fetchOnDidMount(loadHomeTimeline)(HeaderWithData);
  return <EnhancedComponent />;
};

const mapStateTopProps = (state: StoreState) => ({
  profile_image_url: state.session.profile_image_url
});

const mapActionToProps = (dispatch: Dispatch<EntitiesAction>) => ({
  loadHomeTimeline: bindActionCreators(loadHomeTimeline, dispatch)
});

export default connect(mapStateTopProps, mapActionToProps)(HomeHeader);
