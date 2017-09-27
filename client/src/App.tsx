import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import store, { history } from './redux/configStore';
import Layout from './containers/layout';

const theme = createMuiTheme();

function App () {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <Layout />
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
