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
        this.changeField = this.changeField.bind(this);
        this.monsterFields = {
            monsterName: null,
            size: null,
            hd: null,
            str: null,
            dex: null,
            con: null,
            int: null,
            wis: null,
            cha: null
        };
    }

    componentDidMount() {
        const title = "Monster Advancer 3.5 v2 - by Clever Orc Games";
        document.title=title;
        //ReactGA.pageview(window.location.pathname + window.location.search, undefined, title);
    }

    pushField(fields, data, name) {
        if (data[name]) fields.push({name: name, value: data[name]});
    }

    getValuesButton() {
        console.log(this.monsterFields);
        const monsterFields = this.monsterFields;
        //rather than refs we could use the onchange event of each to set a local property on this component.
        if (!this.monsterFields.monsterName) return;
        console.log(this.refs.hd.state.value, this.refs.monsterName.state.value, this.refs.size.state.value);
        let fields = [];
        this.pushField(fields, monsterFields, "hd");
        this.pushField(fields, monsterFields, "size");
        this.pushField(fields, monsterFields, "str");
        this.pushField(fields, monsterFields, "dex");
        this.pushField(fields, monsterFields, "con");
        this.pushField(fields, monsterFields, "int");
        this.pushField(fields, monsterFields, "wis");
        this.pushField(fields, monsterFields, "cha");
        this.props.fetchMonsterAdvancer35v2(monsterFields.monsterName, fields)
    }

    changeField(e, fieldName) {
        const value = (e.value) ? e.value : e.target.value;
        console.log("changeField", fieldName, value, this);
        this.monsterFields[fieldName] = value;
    }

    //https://github.com/JedWatson/react-select/issues/1322 Setting Height
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
                height: height + 'px',
                lineHeight: height + 'px'
                }),
                container: (base) => ({
                    ...base,
                    display:'inline-block',
                    width: width,
                }),
                valueContainer: (base) => ({
                    ...base,
                    height: height,
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
        //https://codepen.io/MichaelArestad/pen/ohLIa Good style idea for input boxes
        return (
            <main className="monsteradvancer">
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
                                onChange={(e) => this.changeField(e, 'monsterName')}
                            />
                        </div>
                        <div className="co-select-container">
                            <span>HD: </span>
                            <Select 
                                ref="hd"
                                styles={customStyles(40, 80)} 
                                placeholder={0}
                                options={buildNumList(0,100).map(x => ({value: x, label: x}))}
                                onChange={(e) => this.changeField(e, 'hd')}
                            />
                            <span>Size: </span>
                            <Select 
                                ref="size"
                                styles={customStyles(40, 150)} 
                                placeholder={"Original"}
                                options={sizeOptions}
                                onChange={(e) => this.changeField(e, 'size')}
                            />
                        </div>
                        <div className="co-select-container">
                            <div className="valuePair">
                                <label>Str</label>
                                <input className="co-awesome" type="number" max="99" min="0" pattern="\d*" onChange={(e) => this.changeField(e, 'str')}/>
                            </div>
                            <div className="valuePair">
                                <label>Dex</label>
                                <input className="co-awesome" type="number" max="99" min="0" pattern="\d*" onChange={(e) => this.changeField(e, 'dex')}/>
                            </div>
                            <div className="valuePair">
                                <label>Con</label>
                                <input className="co-awesome" type="number" max="99" min="0" pattern="\d*" onChange={(e) => this.changeField(e, 'con')}/>
                            </div>
                            <div className="valuePair">
                                <label>Int</label>
                                <input className="co-awesome" type="number" max="99" min="0" pattern="\d*" onChange={(e) => this.changeField(e, 'int')}/>
                            </div>
                            <div className="valuePair">
                                <label>Wis</label>
                                <input className="co-awesome" type="number" max="99" min="0" pattern="\d*" onChange={(e) => this.changeField(e, 'wis')}/>
                            </div>
                            <div className="valuePair">
                                <label>Cha</label>
                                <input className="co-awesome" type="number" max="99" min="0" pattern="\d*" onChange={(e) => this.changeField(e, 'cha')}/>
                            </div>
                        </div>
                    </div>
                </div>
                <section>
                    <button type="button" className="generateButton greenAwesome" onClick={this.getValuesButton}>Get Values</button>
                </section>
            </main>
        );
    }
}
    
const mapStateToProps = state => state;

export default connect(mapStateToProps, {fetchMonsterAdvancer35v2})(MonsterAdvancer)