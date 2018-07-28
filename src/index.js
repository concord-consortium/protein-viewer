import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ProteinWrapper from './components/ProteinWrapper/ProteinWrapper';
import registerServiceWorker from './registerServiceWorker';
import getParameterByName from './util/urlUtils';

const display = getParameterByName("proteins") || "";
const showDNA = getParameterByName('dnaVisible');
const dnaSwitchable = getParameterByName('dnaSwitchable');
const showBuilder = getParameterByName("showBuilder");
ReactDOM.render(
  <ProteinWrapper 
  	display={display} 
  	showDNA={showDNA} 
  	dnaSwitchable={dnaSwitchable}
  	showBuilder={showBuilder} />, 
  document.getElementById('root'));
registerServiceWorker();