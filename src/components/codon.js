import React from 'react';
import PropTypes from 'prop-types';

const Codon = ({dna="GAC", x=0, y=0, dimmed=false}) => <text x={x} y={y} opacity={dimmed ? .3 : 1}>{dna.toUpperCase()}</text>;

Codon.propTypes = {
  dna: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  dimmed: PropTypes.bool
};

export default Codon;
