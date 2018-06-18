import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import MonsterFinder from './components/MonsterFinder/MonsterFinder'
import MonsterSearch from './components/MonsterSearch/MonsterSearch'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/"           component={MonsterFinder} />
                    <Route       path="/search"     component={MonsterSearch} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App