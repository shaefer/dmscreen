/* eslint-disable no-use-before-define */

import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

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
    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
            <Autocomplete
              multiple
              id="monster_template_selection"
              options={templates}
              disableCloseOnSelect
              getOptionLabel={option => option.name}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8, marginTop: 0, marginLeft: 0 }}
                    checked={selected}
                  />
                  {option.name}
                </React.Fragment>
              )}
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
  { name: 'Fiendish'},
  //{ name: 'Celestial'}
];

export default TemplateSelect;
