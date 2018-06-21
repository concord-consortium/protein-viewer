import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './info-box.css';
import AminoAcid from './amino-acid';

class InfoBox extends Component {

  render() {
    console.log(this.props.selectionStart)
    const style = {
      top: 240,
      left: -45 + (this.props.selectionStart * 255)
    }
    let letter = this.props.aminoAcids.charAt(Math.floor(this.props.aminoAcids.length * this.props.selectionStart));
    if (!letter) letter = "e";
    return (
      <div className="info-box" style={style}>
        <svg viewBox="0 0 30 30" width="30px">
          <AminoAcid  type={letter} width={30}/>
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
