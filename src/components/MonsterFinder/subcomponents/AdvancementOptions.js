import React from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import {
  hitDiceAdvancementAction, sizeAdvancementAction, abilityScoreAdvancementAction, 
  templateAdvancementAction, classLevelAdvancementAction} from '../../../action-creators'

import HitDiceAdvancementSelectMaterial from './HitDiceAdvancementSelectMaterial';
import SizeAdvancementSelectMaterial from './SizeAdvancementSelectMaterial';
import AbilityScoreAdvancementSelectMaterial from './AbilityScoreAdvancementSelectMaterial';

import { MonsterSizes } from '../../PathfinderMonsterAdvancer/AdvancementTools/MonsterSizes';
import TemplateSelect from './TemplateSelect';
import TemplateSingleSelect from './TemplateSingleSelect';
import ClassLevelSelect from '../../CleverSelect/ClassLevelSelect';
import MonsterUrlBuilder from './MonsterUrlBuilder';

class AdvancementOptions extends React.Component {
    constructor(props) {
        super(props);
        this.handleHitDiceSelectChange = this.handleHitDiceSelectChange.bind(this);
        this.handleSizeSelectChange = this.handleSizeSelectChange.bind(this);
        this.handleAbilityScoreSelectChange = this.handleAbilityScoreSelectChange.bind(this);
        this.handleTemplateChange = this.handleTemplateChange.bind(this);
        this.classLevelsChanged = this.classLevelsChanged.bind(this);
        this.parseUrlParams = this.parseUrlParams.bind(this);
        this.classLevelSelectRef = React.createRef();
        this.templateSelectRef = React.createRef();
        this.reset = this.reset.bind(this);
        this.state = {
            defaultTemplates: [],
            defaultClasses: []
        };
    }

    parseTemplates(templatesToParse) {
        if (templatesToParse) {
            const templates = templatesToParse.split(",");
            this.props.templateAdvancementAction(templates);
            return {defaultTemplates: templates};
        }
    }

    parseClasses(classesToParse) {
        if (classesToParse) {
            console.log("CLASSES PARSE FROM URL", classesToParse);
              //allowed inputs classes=Barbarian5,Cleric2
              const classLevels = classesToParse.split(",").map(x => {
                  const nameAndLevelArray = x.split(/(\d+)/).filter(Boolean); //https://stackoverflow.com/a/3370293/1310765
                  return {className: nameAndLevelArray[0], level: Math.min(parseInt(nameAndLevelArray[1]), 20)};
              }); 
              const validatedClasses = classLevels.filter(x => x.className && x.level); //We could filter this list to valid classes but for now that is handled when classes are applied...if no class info is found it won't work...but also won't fail.
            
              if (validatedClasses && validatedClasses.length > 0) {
                  validatedClasses.sort((a, b) => {
                      if (a.className < b.className) return -1;
                      if (a.className > b.className) return 1;
                      return 0;
                  });
                  //expects array of objs [{className: 'Barbarian', level: 5}]
                  this.props.classLevelAdvancementAction(validatedClasses);
                  return {defaultClasses: validatedClasses};
              }
          }
    }

    parseUrlParams() {
        if (this.props.location.search) {
            const searchParams = new URLSearchParams(this.props.location.search);
            this.props.abilityScoreAdvancementAction(parseInt(searchParams.get("str")), 'str');
            this.props.abilityScoreAdvancementAction(parseInt(searchParams.get("dex")), 'dex');
            this.props.abilityScoreAdvancementAction(parseInt(searchParams.get("con")), 'con');
            this.props.abilityScoreAdvancementAction(parseInt(searchParams.get("int")), 'int');
            this.props.abilityScoreAdvancementAction(parseInt(searchParams.get("wis")), 'wis');
            this.props.abilityScoreAdvancementAction(parseInt(searchParams.get("cha")), 'cha');

            const sizeToParse = searchParams.get("size");
            if (sizeToParse) {
                const size = MonsterSizes.find(x => x.abbr === sizeToParse.toUpperCase() || x.size.toLowerCase() === sizeToParse.toLowerCase());
            if (size)
                this.props.sizeAdvancementAction(size.size);
            }
            this.props.hitDiceAdvancementAction(parseInt(searchParams.get("hd")));
            const templatesToParse = searchParams.get('templates') || searchParams.get('template'); //TODO: Should we just write a method to degrade through all the potentially "acceptable" keys for this entry so that people don't have to memorize our url params.
            const templates = this.parseTemplates(templatesToParse);

            const classesToParse = searchParams.get('classes') || searchParams.get('class');
            const classes = this.parseClasses(classesToParse);
            this.setState({
                ...this.state,
                ...templates,
                ...classes
            });
        }
    }

