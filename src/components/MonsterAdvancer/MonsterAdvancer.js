import React, {Component} from 'react'

import './MonsterAdvancer.css'

import ReactGA from 'react-ga';
import Select from 'react-select'

class MonsterAdvancer extends Component {
    
        componentDidMount() {
            const title = "Monster Advancer - by Clever Orc Games";
            document.title=title;
            //ReactGA.pageview(window.location.pathname + window.location.search, undefined, title);
        }
    

        
        render() {
            const options = [
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' }
              ];
              //https://react-select.com/styles#styles
              const customStyle = {
                option: (base, state) => ({
                    ...base,
                    width: 200
                }),
                control: (base) => ({
                    ...base,
                    height: 40,
                    lineHeight: 40,
                    width: 200
                })
              }

            return (
                <main>
                    <div className="versionChoice">
                        <div>Choose a version:</div>
                        <img className="oglImage" src="images/OGL-Logo.jpg"/>
                        <img className="pfImage" src="images/pathfinder-rpg-compatibility-logo.png"/>
                    </div>
                    <div className="co-panel">
                        <div className="co-panel-header">Monster Name</div>
                        <div className="co-panel-body">
                            <span>Name: </span><Select options={options} styles={customStyle} />
                        </div>
                    </div>
                    <section>

                    </section>
                </main>
            );
        }
    }
    
    export default MonsterAdvancer;