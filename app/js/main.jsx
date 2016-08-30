import React from 'react';
import ReactDom from 'react-dom';
import * as Redux from 'redux';
import ReduxThunk from 'redux-thunk';
import {
  Provider,
} from 'react-redux';
import saveGame from '@js/utils/middlewareSaveGame';
import reducers from '@js/reducers';
import App from '@components/App';


const store = Redux.createStore(
  reducers,
  Redux.applyMiddleware(
    ReduxThunk,
    saveGame
  )
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('react')
  );
});
