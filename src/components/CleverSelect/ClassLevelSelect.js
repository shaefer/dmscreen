import React, {Component} from 'react'

import Select from 'react-select'

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SelectMU from '@material-ui/core/Select';

import './ClassLevelSelect.css'

class ClassLevelSelect extends Component {
    constructor() {
        super();
        this.state = {
            classLevels: {},
            undeterminedLevel:1
        }

        this.onChange.bind(this);
        this.setUndeterminedLevel.bind(this);
        this.setClassForLevel.bind(this);
        this.setLevelForClass.bind(this);
        this.selectClass.bind(this);
    }

    selectClass(e, selectedOption, className) {
        //console.log("SELECTED ARGS", selectedOption, className);
        //console.log("STATE", this.state.classLevels)
        if (!selectedOption && !className) return; //clear on the base select
        if (!selectedOption && className) {
            //clear on classname
            const currentClassLevels = this.state.classLevels;
            delete currentClassLevels[className];
            this.setState({
                ...this.state,
                classLevels: currentClassLevels
            });
            return;
        }
        if (selectedOption.value !== className) {
            //console.log(`SHOULD SWAP ${className} ENTRY FOR ${selectedOption.value}`)
            const currentClassLevels = this.state.classLevels;
            delete currentClassLevels[className];
        }
        const currentClassLevels = this.state.classLevels;
        currentClassLevels[selectedOption.value] = {className:selectedOption.value, level: this.state.undeterminedLevel}
        this.setState({
            ...this.state,
            classLevels: currentClassLevels
        })
    }
    setClassForLevel(e, className) {
        console.log("setClassForLevel", e, className);
        const currentClassLevels = this.state.classLevels;
        const level = currentClassLevels[className].level
        currentClassLevels[e.value] = {className:e.value, level:level}
        delete currentClassLevels[className];
        this.setState({
            ...this.state,
            classLevels: currentClassLevels
        })
        console.log(this)
    }
    setLevelForClass(e, className, level) {
        console.log("setLevelForClass", e, className);
        const currentClassLevels = this.state.classLevels;
        //const valAsInt = parseInt(e.target.value, 10);
        if (level <= 0) {
            delete currentClassLevels[className];
        } else {
            currentClassLevels[className] = {className:className, level:parseInt(level)}
        }
        this.setState({
            ...this.state,
            classLevels: currentClassLevels
        })
        console.log(this)
    }
    setUndeterminedLevel(e) {
        const val = parseInt(e.target.value);
        console.log("setUndeterminedLevel", e, e.target.value);
        this.setState({
            ...this.state,
            undeterminedLevel: val
        });
        console.log(this)
        //no class level to change yet...just store until we set one.
    }

    onChange(e) {
        console.log("onChange fired", e);
    } 

    render() {
        console.log("RENDER", this.state.classLevels)
        if (this.props.onChange) {
            const classLevelsArray = Object.keys(this.state.classLevels).sort().map(x => {
                return this.state.classLevels[x];
            });
            this.props.onChange(classLevelsArray);
        }
        //if we chain in onChange prop but still fire the built in...which should occur first?
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
        };
        const classes = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Rogue", "Sorcerer", "Wizard", "Adept", "Aristocrat", "Expert", "Warrior"];
        const allClassOptions = classes.map(x => {return {value: x, label: x}});
        //console.log("ALL CLASS OPTIONS", allClassOptions)
        const diff = (a1, a2) => {
            return a1.concat(a2).filter(function(val, index, arr){
                return arr.indexOf(val) === arr.lastIndexOf(val);
            });
        }
        const classesSelected = (!this.state.classLevels) ? [] : Object.keys(this.state.classLevels);
        const classesLeftToChoose = diff(classes, classesSelected);
        const remainingClassOptions = allClassOptions.filter(x => classesLeftToChoose.indexOf(x.value) !== -1); //This ensures that our options are always the same referened objects allowing the autocomplete component to work better.

        //Sort just makes the order obvious and consistent. Having the order not change at all once present might be less jarring. If the user changes one of the classes once they are up there...leave that order by sotring the classLevels in the order they were added regardless of the key itself.
        const levelNumbers = [...Array(20).keys()].map(x => <option value={x+1}>{x+1}</option>)
        const renderClassLevels = (!this.state.classLevels) ? "" : Object.keys(this.state.classLevels).sort().map(x => {
            const obj = this.state.classLevels[x];
            const optionToSet = allClassOptions.find(x => x.value === obj.className);
            //console.log(`BUILD for ${obj.className}`, optionToSet, remainingClassOptions)
                    const levelNumbers = [...Array(20).keys()].map(x => <option value={x+1}>{x+1}</option>)
            return (
                <div className="classLevelSelection" key={`class_level_${obj.className}`}>
                    <Autocomplete
                        id={`class_level_${obj.className}`}
                        options={remainingClassOptions}
                        getOptionLabel={option => option.label}
                        onChange={(e, arg2) => this.selectClass(e, arg2, obj.className)} //this is one where we need to build the special widget (or activate one already built with https://www.npmjs.com/package/react-responsive-modal)
                        style={{ width: '80%', display: 'inline-block' }}
                        value={optionToSet}
                        renderInput={params => (
                            <TextField {...params} label={obj.className} variant="outlined" fullWidth />
                        )}
                    />
                    <select onChange={(e, level) => this.setLevelForClass(e, obj.className, e.target.value)} 
                        value={obj.level} 
                        style={{display:'inline-block', height: 54, width: '20%'}}
                    >
                    {levelNumbers}
                    </select>
                </div>
            );
        });

        //console.log(this.props)
        const selectLabel = (this.props.hideLabel) ? '' : <label>Add Class</label>;
        const placeholder = (this.props.placeholder) ? this.props.placeholder : 'Classes'
        return (
            <div className="classLevelSelect">
                {renderClassLevels}
                <div className="classLevelSelection">
                    {selectLabel}
                    <Autocomplete
                        id={"class_level_base"}
                        options={remainingClassOptions}
                        getOptionLabel={option => option.label}
                        onChange={(e, val) => this.selectClass(e, val)} //this is one where we need to build the special widget (or activate one already built with https://www.npmjs.com/package/react-responsive-modal)
                        style={{ width: '80%', display: 'inline-block', height: '100%' }}
                        value={{ value: "", label: ""}}
                        renderInput={params => (
                            <TextField {...params} label={placeholder} variant="outlined" fullWidth />
                        )}
                    />
                    <select onChange={(e, arg2) => this.setUndeterminedLevel(e, arg2)} 
                        value={this.state.undeterminedLevel} 
                        style={{display:'inline-block', height: 54, width: '20%'}}
                    >
                    {levelNumbers}
                    </select>
                </div>
            </div>
        );
    }
}

export default ClassLevelSelect;