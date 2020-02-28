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
      marginTop: 8,
      minWidth: 120,
      width: '100%',
      backgroundColor: 'white',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  });

class SizeAdvancementSelectMaterial extends React.Component {
    state = {
        size: '',
        creatureOriginalSize: '',
        labelWidth: 0,
      };
    
      componentDidMount() {
        const initialValue =  (this.props.selectedSize) ? this.props.selectedSize : this.props.originalSize;
        this.setState({
          labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
          size: initialValue,
          creatureOriginalSize: this.props.originalSize
        });
      }

      UNSAFE_componentWillReceiveProps(nextProps) {
        const initialValue =  (nextProps.selectedSize) ? nextProps.selectedSize : nextProps.originalSize;
          this.setState({
            size: initialValue,
            creatureOriginalSize: nextProps.originalSize
          });
      }
    
      handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        this.props.onSelect(event) //this probably should pulled from state.
      };

    render() {
        const { classes } = this.props;
        const sizeItems = ['Fine', 'Diminutive', 'Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan', 'Colossal'];
        return (<FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={ref => {this.InputLabelRef = ref;}} htmlFor="outlined-size-native-simple">
                Size
            </InputLabel>
            <Select
                native
                value={this.state.size}
                onChange={this.handleChange('size')}
                input={
                    <OutlinedInput
                    name="Hit Dice"
                    labelWidth={this.state.labelWidth}
                    id="outlined-size-native-simple"
                    />
                }
            >
                {sizeItems.map(x => (<option value={x} key={`selectSize${x}`}>{(x === this.state.creatureOriginalSize) ? `Original Size (${x})` : x}</option>))}
            </Select>
        </FormControl>);
    }
}

export default withStyles(styles)(SizeAdvancementSelectMaterial);
