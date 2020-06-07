import React from 'react';
import ReactDOM from 'react-dom';
// 引入配置rem的js文件
import "./utils/setrem.js"
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
serviceWorker.unregister();
