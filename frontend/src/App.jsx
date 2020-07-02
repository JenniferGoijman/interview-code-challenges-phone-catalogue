import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';


import Home from './containers/Home/Home';
import Phone from './containers/Phone/Phone';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/phone/:id' component={Phone} exact />
          <Route path='' component={Home} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
