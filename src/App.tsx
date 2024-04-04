import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Garage from './components/Garage';
import Winners from './components/Winners';

const App = () => {
  return (
      <Router>
        <Switch>
          <Route path="/garage" Component={Garage} />
          <Route path="/winners" Component={Winners} />
        </Switch>
      </Router>
  );
};

export default App;