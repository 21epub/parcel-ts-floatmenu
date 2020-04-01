import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './css/index.css';
import ContextMenu from './ts/ContentMenu';
import * as serviceWorker from './ts/serviceWorker';



ReactDOM.render(<ContextMenu />, document.getElementById('root'));
serviceWorker.unregister();
