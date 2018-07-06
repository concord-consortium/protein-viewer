import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './info-box.css';
import AminoAcid from './amino-acid';
import types from '../util/amino-acid-types'

class InfoBox extends Component {

  renderInfo(aminoAcid) {
    const type = types[aminoAcid];
    const description = type.description.map((d, i) => <li key={i}>{d}</li>)

    return (
      <div className="info">
        <svg viewBox="0 0 30 30" width="30px">
          <AminoAcid  type={aminoAcid} width={30}/>
        </svg>
        <p>
          <b>Name:</b> {type.name}
        </p>
        <p>
          <ul>
            {description}
          </ul>
        </p>
      </div>
    )
  }

  render() {
    const location = Math.floor((this.props.aminoAcids.length - 1) * this.props.selection);
    const aminoAcid = this.props.aminoAcids.charAt(location) || "e";

    let secondAminoAcid;
    if (this.props.secondAminoAcids) {
      secondAminoAcid = this.props.secondAminoAcids.charAt(location) || "e";
      if (secondAminoAcid === aminoAcid) {
        secondAminoAcid = null;
      }
    }

    const style = {
      top: this.props.top,
      left: this.props.left + (this.props.selection * this.props.width)
    }
    if (secondAminoAcid) {
      style.left -= 89;
    }

    const marked = this.props.marks.indexOf(location) > -1;

    return (
      <div className="info-box" style={style}>
        <div className="info-wrapper">
          { this.renderInfo(aminoAcid) }
          { secondAminoAcid && this.renderInfo(secondAminoAcid) }
        </div>
        <div>
          <label>
            <input
              name="isGoing"
              type="checkbox"
              checked={marked}
              onChange={() => {
                this.props.onMarkLocation && this.props.onMarkLocation(location)
              }} />
              Mark this location
          </label>
        </div>
      </div>
    );
  }
}

InfoBox.propTypes = {
  svg: PropTypes.string,
  highlightColor: PropTypes.string,
  aminoAcids: PropTypes.string,
  secondAminoAcids: PropTypes.string,
  selection: PropTypes.number,
  marks: PropTypes.array,
  onMarkLocation: PropTypes.func
};

InfoBox.defaultProps = {
  highlightColor: "255, 255, 0",
  marks: []
}

export default InfoBox;
