import React, {Component} from 'react'

import Select from 'react-select'

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

    selectClass(e, widget) {
        console.log("selectClass", e.value, widget);
        const currentClassLevels = this.state.classLevels;
        currentClassLevels[e.value] = {className:e.value, level: this.state.undeterminedLevel}
        this.setState({
            ...this.state,
            classLevels: currentClassLevels
        })
        widget.clear
        console.log(this)
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
    setLevelForClass(e, className) {
        console.log("setLevelForClass", e, className);
        const currentClassLevels = this.state.classLevels;
        const valAsInt = parseInt(e.target.value);
        if (!valAsInt) {
            delete currentClassLevels[className];
        } else {
            currentClassLevels[className] = {className:className, level:e.target.value}
        }
        this.setState({
            ...this.state,
            classLevels: currentClassLevels
        })
        console.log(this)
    }
    setUndeterminedLevel(e) {
        console.log("setUndeterminedLevel", e.target.value);
        this.setState({
            ...this.state,
            undeterminedLevel: e.target.value
        });
        console.log(this)
        //no class level to change yet...just store until we set one.
    }

    onChange(e) {
        console.log("onChange fired", e);
    } 

    render() {
        console.log("RENDER", this.state)
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

        const diff = (a1, a2) => {
            return a1.concat(a2).filter(function(val, index, arr){
                return arr.indexOf(val) === arr.lastIndexOf(val);
            });
        }
        const classesSelected = (!this.state.classLevels) ? [] : Object.keys(this.state.classLevels);
        const classOptions = diff(classes, classesSelected).map(x => {return {value: x, label: x}});

        //Sort just makes the order obvious and consistent. Having the order not change at all once present might be less jarring. If the user changes one of the classes once they are up there...leave that order by sotring the classLevels in the order they were added regardless of the key itself.
        const renderClassLevels = (!this.state.classLevels) ? "" : Object.keys(this.state.classLevels).sort().map(x => {
            const obj = this.state.classLevels[x];
            return (
                <div className="classLevelSelection">
                    <Select
                        styles={customStyles(250)}
                        options={classOptions}
                        onChange={(e) => this.setClassForLevel(e, obj.className)}
                        value={{value: obj.className, label: obj.className}}
                    />
                    <input value={obj.level} onChange={(e) => this.setLevelForClass(e, obj.className)}  className="co-awesome"  type="number" max="99" min="0" pattern="\d*"/>
                </div>
            );
        });


        //Remove classOptions that are already in use.
        console.log(this.props)
        return (
            <div className="classLevelSelect">
                {renderClassLevels}
                <label>Add Class</label>
                <Select 
                    styles={customStyles(200)} 
                    options={classOptions}
                    onChange={(e) => this.selectClass(e, this)} //this is one where we need to build the special widget (or activate one already built with https://www.npmjs.com/package/react-responsive-modal)
                    value={null}
                />
                <input onChange={(e) => this.setUndeterminedLevel(e)} value={this.state.undeterminedLevel}  className="co-awesome"  type="number" max="99" min="0" pattern="\d*"/>
            </div>
        );
    }
}

export default ClassLevelSelect;