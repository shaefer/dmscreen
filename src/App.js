import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'

import MonsterFinder from './components/MonsterFinder/MonsterFinder'
import MonsterSearch from './components/MonsterSearch/MonsterSearch'
import DMScreen from './components/DMScreen/DMScreen'

import './css/CustomFormCss.css'
import './css/LeftHamburgerNav.css'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <main>
                    <header className="cleverorc"><div>Clever Orc</div></header>
                    <input className="nav" type="checkbox" id="navigation" />
                    <label className="nav" for="navigation"><img src="/images/Hamburger_icon.png"/></label>
                    <nav className="mainNav">
                        <ul>
                            <li><Link to="/">Monster Finder</Link></li>
                            <li><Link to="/search">Monster Search</Link></li>
                            <li><Link to="/dmscreen">DM Screen</Link></li>
                        </ul>
                    </nav>
                    <section className="nav">
                    <Route exact path="/"           component={MonsterFinder} />
                    <Route       path="/search"     component={MonsterSearch} />
                    <Route       path="/dmscreen"     component={DMScreen} />
                    </section>
                </main>
            </BrowserRouter>
        );
    }
}

export default App