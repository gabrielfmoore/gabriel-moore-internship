import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

AOS.init();

window.$ = $;
window.jQuery = $;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
