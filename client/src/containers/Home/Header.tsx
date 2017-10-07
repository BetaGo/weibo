import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';

import { StoreState } from '../../types';
import { EntitiesAction, loadHomeTimeline } from '../../redux/modules/entities';

import Header from '../../components/Home/Header';

const HomeHeader = (
  { profile_image_url, loadHomeTimeline }: { profile_image_url: string, loadHomeTimeline: () => void}
) => (
  <Header profile_image_url={profile_image_url} loadHomeTimeline={loadHomeTimeline} />
);

const mapStateTopProps = (state: StoreState) => ({
  profile_image_url: state.session.profile_image_url
});

const mapActionToProps = (dispatch: Dispatch<EntitiesAction>) => ({
  loadHomeTimeline: bindActionCreators(loadHomeTimeline, dispatch)
});

export default connect(mapStateTopProps, mapActionToProps)(HomeHeader);
