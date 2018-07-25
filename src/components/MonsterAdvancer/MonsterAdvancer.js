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
        //https://react-select.com/styles
        const customStyles = {
            menu: (base, state) => ({
            ...base,
            marginTop: 0, //eliminates gap between selections and the control.
            }),
            option: (base) => ({
            ...base,
            padding: 3 //adjust for desktop vs how small on mobile makes it hard to select...
            }),
            control: (base) => ({
            ...base,
            height: 40,
            lineHeight: 40
            })
        }

        const options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
        ];

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
                        <div className="co-select-container"><span>Name: </span>
                        <Select 
                            styles={customStyles} 
                            options={options}
                        />
                        </div>
                    </div>
                </div>
                <section>

                </section>
            </main>
        );
    }
}
    
    export default MonsterAdvancer;