import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'

import MonsterFinder from './components/MonsterFinder/MonsterFinder'
import MonsterSearch from './components/MonsterSearch/MonsterSearch'
import DMScreen from './components/DMScreen/DMScreen'
import License from './components/License/License'
import Copyright from './components/Copyright/Copyright'
import MonsterAdvancer from './components/MonsterAdvancer/MonsterAdvancer'
import DungeonMapper from './components/DungeonMapper/DungeonMapper'
import DungeonGraph from './components/DungeonMapper/DungeonGraph'
import DungeonForceGraph from './components/DungeonMapper/DungeonForceGraph'
import DungeonForceGraph2D from './components/DungeonMapper/DungeonForceGraph2D'

import './css/CustomFormCss.css'
import './css/LeftHamburgerNav.css'

import ReactGA from 'react-ga';


class App extends Component {
    constructor(props) {
        super(props);
        this.handleClickOutsideOfNavBarAndNotPartOfMenuButton.bind(this);
    }

    componentDidMount() {
        console.log("Main APP Mounted");
        console.log(process.env.NODE_ENV);
        const env = process.env.NODE_ENV;
        if (env === 'production')
            ReactGA.initialize('UA-122019115-2');
        else {
            console.log(`Environment is: ${env} Google Analytics has been disabled.`)
            window['ga-disable-UA-122019115-2'] = true
        }
    }

    handleClickOutsideOfNavBarAndNotPartOfMenuButton(e) {
        //console.log("HANDLE CLICK", e.target)
        const isNotNavElement = (e.target.id !== 'navigation' && e.target.id !== 'navigationLabel' && e.target.id !== 'navImg');

        if (isNotNavElement && !this.refs["navBar"].contains(e.target)  ) {
            //console.log("Not a click on label or input for check AND not a click inside nav bar");
            this.refs["navBarControl"].checked = false;
        }
    }
    
    render() {
        return (
            <BrowserRouter>
                <main onClick={(e) => { this.handleClickOutsideOfNavBarAndNotPartOfMenuButton(e) }}>
                    <input className="nav" type="checkbox" id="navigation" ref="navBarControl" />
                    <label className="nav" id="navigationLabel" htmlFor="navigation"><img id="navImg" src="images/circleMenuIcon.png" alt="menuIcon1"/><img src="images/circleMenuIconWhite.png" alt="menuIcon2"/></label>
                    <nav className="mainNav" ref="navBar">
                        <ul>
                            <li><a href="https://www.cleverorc.com">Clever Orc Home</a></li>
                            <li><Link to="/">Monster Finder</Link></li>
                            <li><Link to="/search">Monster Search</Link></li>
                            <li><Link to="/dmscreen">DM Screen</Link></li>
                            <li><Link to="/monsteradvancer">Monster Advancer v2 (3.5)</Link></li>
                            <li><Link to="/license">OGL</Link></li>
                            <li><Link to="/copyright">Copyright &amp; Trademark</Link></li>
                        </ul>
                    </nav>
                    <section className="nav">
                    <header className="cleverorc">
                        <div>
                            <span>Clever Orc</span>
                            <a href="https://www.patreon.com/bePatron?c=1882197" data-patreon-widget-type="become-patron-button" className="patreonLink">
                                <img className="patreonButton" src="/images/become_a_patron_button.png" alt="patreonButtonImage"/>
                            </a>
                        </div>
                        
                    </header>
                    <Route exact path="/"           component={MonsterFinder} />
                    <Route       path="/search"     component={MonsterSearch} />
                    <Route       path="/dmscreen"     component={DMScreen} />
                    <Route       path="/monsteradvancer"  component={MonsterAdvancer} />
                    <Route       path="/license"     component={License} />
                    <Route       path="/copyright"  component={Copyright} />
                    <Route exact path="/dungeonMapper"  component={DungeonMapper} />
                    <Route       path="/dungeonMapper/:rooms"  component={DungeonMapper} />
                    <Route exact path="/dungeonGraph"  component={DungeonForceGraph2D} />
                    <Route       path="/dungeonGraph/:rooms"  render={(props) => <DungeonGraph {...props} />} />

                    
                    </section>
                </main>
            </BrowserRouter>
        );
    }
}

export default App