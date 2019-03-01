import React from 'react'

import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      marginTop: theme.spacing.unit,
      minWidth: 120,
      width: '100%',
      backgroundColor: 'white',
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
  });

class HitDiceAdvancementSelectMaterial extends React.Component {
    state = {
        hd: '',
        creatureOriginalHd: '',
        labelWidth: 0,
      };
    
      componentDidMount() {
        const initialValue =  (this.props.selectedHitDice) ? this.props.selectedHitDice : this.props.currentHitDice;
        this.setState({
          labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
          hd: initialValue,
          creatureOriginalHd: this.props.currentHitDice
        });
      }

      componentWillReceiveProps(nextProps) {
        const initialValue =  (nextProps.selectedHitDice) ? nextProps.selectedHitDice : nextProps.currentHitDice;
          this.setState({
              hd: initialValue,
              creatureOriginalHd: nextProps.currentHitDice
          });
      }
    
      handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        this.props.onSelect(event)
      };

    render() {
        const { classes } = this.props;
        const hitDiceItems = [...Array(100).keys()];
        return (<FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={ref => {this.InputLabelRef = ref;}} htmlFor="outlined-hd-native-simple">
                Hit Dice
            </InputLabel>
            <Select
                native
                value={this.state.hd}
                onChange={this.handleChange('hd')}
                input={
                    <OutlinedInput
                    name="Hit Dice"
                    labelWidth={this.state.labelWidth}
                    id="outlined-hd-native-simple"
                    />
                }
            >
                {hitDiceItems.map(x => (<option value={x} key={`selectHd${x}`}>{(x === this.state.creatureOriginalHd) ? `Original HD (${x})` : x}</option>))}
            </Select>
        </FormControl>);
    }
}

export default withStyles(styles)(HitDiceAdvancementSelectMaterial);
