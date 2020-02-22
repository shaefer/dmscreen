import React from 'react'
import { connect } from 'react-redux'
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

class AdvancementOptions extends React.Component {
    constructor(props) {
        super(props);
        this.handleHitDiceSelectChange = this.handleHitDiceSelectChange.bind(this);
        this.handleSizeSelectChange = this.handleSizeSelectChange.bind(this);
        this.handleAbilityScoreSelectChange = this.handleAbilityScoreSelectChange.bind(this);
        this.handleTemplateChange = this.handleTemplateChange.bind(this);
        this.classLevelsChanged = this.classLevelsChanged.bind(this);
        this.classLevelSelectRef = React.createRef();
        this.templateSelectRef = React.createRef();
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
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
          const templatesToParse = searchParams.get('templates');
          if (templatesToParse) {
            this.props.templateAdvancementAction(templatesToParse.split(","));
          }
        }
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
                <TemplateSingleSelect onChange={this.handleTemplateChange} ref={this.templateSelectRef}/>
                <ClassLevelSelect hideLabel classes={["Barbarian", "Bard", "Cleric"]} onChange={(e) => this.classLevelsChanged(e)} ref={this.classLevelSelectRef}/>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, 
  { hitDiceAdvancementAction, sizeAdvancementAction, 
    abilityScoreAdvancementAction, templateAdvancementAction, 
    classLevelAdvancementAction}, null, { withRef: true })(AdvancementOptions)