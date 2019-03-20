import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/Board';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Board boardName="bulletin-board-notes"/>, document.getElementById('root'));
serviceWorker.unregister();
