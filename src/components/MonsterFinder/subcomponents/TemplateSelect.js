/* eslint-disable no-use-before-define */

import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { template } from '@babel/core';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const theme = createMuiTheme({
    overrides: {
        MuiAutocomplete: {
        root: {
            marginTop: '.5em',
        },
        listbox: {
            padding: 0
        },
        option: {
            paddingTop: 0,
            paddingLeft: 0,
            paddingBottom: 0,
            paddingRight: 0,
        },
        popper: {
            margin: 0,
            //transform3d property is what is pulling that down and away from edge
        }
      }
    }
  });

class TemplateSelect extends React.Component {
    constructor(props) {
        super(props)
        //this.props.onSelect -> wire this through the built in change events.
    }
    state = {
        templates: [],
    };
    componentDidMount() {
        const initialValue =  (this.props.selectedTemplates) ? this.props.selectedTemplates : '';
        this.setState({
          templates: initialValue,
        });
    }
    componentWillReceiveProps(nextProps) {
        const initialValue =  (nextProps.selectedTemplates) ? nextProps.selectedTemplates : '';
        this.setState({
          templates: initialValue,
        });
    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
            <Autocomplete
              multiple
              id="monster_template_selection"
              defaultValue={this.state.templates}
              options={templates}
              disableCloseOnSelect
              getOptionLabel={option => option.name}
              onChange={(event, val) => {
                console.log("ONCHANGE", val)
                this.props.onSelect(val.map(x => x.value));
              }}
              renderOption={(option, state) => {
                console.log("TEMPLATE SELECT", option, state)
                const selected = state.selected;
                return (<React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8, marginTop: 0, marginLeft: 0 }}
                    checked={selected}
                  />
                  {option.name}
                </React.Fragment>
              )}}
              style={{ }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Templates"
                  placeholder="Choose templates..."
                  fullWidth
                />
                
              )}
            />
            </MuiThemeProvider>
          );
    }
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const templates = [
  { name: 'Fiendish', value: 'Fiendish'},
  //{ name: 'Celestial', value: 'Celestial'}
];

export default TemplateSelect;
