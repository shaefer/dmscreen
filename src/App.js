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
    constructor(props) {
        super(props);
        this.handleClick.bind(this);
    }

    componentDidMount() {
        ReactGA.initialize('UA-122019115-2');
    }

    handleClick(e) {
        console.log("HANDLE CLICK", e.target)
        if ((e.target.id !== 'navigation' && e.target.id !== 'navigationLabel') && !this.refs["navBar"].contains(e.target)  ) {
            console.log("Not a click on label or input for check AND not a click inside nav bar");
            //close it.
            this.refs["navBarControl"].checked = false;
        }
    }
    
    render() {
        return (
            <BrowserRouter>
                <main onClick={(e) => { this.handleClick(e) }}>
                    <input className="nav" type="checkbox" id="navigation" ref="navBarControl" />
                    <label className="nav" id="navigationLabel" htmlFor="navigation"><img src="images/circleMenuIcon.png"/><img src="images/circleMenuIconWhite.png"/></label>
                    <nav className="mainNav" ref="navBar">
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