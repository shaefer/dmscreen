import React, {Component} from 'react'

import './Copyright.css'

import ReactGA from 'react-ga';

class License extends Component {

    componentDidMount() {
        const title = "Copyright and Trademark - by Clever Orc Games";
        document.title=title;
        ReactGA.pageview(window.location.pathname + window.location.search, undefined, title);
    }

    render() {
        return (
            <section className="legalNotices">
                <div className="cleverorccopyright">
                    Clever Orc Games and Monster Advancer are unregistered Trademarks.
                </div>
                <div className="paizocompatibility">
                    Compatibility with the Pathfinder Roleplaying Game requires the Pathfinder Roleplaying Game from Paizo Inc. See <a href="http://paizo.com/pathfinderRPG">/pathfinderRPG</a> for more information on the Pathfinder Roleplaying Game. Paizo Inc. does not guarantee compatibility, and does not endorse this product.
                </div>
                <div className="paizotrademarks">
                    Pathfinder is a registered trademark of Paizo Inc., and the Pathfinder Roleplaying Game and the Pathfinder Roleplaying Game Compatibility Logo are trademarks of Paizo Inc., and are used under the Pathfinder Roleplaying Game Compatibility License. See <a href="http://paizo.com/pathfinderRPG/compatibility">/pathfinder/rpg/compatibility</a> for more information on the compatibility license.
                </div>
                <div>
                    All other site content ©2018 Clever Orc Games, ©2009-2018 Monster Advancer
                </div>
            </section>
            
        );
    }
}

export default License;