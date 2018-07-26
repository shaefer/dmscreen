import React, {Component} from 'react'
import { connect } from 'react-redux'
import './MonsterAdvancer.css'

import ReactGA from 'react-ga';

import Select from 'react-select'
import Monsters from './Monsters'

import {fetchMonsterAdvancer35v2} from '../../action-creators'

class MonsterAdvancer extends Component {
    
    constructor() {
        super();
        this.getValuesButton = this.getValuesButton.bind(this);
    }

    componentDidMount() {
        const title = "Monster Advancer 3.5 v2 - by Clever Orc Games";
        document.title=title;
        //ReactGA.pageview(window.location.pathname + window.location.search, undefined, title);
    }

    getValuesButton() {
        //rather than refs we could use the onchange event of each to set a local property on this component.
        console.log(this.refs.hd.state.value, this.refs.monsterName.state.value, this.refs.size.state.value);
        let fields = [];
        if (this.refs.hd.state.value) fields.push({name:"hd", value:this.refs.hd.state.value.value})
        if (this.refs.size.state.value) fields.push({name:"size", value:this.refs.size.state.value.value})
        this.props.fetchMonsterAdvancer35v2(this.refs.monsterName.state.value.value, fields)
    }

    render() {
        //https://react-select.com/styles
        const customStyles = (height = 40, width = 250) => {
            return {
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
                height: height,
                lineHeight: height
                }),
                container: (base) => ({
                    ...base,
                    display:'inline-block',
                    width: width
                })
            }
        }
        const buildNumList = (from, through) => {
            var hd = [];
            for (var i = from; i <= through; i++) {
                hd.push(i);
            } 
            return hd;
        }
        const sizeOptions = [
            {value: "F", label: "Fine"},
            {value: "D", label: "Diminutive"},
            {value: "T", label: "Tiny"},
            {value: "S", label: "Small"},
            {value: "M", label: "Medium"},
            {value: "L", label: "Large"},
            {value: "H", label: "Huge"},
            {value: "G", label: "Gargantuan"},
            {value: "C", label: "Colossal"}
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
                        <div className="co-select-container">
                            <span>Name: </span>
                            <Select 
                                ref="monsterName"
                                styles={customStyles()} 
                                options={Monsters.map(x => ({value: x, label: x}))}
                            />
                        </div>
                        <div className="co-select-container">
                            <span>HD: </span>
                            <Select 
                                ref="hd"
                                styles={customStyles(40, 80)} 
                                placeholder={0}
                                options={buildNumList(0,100).map(x => ({value: x, label: x}))}
                            />
                            <span>Size: </span>
                            <Select 
                                ref="size"
                                styles={customStyles(40, 150)} 
                                placeholder={"Original"}
                                options={sizeOptions}
                            />
                        </div>
                    </div>
                </div>
                <section>
                    <button type="button" onClick={this.getValuesButton}>Get Values</button>
                </section>
            </main>
        );
    }
}
    
const mapStateToProps = state => state;

export default connect(mapStateToProps, {fetchMonsterAdvancer35v2})(MonsterAdvancer)