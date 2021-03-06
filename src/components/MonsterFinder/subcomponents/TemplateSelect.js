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
      }
    }
  });

class TemplateSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            templates: []
        }
    }
    // componentDidMount() {
    //     const initialValue =  (this.props.selectedTemplates) ? this.props.selectedTemplates : '';
    //     if  (initialValue) {
    //         this.setState({
    //             templates: initialValue.map(template => templates.find(x => x.value === template)),
    //         });
    //     }
    // }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const initialValue =  (nextProps.selectedTemplates) ? nextProps.selectedTemplates : '';
        if  (initialValue) {
            const mappedTemplates = initialValue.map(template => templates.find(x => x.value === template));
            this.setState({
                templates: mappedTemplates,
            });
        } else {
            this.setState({
                templates: [],
            });
        }
    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
            <Autocomplete
              multiple
              value={this.state.templates}
              options={templates}
              disableCloseOnSelect
              getOptionLabel={option => option.name}
              onChange={(event, val) => {
                this.props.onSelect(val.map(x => x.value));
              }}
              renderOption={(option, state) => {
                const selected = state.selected;
                return (<React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8, marginTop: 0, marginLeft: 0 }}
                    checked={selected||Boolean(this.state.templates.find(x => x.value === option.value))}
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
                  readOnly
                />
                
              )}
            />
            </MuiThemeProvider>
          );
    }
}

const templates = [
  { name: 'Fiendish', value: 'Fiendish'},
  //{ name: 'Celestial', value: 'Celestial'}
];

export default TemplateSelect;
