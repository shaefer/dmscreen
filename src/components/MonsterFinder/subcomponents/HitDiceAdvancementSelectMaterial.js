import React from 'react'

import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    formControl: {
      marginTop: theme.spacing.unit,
      width: '100%',
      minWidth: 240,
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
        const initialValue =  (this.props.selectedHitDice) ? this.props.selectedHitDice : this.props.originalHitDice;
        this.setState({
          labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
          hd: initialValue,
          creatureOriginalHd: this.props.originalHitDice
        });
      }

      componentWillReceiveProps(nextProps) {
        const initialValue =  (nextProps.selectedHitDice) ? nextProps.selectedHitDice : nextProps.originalHitDice;
          this.setState({
              hd: initialValue,
              creatureOriginalHd: nextProps.originalHitDice
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
