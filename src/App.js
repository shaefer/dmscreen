import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'

import MonsterFinder from './components/MonsterFinder/MonsterFinder'
import MonsterSearch from './components/MonsterSearch/MonsterSearch'
import DMScreen from './components/DMScreen/DMScreen'
import License from './components/License/License'

import './css/CustomFormCss.css'
import './css/LeftHamburgerNav.css'

import ReactGA from 'react-ga';


class App extends Component {
    componentDidMount() {
        ReactGA.initialize('UA-122019115-2');
    }
    
    render() {
        return (
            <BrowserRouter>
                <main>
                    <input className="nav" type="checkbox" id="navigation" />
                    <label className="nav" htmlFor="navigation"><img src="images/circleMenuIcon.png"/><img src="images/circleMenuIconWhite.png"/></label>
                    <nav className="mainNav">
                        <ul>
                            <li><a href="https://www.cleverorc.com">Clever Orc Home</a></li>
                            <li><Link to="/">Monster Finder</Link></li>
                            <li><Link to="/search">Monster Search</Link></li>
                            <li><Link to="/dmscreen">DM Screen</Link></li>
                            <li><Link to="/license">OGL</Link></li>
                        </ul>
                    </nav>
                    <section className="nav">
                    <header className="cleverorc"><div>Clever Orc</div></header>
                    <Route exact path="/"           component={MonsterFinder} />
                    <Route       path="/search"     component={MonsterSearch} />
                    <Route       path="/dmscreen"     component={DMScreen} />
                    <Route       path="/license"     component={License} />
                    </section>
                </main>
            </BrowserRouter>
        );
    }
}

export default App