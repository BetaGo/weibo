import * as React from 'react';
import { Route, Redirect } from 'react-router';
import Paper from 'material-ui/Paper';
// import { withStyles, StyleRules, StyleRulesCallback, WithStyles } from 'material-ui/styles';

// Layout
import LayoutActionBar from '../containers/layout/ActionBar';

// Home
import HomeHeader from '../containers/Home/Header';
import HomeContent from '../containers/Home/Content';

const Layout = () => {
  return (
    <div>
      <Route exact={true} path="/" render={() => <Redirect to="/home" />} />
      <Paper elevation={6}>
        <Route path="/home" component={HomeHeader} />
        <LayoutActionBar />
      </Paper>
      <div>
        <Route path="/home" component={HomeContent} />
      </div>
    </div>
  );
};

export default Layout;
