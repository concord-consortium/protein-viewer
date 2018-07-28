import React from 'react';
import ReactDOM from 'react-dom';
import ProteinWrapper from './ProteinWrapper';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProteinWrapper />, div);
  ReactDOM.unmountComponentAtNode(div);
});
