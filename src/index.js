import React from 'react';
import ReactDOM from 'react-dom';
import  App from './App';
import { FluentCustomizations } from '@uifabric/fluent-theme';
import { Customizer, mergeStyles } from 'office-ui-fabric-react';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { createStore, applyMiddleware } from 'redux'; 
import { createEpicMiddleware } from 'redux-observable';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { rootEpic } from './epics';


const epicMiddleware = createEpicMiddleware() ;

const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);
// Inject some global styles
mergeStyles({
  selectors: {
    ':global(body), :global(html), :global(#root)': {
      margin: 0,
      padding: 0,
      height: '100vh'
    }
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Customizer {...FluentCustomizations}>
      <App />
    </Customizer>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