    componentDidMount() {
        this.parseUrlParams();
    }

    handleHitDiceSelectChange(e) {
        this.props.hitDiceAdvancementAction(parseInt(e.target.value));
    }

    handleSizeSelectChange(e) {
        this.props.sizeAdvancementAction(e.target.value);
    } 

    handleTemplateChange(selectedValues) {
        (Array.isArray(selectedValues)) 
        ? this.props.templateAdvancementAction(selectedValues)
        : this.props.templateAdvancementAction([selectedValues])
    }

    handleAbilityScoreSelectChange(e, abilityScore) {
        //where abilityScore is the identifier like 'Str'
        this.props.abilityScoreAdvancementAction(parseInt(e.target.value), abilityScore);
    }

    classLevelsChanged(classLevels) {
        this.props.classLevelAdvancementAction(classLevels);
    }

    reset() {
        this.props.hitDiceAdvancementAction('reset');
        this.props.sizeAdvancementAction('reset');
        this.props.abilityScoreAdvancementAction('resetall');
        this.props.templateAdvancementAction('reset');
        this.props.classLevelAdvancementAction('reset');
        this.classLevelSelectRef.current.reset();
        this.templateSelectRef.current.reset();
    }

    render() {
        let { monster, advancement } = this.props
        const theme = createMuiTheme({
            overrides: {
              MuiOutlinedInput: {
                input: {
                  padding: 8,
                }
              },
            },
            typography: {
              useNextVariants: true,
            },
          });
        const templatesOption = true;
        const templateSelect = (templatesOption) ? <TemplateSelect selectedTemplates={advancement.templates} onSelect={this.handleTemplateChange}/> : '';
        const monsterUrl = MonsterUrlBuilder(monster.statBlock.name, advancement);
        if (this.props.history.location.pathname + this.props.history.location.search != monsterUrl) {
            this.props.history.push(monsterUrl); //This works but I'm not sure it should...we get a warning as this is effectively a setState in a render.
        }
        //TODO: The addition of the redirect above now causes the case where we rerender the defaults for Templates and Classes pushing us even more toward needing a method for those widgets setters or driving them more directly from props.
        return (
            <MuiThemeProvider theme={theme}>
                <HitDiceAdvancementSelectMaterial originalHitDice={monster.statBlock.hitDice} selectedHitDice={advancement.hd} onSelect={this.handleHitDiceSelectChange}/>
                <SizeAdvancementSelectMaterial originalSize={monster.statBlock.size} selectedSize={advancement.size} onSelect={this.handleSizeSelectChange} />
                <AbilityScoreAdvancementSelectMaterial selectedValue={advancement.str} abilityScore={"Str"} onSelect={this.handleAbilityScoreSelectChange}/>
                <AbilityScoreAdvancementSelectMaterial selectedValue={advancement.dex} abilityScore={"Dex"} onSelect={this.handleAbilityScoreSelectChange}/>
                <AbilityScoreAdvancementSelectMaterial selectedValue={advancement.con} abilityScore={"Con"} onSelect={this.handleAbilityScoreSelectChange}/>
                <AbilityScoreAdvancementSelectMaterial selectedValue={advancement.int} abilityScore={"Int"} onSelect={this.handleAbilityScoreSelectChange}/>
                <AbilityScoreAdvancementSelectMaterial selectedValue={advancement.wis} abilityScore={"Wis"} onSelect={this.handleAbilityScoreSelectChange}/>
                <AbilityScoreAdvancementSelectMaterial selectedValue={advancement.cha} abilityScore={"Cha"} onSelect={this.handleAbilityScoreSelectChange}/>
                <TemplateSingleSelect onChange={this.handleTemplateChange} ref={this.templateSelectRef} defaultTemplate={this.state.defaultTemplates[0]} key={this.state.defaultTemplates[0]}/>
                <ClassLevelSelect hideLabel classes={["Barbarian", "Bard", "Cleric"]} onChange={(e) => this.classLevelsChanged(e)} ref={this.classLevelSelectRef} defaultClasses={this.state.defaultClasses} key={this.state.defaultClasses}/>
                <div><a href={monsterUrl}>Share Monster</a></div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, 
  { hitDiceAdvancementAction, sizeAdvancementAction, 
    abilityScoreAdvancementAction, templateAdvancementAction, 
    classLevelAdvancementAction}, null, { withRef: true })(AdvancementOptions)