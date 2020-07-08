import React from 'react';
import logo from './logo.svg'
import './App.css'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom' 
import { LoginPage, Home } from './pages/index'
import 'antd/dist/antd.css'

function App() {
  return (
    <div className="App">
      <Route exact path={["/"]} render = { () => <LoginPage/>}/>
      <Route path="/home" render = { () => <Home/>}/>
    </div>
  );
}

export default App;
