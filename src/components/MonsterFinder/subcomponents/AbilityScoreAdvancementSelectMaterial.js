import React from 'react'

import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      marginTop: theme.spacing.unit,
      minWidth: 68,
      maxWidth: 68,
      backgroundColor: 'white',
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
    overrides: {
        MuiOutlinedInput: {
          input: {
            padding: 0,
          },
          root: {
              padding:0
          }
        }}
  });

class AbilityScoreAdvancementSelectMaterial extends React.Component {
    state = {
        stat: '',
        score: 0,
        creatureOriginalScore: '',
        labelWidth: 0,
      };
    
      componentDidMount() {
        const initialValue =  (this.props.selectedValue) ? this.props.selectedValue : this.props.originalValue;
        this.setState({
          labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
          stat: this.props.abilityScore,
          score: initialValue,
          creatureOriginalScore: this.props.originalValue
        });
      }

      componentWillReceiveProps(nextProps) {
        const initialValue =  (nextProps.selectedValue) ? nextProps.selectedValue : nextProps.originalValue;
          this.setState({
              labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
              score: initialValue,
              creatureOriginalScore: nextProps.originalValue
          });
      }
    
      handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        this.props.onSelect(event, this.props.abilityScore.toLowerCase());
      };

    render() {
        const { classes } = this.props;
        const abilityScoreItems = [...Array(100).keys()];
        const fieldId = `outlined-${this.state.stat}-native-simple`
        return (<FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={ref => {this.InputLabelRef = ref;}} htmlFor={fieldId}>
                {this.state.stat}
            </InputLabel>
            <Select
                native
                value={this.state.score}
                onChange={this.handleChange(this.state.stat)}
                input={
                    <OutlinedInput
                    name={this.state.stat}
                    labelWidth={Math.max(this.state.labelWidth, 25)}
                    id={fieldId}
                    />
                }
            >
                {abilityScoreItems.map(x => (<option value={x} key={`select${this.state.stat}${x}`}>{(x === this.state.creatureOriginalScore) ? `${x}*` : x}</option>))}
            </Select>
        </FormControl>);
    }
}

export default withStyles(styles)(AbilityScoreAdvancementSelectMaterial);
