import React from 'react';
import ReactDom from 'react-dom';
import * as Redux from 'redux';
import {
  Provider,
} from 'react-redux';
import reducers from '@js/reducers';
import App from '@components/App';


const store = Redux.createStore(reducers);

document.addEventListener('DOMContentLoaded', () => {
  ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('react')
  );
});
