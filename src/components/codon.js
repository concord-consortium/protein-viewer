import React from 'react';
import PropTypes from 'prop-types';

const Codon = ({dna="GAC", x=0, y=0, dimmed=false, fontSize=16}) => <text x={x} y={y} opacity={dimmed ? .3 : 1} style={{fontSize}}>{dna.toUpperCase()}</text>;

Codon.propTypes = {
  dna: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  fontSize: PropTypes.number,
  dimmed: PropTypes.bool
};

export default Codon;
