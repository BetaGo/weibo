// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import store, { history } from './redux/configStore';
import Layout from './containers/layout';

const theme = createMuiTheme();

class App extends Component<any> {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <MuiThemeProvider theme={theme}>
            <Layout />
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
