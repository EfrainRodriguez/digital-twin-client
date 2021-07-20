import React from 'react';
// router
import { BrowserRouter as Router } from 'react-router-dom';
// redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './store';
// routes
import { routes, renderRoutes } from './routes';
// theme
import ThemeConfig from './theme';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeConfig>
        <Router>{renderRoutes(routes)}</Router>
      </ThemeConfig>
    </PersistGate>
  </Provider>
);

export default App;
