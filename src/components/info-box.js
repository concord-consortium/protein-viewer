import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './info-box.css';
import AminoAcid from './amino-acid';

class InfoBox extends Component {

  render() {
    const style = {
      top: 240,
      left: -45
    }
    return (
      <div className="info-box" style={style}>
        <svg viewBox="0 0 30 30" width="30px">
          <AminoAcid  type="a" width={30}/>
        </svg>
        <p>
          <b>Name:</b> Leucine (L)
        </p>
        <p>
          <b>Codons:</b> CTT
        </p>
        <p>
          <ul>
            <li>Non-polar</li>
            <li>Hydrophobic</li>
          </ul>
        </p>
      </div>
    );
  }
}

InfoBox.propTypes = {
  svg: PropTypes.string,
  highlightColor: PropTypes.string
};

InfoBox.defaultProps = {
  highlightColor: "255, 255, 0"
}

export default InfoBox;
