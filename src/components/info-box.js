import React from 'react';
import PropTypes from 'prop-types';
import './info-box.css';
import AminoAcid from './amino-acid';
import { getFullNameForAminoAcid, expandAminoAcidAbbreviation, getAminoAcidDescription } from '../util/amino-acid-utils'

const InfoBox = (props) => {
  const {selection, aminoAcids, secondAminoAcids, width, marks} = props;

  const aminoAcid = aminoAcids.charAt(selection);

  let secondAminoAcid;
  if (secondAminoAcids) {
    secondAminoAcid = secondAminoAcids.charAt(selection);
    if (secondAminoAcid === aminoAcid) {
      secondAminoAcid = null;
    }
  }

  const style = {
    marginLeft: props.selectedAminoAcidXLocation - (width/2),
  }

  const length = aminoAcids.length;
  const marked = marks.includes(selection);

  function renderInfo(aminoAcid) {
    const name = `${getFullNameForAminoAcid(aminoAcid)} (${expandAminoAcidAbbreviation(aminoAcid)})`

    const description = getAminoAcidDescription(aminoAcid);

    return (
      <div className="info">
        { aminoAcid !== "0" &&
          <svg viewBox="0 0 30 30" width="30px">
            <AminoAcid  type={aminoAcid} width={30}/>
          </svg>
        }
        <div className="name">
          <b>Name:</b> {name}
        </div>
        <div className="property">
          <b>Property:</b> {description}
        </div>
      </div>
    )
  }

  return (
    <div className="info-box-wrapper">
      <div className="info-box" style={style}>
        <div className="info-wrapper">
          { renderInfo(aminoAcid) }
          { secondAminoAcid && renderInfo(secondAminoAcid) }
        </div>
        { aminoAcid !== "0" &&
          <div className="mark">
            <div>
              Amino acid {selection + 1} of {length}
            </div>
            <label>
              <input
                name="isGoing"
                type="checkbox"
                checked={marked}
                onChange={() => {
                  props.onMarkLocation && props.onMarkLocation(selection)
                }} />
                Mark this location
            </label>
          </div>
        }
      </div>
    </div>
  );
}

InfoBox.propTypes = {
  svg: PropTypes.string,
  highlightColor: PropTypes.string,
  aminoAcids: PropTypes.string,
  secondAminoAcids: PropTypes.string,
  selection: PropTypes.number,
  selectedAminoAcidXLocation: PropTypes.number,
  marks: PropTypes.array,
  onMarkLocation: PropTypes.func
};

InfoBox.defaultProps = {
  highlightColor: "255, 255, 0",
  marks: []
}

export default InfoBox;
