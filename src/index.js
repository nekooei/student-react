import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import registerServiceWorker from './registerServiceWorker';
import { create } from 'jss';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, jssPreset } from 'material-ui/styles';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const generateClassName = createGenerateClassName();



const theme = createMuiTheme({
  direction : 'rtl'
});

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <App />
      </JssProvider>
    </MuiThemeProvider>

  </BrowserRouter>
  , document.getElementById('root')
);
registerServiceWorker();
