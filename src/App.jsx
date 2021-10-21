import { useState } from 'react'
import logo from './logo.svg'
import StaticAppBar from './components/navigation/AppBar';
import Portfolio from './components/pages/portfolio';
import Addtoken from './components/pages/addtoken';
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";



export default function App() {
  return (
    <Router>
      <StaticAppBar/>
      <Switch>
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/addtoken" component={Addtoken} />
        <Route exact={true} path="/" component={() => <Redirect to ="/portfolio"/>} />
        <Route path="*" component={() => <Redirect to ="/main"/>} />
      </Switch>


    </Router>
  )
}

