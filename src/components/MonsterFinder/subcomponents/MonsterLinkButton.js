import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { Button, MuiThemeProvider } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const MonsterLinkButton = (props) => {
    const monsterUrl = props.monsterUrl;
    const theme = createMuiTheme({
        palette: {
          primary: green,
        },
      });
    return (
    <MuiThemeProvider theme={theme}>
        <Button variant="contained" color="primary" href={monsterUrl} style={{marginTop: '0.5em', width:'100%'}}>
            Share Monster 
        </Button>
    </MuiThemeProvider>
    );
};

export default MonsterLinkButton;