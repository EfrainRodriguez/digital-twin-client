import React from 'react';
// router
import { BrowserRouter as Router } from 'react-router-dom';
// theme
import ThemeConfig from './theme';

const App = () => (
  <ThemeConfig>
    <Router>
      <h1>Digital Twin App</h1>
    </Router>
  </ThemeConfig>
);

export default App;
