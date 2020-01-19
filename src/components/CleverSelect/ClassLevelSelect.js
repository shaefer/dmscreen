import React, {Component} from 'react'
import SimpleSelect from 'react-simple-styleable-select'
import './SimpleSelectCustomStyle.css'

class ClassLevelSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classLevels: {},
            undeterminedLevel:1
        }

        this.onChange = this.onChange.bind(this);
        this.setUndeterminedLevel = this.setUndeterminedLevel.bind(this);
        this.setClassForLevel = this.setClassForLevel.bind(this);
        this.setLevelForClass = this.setLevelForClass.bind(this);
        this.selectClass = this.selectClass.bind(this);
        console.log("CLASSLEVELSELECT", props.classes)
        this.classes = props.classes ? props.classes : ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Rogue", "Sorcerer", "Wizard", "Adept", "Aristocrat", "Expert", "Warrior"];
    }

    removeClass(className) {
        const currentClassLevels = this.state.classLevels;
        delete currentClassLevels[className];
        this.setState({
            ...this.state,
            classLevels: currentClassLevels
        });
        this.onChange(currentClassLevels);
    }
    selectClass(e, selectedOption, className) {
        //console.log("SELECTED ARGS", selectedOption, className);
        //console.log("STATE", this.state.classLevels)
        if (!selectedOption && !className) return; //clear on the base select
        const currentClassLevels = this.state.classLevels;
        currentClassLevels[selectedOption.value] = {className:selectedOption.value, level: this.state.undeterminedLevel}
        this.setState({
            ...this.state,
            classLevels: currentClassLevels
        })
        this.onChange(currentClassLevels);
    }
    setClassForLevel(e, className) {
        //console.log("setClassForLevel", e, className);
        const currentClassLevels = this.state.classLevels;
        const level = currentClassLevels[className].level
        currentClassLevels[e.value] = {className:e.value, level:level}
        delete currentClassLevels[className];
        this.setState({
            ...this.state,
            classLevels: currentClassLevels
        })
        this.onChange(currentClassLevels);
    }
    setLevelForClass(e, className, level) {
        //console.log("setLevelForClass", e, className);
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
        this.onChange(currentClassLevels);
    }
    setUndeterminedLevel(val) {
        //console.log("setUndeterminedLevel", e, e.target.value);
        this.setState({
            ...this.state,
            undeterminedLevel: val
        });
        //no class level to change yet...just store until we set one.
    }

    onChange(currentClassLevels) {
        if (this.props.onChange) {
            const classLevelsArray = Object.keys(currentClassLevels).sort().map(x => {
                return currentClassLevels[x];
            });
            this.props.onChange(classLevelsArray);
        }
    } 

    render() {
        const classes = this.classes;
        const allClassOptions = classes.map(x => {return {value: x, label: x}});

        const diff = (a1, a2) => {
            return a1.concat(a2).filter(function(val, index, arr){
                return arr.indexOf(val) === arr.lastIndexOf(val);
            });
        }
        const classesSelected = (!this.state.classLevels) ? [] : Object.keys(this.state.classLevels);
        const classesLeftToChoose = diff(classes, classesSelected);
        const remainingClassOptions = allClassOptions.filter(x => classesLeftToChoose.indexOf(x.value) !== -1); //This ensures that our options are always the same referened objects allowing the autocomplete component to work better.
    
        const levelNumbers = [...Array(20).keys()].map(x => {return {value:x+1, label:x+1}});
        const renderClassLevels = (!this.state.classLevels) ? "" : Object.keys(this.state.classLevels).sort().map((x, cidx) => {
            const obj = this.state.classLevels[x];
            const selectedClassObj = {value:obj.className, label: obj.className};
            const onChangeRemoveOnly = (e, val) => {
                if (!val) this.removeClass(obj.className);
            };
            const levelChange = (e, val, fullOpt) => {
                this.setLevelForClass(e, obj.className, val);
            }
            return (
                <div className="classLevelSelection" key={`class_level_${obj.className}`}>
                    <SimpleSelect
                        options={[selectedClassObj]}
                        defaultValue={selectedClassObj.value}
                        onChange={onChangeRemoveOnly}
                        inline
                        width="70%"
                    />
                    <SimpleSelect 
                        options={levelNumbers} 
                        onChange={levelChange}
                        defaultValue={obj.level}
                        nonCancelable
                        width="50px"
                        inline
                    />
                </div>
            );
        });

        //console.log(this.props)
        const selectLabel = (this.props.hideLabel) ? '' : 'Select A Class...';
        const baseSelect = (
            <React.Fragment>
            <SimpleSelect 
                key={`class_level_base_${remainingClassOptions.map(x => x.value).join("_")}`}
                id={`class_level_base`}
                options={remainingClassOptions} 
                onChange={(e, val, fullOption) => this.selectClass(e, fullOption, val)}
                legendLabel={'Class'}
                defaultValue=""
                width="70%"
                inline
            />
            <SimpleSelect 
                options={levelNumbers} 
                onChange={(e, val, fullOpt) => this.setUndeterminedLevel(val)}
                defaultValue={this.state.undeterminedLevel}
                nonCancelable
                legendLabel="Level"
                width="50px"
                inline
            />
            </React.Fragment>
        );
        const baseSelectOrUsedAllClasses = remainingClassOptions.length > 0 ? baseSelect : ''; //We have to handle all classes have been used and there are no more choices. So we shouldn't display the base at all.
        return (
            <div className="classLevelSelect" id="classLevelSectionContainer">
                <div className="classLevelSelection">
                    {baseSelectOrUsedAllClasses}
                    {renderClassLevels}
                </div>
            </div>
        );
    }
}

export default ClassLevelSelect;