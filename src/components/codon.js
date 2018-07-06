import React from 'react';
import PropTypes from 'prop-types';

const Codon = ({dna="GAC", x=0, y=0, selected=true}) => <text x={x} y={y}>{dna.toUpperCase()}</text>;

Codon.propTypes = {
  dna: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  selected: PropTypes.bool
};

export default Codon;
