import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import './App.css';
import Home from './components/home/Home';
import NavBar from './components/navigation/NavBar';


function App() {
  return (

    <BrowserRouter>
      <div className="App">
          <NavBar/>
          <Switch>
            <Route path="/home" exact render={ () => <Home />}  />
            {/* <Route path="/documentation" exact render={ () => <Documentation />}  /> */}
            <Redirect from="/" to="/home" />
          </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
