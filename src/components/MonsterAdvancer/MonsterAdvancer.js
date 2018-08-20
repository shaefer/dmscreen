import React, {Component} from 'react'
import { connect } from 'react-redux'
import './MonsterAdvancer.css'

import ReactGA from 'react-ga';

import Select from 'react-select'

import Monsters from './Monsters'
import Monster35Display from './Monster35Display'
import ClassLevelSelect from '../CleverSelect/ClassLevelSelect'

import {fetchMonsterAdvancer35v2} from '../../action-creators'

class MonsterAdvancer extends Component {
    
    constructor() {
        super();
        this.getValuesButton = this.getValuesButton.bind(this);
        this.changeField = this.changeField.bind(this);
        this.classLevelsChanged = this.classLevelsChanged.bind(this);
        this.state = {
            monsterName: null,
            size: null,
            hd: null,
            str: "",
            dex: "",
            con: "",
            int: "",
            wis: "",
            cha: "",
            templates: [],
            levels: null
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("WILL RECEIVE", nextProps, this.state);
        const monster = nextProps.monsterAdvancer.monster;
        this.setState({
            monsterName: this.state.monsterName,
            size: monster.size,
            hd: monster.racialHd,
            str: monster.strBase,
            dex: monster.dexBase,
            con: monster.conBase,
            int: monster.intelBase,
            wis: monster.wisBase,
            cha: monster.chaBase,
            templates: this.state.templates,
            levels: this.state.levels
        });
    }

    componentDidMount() {
        const title = "Monster Advancer 3.5 v2 - by Clever Orc Games";
        document.title=title;
        ReactGA.pageview(window.location.pathname + window.location.search, undefined, title);
    }

    classLevelsChanged(classLevels) {
        console.log("classLevelsChanged", this);
        if (!classLevels || classLevels.length <= 0) return;
        //this.state.levels = classLevels.map(x => x.className+x.level);
        const newState = {
            ...this.state,
            levels : classLevels.map(x => x.className+x.level)
        }
        this.setState(newState);
    }

    pushField(fields, data, name, isMulti = false) {
        if (data[name]) fields.push({name: name, value: data[name], isMulti: isMulti});
    }

    getValuesButton() {
        console.log(this.state);
        const monsterFields = this.state;
        if (!monsterFields.monsterName) return;
        let fields = [];
        this.pushField(fields, monsterFields, "hd");
        this.pushField(fields, monsterFields, "size");
        this.pushField(fields, monsterFields, "str");
        this.pushField(fields, monsterFields, "dex");
        this.pushField(fields, monsterFields, "con");
        this.pushField(fields, monsterFields, "int");
        this.pushField(fields, monsterFields, "wis");
        this.pushField(fields, monsterFields, "cha");
        this.pushField(fields, monsterFields, "templates", true);
        this.pushField(fields, monsterFields, "levels", true);
        this.props.fetchMonsterAdvancer35v2(monsterFields.monsterName, fields);
    }

    changeField(e, fieldName) {
        let value = (e.value) ? e.value : e.target.value;
        console.log("changeField", fieldName, value, this);
        const newState = {
            ...this.state,
            [fieldName] : value
        }
        console.log("newState changeField", newState);
        this.setState(newState);
    }

    changeMultiField(e, fieldName) {
        this.setState({
            ...this.state,
            [fieldName] :  e.map(x => x.value)
        });
    }

    //https://github.com/JedWatson/react-select/issues/1322 Setting Height
    render() {
        //https://react-select.com/styles
        const customStyles = (width = 250, height = 38) => {
            return {
                menu: (base, state) => ({
                ...base,
                marginTop: 0, //eliminates gap between selections and the control.
                }),
                option: (base) => ({
                ...base,
                padding: 4 //adjust for desktop vs how small on mobile makes it hard to select...
                }),
                container: (base) => ({
                    ...base,
                    display:'inline-block',
                    width: width,
                }),
                valueContainer: (base) => ({
                    ...base,
                    minHeight: height,
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
        const templateOptions = [
            {value: "Dire", label: "Dire"},
            {value: "Fiendish", label: "Fiendish"},
            {value: "Black Half-Dragon", label: "Half-Dragon (Black)"}
        ];
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

        const monsterDisplay = (this.props.monsterAdvancer.monster.name) 
            ? Monster35Display(this.props.monsterAdvancer.monster)
            : <span>No Monster Currently Generated</span>
        //https://codepen.io/MichaelArestad/pen/ohLIa Good style idea for input boxes

        console.log(templateOptions, this.state.templates)
        
        console.log("Monster Render", this.props.monsterAdvancer.monster, this.state);
        const hdOptions = buildNumList(0,100).map(x => ({value: x, label: x}));
        return (
            <main className="monsteradvancer">
                <div className="versionChoice">
                    <div>Choose a version:</div>
                    <img className="oglImage" src="images/OGL-Logo.jpg"/>
                    <img className="pfImage" src="images/pathfinder-rpg-compatibility-logo.png"/>
                </div>
                <section>
                    <button type="button" className="generateButton greenAwesome" onClick={this.getValuesButton}>Generate Monster</button>
                </section>
                <section className="monsterCustomization">
                    <div className="co-panel monsterFields">
                        <div className="co-panel-header">Monster Customization</div>
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
                                    styles={customStyles(80)} 
                                    placeholder={0}
                                    options={hdOptions}
                                    onChange={(e) => this.changeField(e, 'hd')}
                                    value={hdOptions.find(x => x.value == this.state.hd)}
                                />
                                <span>Size: </span>
                                <Select 
                                    ref="size"
                                    styles={customStyles(150)} 
                                    placeholder={"Original"}
                                    options={sizeOptions}
                                    onChange={(e) => this.changeField(e, 'size')}
                                    value={sizeOptions.find(x => x.label == this.state.size)}
                                />
                            </div>
                            <div className="co-select-container">
                                <div className="valuePair">
                                    <label>Str</label>
                                    <input className="co-awesome" type="number" max="99" min="0" pattern="\d*" onChange={(e) => this.changeField(e, 'str')}
                                            value={this.state.str}/>
                                </div>
                                <div className="valuePair">
                                    <label>Dex</label>
                                    <input className="co-awesome" type="number" max="99" min="0" pattern="\d*" onChange={(e) => this.changeField(e, 'dex')}
                                    value={this.state.dex}/>
                                </div>
                                <div className="valuePair">
                                    <label>Con</label>
                                    <input className="co-awesome" type="number" max="99" min="0" pattern="\d*" onChange={(e) => this.changeField(e, 'con')}
                                    value={this.state.con}/>
                                </div>
                                <div className="valuePair">
                                    <label>Int</label>
                                    <input className="co-awesome" type="number" max="99" min="0" pattern="\d*" onChange={(e) => this.changeField(e, 'int')}
                                    value={this.state.int}/>
                                </div>
                                <div className="valuePair">
                                    <label>Wis</label>
                                    <input className="co-awesome" type="number" max="99" min="0" pattern="\d*" onChange={(e) => this.changeField(e, 'wis')}
                                    value={this.state.wis}/>
                                </div>
                                <div className="valuePair">
                                    <label>Cha</label>
                                    <input className="co-awesome" type="number" max="99" min="0" pattern="\d*" onChange={(e) => this.changeField(e, 'cha')}
                                    value={this.state.cha}/>
                                </div>
                            </div>
                            <div className="co-select-container">
                                <label>Templates</label>
                                <Select 
                                    ref="templates"
                                    styles={customStyles(250)} 
                                    options={templateOptions}
                                    isMulti
                                    onChange={(e) => this.changeMultiField(e, 'templates')}
                                    value={this.state.templates.map(x => {
                                        return {label: x, value: x}
                                    })}
                                />
                            </div>
                            <div className="co-select-container">
                                <ClassLevelSelect onChange={(e) => this.classLevelsChanged(e)} ref="classLevels"/>
                            </div>
                        </div>
                    </div>
                    <div className="co-panel monsterStatBlock">
                        <div className="co-panel-header">Monster Stat Block</div>
                        <div className="co-panel-body">{monsterDisplay}</div>
                    </div>
                </section>
            </main>
        );
    }
}
    
const mapStateToProps = state => state;

export default connect(mapStateToProps, {fetchMonsterAdvancer35v2})(MonsterAdvancer)