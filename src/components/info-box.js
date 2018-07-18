import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './info-box.css';
import AminoAcid from './amino-acid';
import types from '../util/amino-acid-types'
import { getFullNameForAminoAcid, expandAminoAcidAbbreviation} from '../util/codon-utils'

class InfoBox extends Component {

  renderInfo(aminoAcid) {
    const name = `${getFullNameForAminoAcid(aminoAcid)} (${expandAminoAcidAbbreviation(aminoAcid)})`

    const type = types[aminoAcid];
    const description = type.description.map((d, i) => <li key={i}>{d}</li>)

    return (
      <div className="info">
        <svg viewBox="0 0 30 30" width="30px">
          <AminoAcid  type={aminoAcid} width={30}/>
        </svg>
        <p>
          <b>Name:</b> {name}
        </p>
        <ul>
          {description}
        </ul>
      </div>
    )
  }

  render() {
    const {selection, aminoAcids, secondAminoAcids, width, marks} = this.props;

    const aminoAcid = aminoAcids.charAt(selection);

    let secondAminoAcid;
    if (secondAminoAcids) {
      secondAminoAcid = secondAminoAcids.charAt(selection);
      if (secondAminoAcid === aminoAcid) {
        secondAminoAcid = null;
      }
    }

    const percent = selection/aminoAcids.length;
    // need box to move quicker at the ends and slower in the middle to match selection box
    const transformedPercent = percent < 0.1 ? percent * 2 : percent > 0.9 ? 0.8 + ((percent - 0.9) * 2) : 0.125 + 0.75 * percent;
    const style = {
      marginLeft: (transformedPercent * width) - (width/2),
    }

    const marked = marks.includes(selection);

    return (
      <div className="info-box-wrapper">
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
                  this.props.onMarkLocation && this.props.onMarkLocation(selection)
                }} />
                Mark this location
            </label>
          </div>
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
