import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { create } from 'jss';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, jssPreset, MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {deepOrange, purple} from '@material-ui/core/colors';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const generateClassName = createGenerateClassName();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

const theme = createMuiTheme({
  direction : 'rtl',
  palette:{
    primary: deepOrange,
    secondary: purple
  },
  typography:{
    fontFamily: 'vazir'
  }
});

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <Provider store={store}>
          <App />
        </Provider>
      </JssProvider>
    </MuiThemeProvider>

  </BrowserRouter>
  , document.getElementById('root')
);
registerServiceWorker();
