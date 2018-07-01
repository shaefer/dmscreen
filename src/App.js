import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import MonsterFinder from './components/MonsterFinder/MonsterFinder'
import MonsterSearch from './components/MonsterSearch/MonsterSearch'
import DMScreen from './components/DMScreen/DMScreen'

import './css/CustomFormCss.css'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/"           component={MonsterFinder} />
                    <Route       path="/search"     component={MonsterSearch} />
                    <Route       path="/dmscreen"     component={DMScreen} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App