import React, {Component} from 'react'

import './Copyright.css'

import PageViewRecorder from '../../components/PageViewRecorder'

class License extends Component {

    componentDidMount() {
        const title = "Copyright and Trademark - by Clever Orc Games";
        document.title=title;
        PageViewRecorder.recordPageView(window.location.pathname + window.location.search, undefined, title);
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
                    <div>Icons made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
                    <div>Icons made by <a href="https://www.flaticon.com/authors/darius-dan" title="Darius Dan">Darius Dan</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                    <div>Icons made by <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                </div>
                <div>
                    All other site content ©2020 Clever Orc Games, ©2009-2020 Monster Advancer
                </div>
            </section>
            
        );
    }
}

export default License;