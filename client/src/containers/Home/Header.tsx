import * as React from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Home/Header';

const HomeHeader = ({ profile_image_url }: { profile_image_url: string}) => (
  <Header profile_image_url={profile_image_url} />
);

export default connect(state => ({
  profile_image_url: state.session.profile_image_url
}))(HomeHeader);
