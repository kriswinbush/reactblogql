import React from 'react';
import ReactDOM from 'react-dom';
import ThemeContainer from './containers/ThemeContainer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ThemeContainer />, document.getElementById('root'));
registerServiceWorker();
