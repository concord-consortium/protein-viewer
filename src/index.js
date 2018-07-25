import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ProteinWrapper from './node_modules/components/ProteinWrapper/ProteinWrapper';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ProteinWrapper />, document.getElementById('root'));
registerServiceWorker();
