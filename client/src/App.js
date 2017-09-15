// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Layout from './layout';
import logo from './logo.svg';

const theme = createMuiTheme();

class App extends Component<any> {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <Layout />
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
