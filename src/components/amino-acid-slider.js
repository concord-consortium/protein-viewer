import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './amino-acid-slider.css';

import AminoAcid from './amino-acid';
import Codon from './codon';

let lastMouseDownTime = -1;
const maxClickTime = 500;

const chainMargin = 4;          // space at start and end of chain
const aminoAcidMargin = 2;      // space between AAs when no codons are showing
const codonMargin = 6;          // space between codons

class AminoAcidSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      draggingRel: null
    };

    this.wrapperRef = React.createRef();
    this.selectionRef = React.createRef();
    this.alleleStringRef = React.createRef();

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidUpdate(props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    }
  }

  // calculate relative position to the mouse and set dragging=true
  onMouseDown(evt) {
    // only left mouse button
    if (evt.button !== 0) return

    this.setState({
      dragging: true,
      draggingXStart: evt.pageX,
      draggingInitialStartPercent: this.props.selectionStartPercent
    })
    evt.stopPropagation();
    evt.preventDefault();

    lastMouseDownTime = Date.now();
  }

  onMouseUp(evt) {
    this.setState({dragging: false})
    evt.stopPropagation();
    evt.preventDefault();
  }

  onMouseMove(evt) {
    if (!this.state.dragging) return;
    const dx = evt.pageX - this.state.draggingXStart;
    const newStartPercent = this.state.draggingInitialStartPercent + (dx / (this.props.width - this.actualSelectionWidth));

    const maxSelectionStartPercent = 1 - this.aminoAcidSelectionWidthPercent;

    this.props.updateSelectionStart(Math.max(0, Math.min(newStartPercent, maxSelectionStartPercent)));
    this.props.updateSelectedAminoAcidIndex(this.currentlySelectedAminoAcidIndex);

    evt.stopPropagation();
    evt.preventDefault();
  }

  onClick() {
    // if it was to short
    if (Date.now() - lastMouseDownTime > maxClickTime) return;
    // or if we have stated dragging
    if (this.props.selectionStartPercent !== this.state.draggingInitialStartPercent) return;

    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  /** distance between amino acids */
  get aminoAcidSpacing() {
    if (this.props.showAlleles) {
      return this.props.codonWidth + codonMargin;
    } else {
      return this.props.aminoAcidWidth + aminoAcidMargin;
    }
  }

  /** length amino acid chain would be in fuly drawn, in pixels */
  get aminoAcidChainLength() {
    return this.props.aminoAcids.length * (this.aminoAcidSpacing) + (chainMargin * 2);
  }

  /** width of selection box in pixels, which depends on whether DNA is visible */
  get actualSelectionWidth() {
    if (this.props.showAlleles) {
      const noDNAChainLength = this.props.aminoAcids.length * (this.props.aminoAcidWidth + aminoAcidMargin) + (chainMargin * 2);
      return this.props.selectionWidth * (this.aminoAcidChainLength / noDNAChainLength);
    } else {
      return this.props.selectionWidth;
    }
  }

  /** width of selection box, as a % of total amino acid chain */
  get aminoAcidSelectionWidthPercent() {
    return this.actualSelectionWidth / this.aminoAcidChainLength;
  }

  /** distance along track user has dragged selection box. From 0 to 1.
   * cf `selectionStartPercent`, which is the left side of the selection box, and always < 1
   */
  get travelPercent() {
    // value of `selectionStartPercent` when we're at far-right of window
    const maxSelectionStartPercent = 1 - this.aminoAcidSelectionWidthPercent;
    // percent selection box has been dragged across window, where far-right is 1.0
    return Math.min(this.props.selectionStartPercent / maxSelectionStartPercent, 1);
  }

  /** index of the single AA selected. This is usually the one closest to the center of the box, except near the ends where it's at the edge
   * of the selection box (or the ends would never be selected).
   */
  get currentlySelectedAminoAcidIndex() {
    const {aminoAcids, selectionStartPercent} = this.props;
    const aaIndexStart = (aminoAcids.length - 1) * selectionStartPercent;
    const numAAinSelectionBox = aminoAcids.length * this.aminoAcidSelectionWidthPercent;
    // Calculate position along selection box where AA is selected.
    // From 0-10% of travel, we go from the left edge to the center of the box. From 10-90% we stay at the center. From
    // 90-100% we move to the far right edge.
    const selectionPercentAlongBox = this.travelPercent < 0.1 ? this.travelPercent * 5 : this.travelPercent > 0.9 ? 0.5 + ((this.travelPercent - 0.9) * 5) : 0.5;
    return Math.round(aaIndexStart + (numAAinSelectionBox * selectionPercentAlongBox));
  }


  render() {
    const {
      aminoAcids,
      alleles,
      width,
      aminoAcidWidth,
      dnaFontHeight,
      highlightColor,
      marks,
      showAlleles,
      dimUnselected
    } = this.props;

    const frameStyle = {
      width: `${width}px`
    };

    const acidMargin = 2; // space below amino acids

    // furthest left offset amino acid chain can be
    const maxAminoAcidLeftShift = this.aminoAcidChainLength - width;
    // current left shift
    const aminoAcidLeftShift = maxAminoAcidLeftShift * this.travelPercent;
    // furthest right offset selection box can be
    const maxSelectionBoxRightShift = width - this.actualSelectionWidth;
    // current selection box right offset
    const selectionRightShift = maxSelectionBoxRightShift * this.travelPercent;
    // center AA image in each space
    const innerAminoAcidOffset = (this.aminoAcidSpacing / 2) - (aminoAcidWidth / 2);

    let wrapperClass = "amino-acid-slider";

    if (selectionRightShift > 10) {
      wrapperClass += " fade-left";
    }
    if (selectionRightShift < maxSelectionBoxRightShift - 10) {
      wrapperClass += " fade-right";
    }

    const selectStyle = {
      width: `${this.actualSelectionWidth}px`,
      left: `${selectionRightShift}px`
    }
    if (highlightColor) {
      selectStyle.border = `1px solid rgb(${highlightColor})`;
      selectStyle.backgroundColor = `rgba(${highlightColor}, 0.3)`;
    }

    // Returns an array of images containing both the AA shape and, optionally, the codon below
    const aminoAcidImages = aminoAcids.split('').map((a, i) => {
      const x = (this.aminoAcidSpacing * i) - aminoAcidLeftShift + chainMargin;

      if (x < -this.aminoAcidSpacing || x > width) {
        return null;
      }

      // const codonOffset = chainOffset + i * (codonWidth + codonMargin);
      const dimmed = dimUnselected && this.currentlySelectedAminoAcidIndex !== i;
      const selected = marks.includes(i);
      return (
        <g key={i}>
          {
            selected &&
            <rect x={x + innerAminoAcidOffset - 1} y={1} width={aminoAcidWidth + 1} height={aminoAcidWidth + 2} style={{fill: "#33F", stroke: "#AAF", opacity: (dimmed ? 0.4 : 1), strokeWidth: 2}} />
          }
          {
            a !== "0" &&
            <AminoAcid type={a} x={x + innerAminoAcidOffset} y={2.5} width={aminoAcidWidth} dimmed={dimmed} />
          }
          {
            showAlleles &&
            <Codon dna={alleles.substring(i * 3, (i + 1) * 3)} x={x} y={aminoAcidWidth + acidMargin + dnaFontHeight} fontSize={dnaFontHeight} dimmed={dimmed} />
          }
        </g>
      )
    })

    let svgHeight = aminoAcidWidth + acidMargin + 2;
    if (showAlleles) {
      svgHeight += dnaFontHeight;
    }

    const chainLineStart = aminoAcidLeftShift < this.aminoAcidSpacing / 2 ? (chainMargin + innerAminoAcidOffset) : 0;
    const chainLineEnd = this.aminoAcidChainLength - aminoAcidLeftShift > (width + this.aminoAcidSpacing / 2) ? width : width - chainMargin - innerAminoAcidOffset - this.aminoAcidSpacing/2;

    return (
      <div className={wrapperClass} style={frameStyle} ref={this.wrapperRef}
          onMouseDown={this.onMouseDown}
          onClick={this.onClick}>
        <div
          className="selection"
          style={selectStyle}
          ref={this.selectionRef}
        />
        <div className="amino-acids" ref={this.alleleStringRef}>
          <svg width={width} height={svgHeight} viewBox={`0 0 ${width} ${svgHeight}`}>
            <path d={`M${chainLineStart},${(aminoAcidWidth/2)+3}L${chainLineEnd},${(aminoAcidWidth/2)+3}`} style={{stroke: '#AAA', strokeWidth: '2px', opacity: (dimUnselected ? 0.4 : 1)}} />
            { aminoAcidImages }
          </svg>
        </div>
      </div>
    );
  }
}

AminoAcidSlider.propTypes = {
  aminoAcids: PropTypes.string,
  alleles: PropTypes.string,
  width: PropTypes.number,
  aminoAcidWidth: PropTypes.number,
  codonWidth: PropTypes.number,
  selectionStartPercent: PropTypes.number,
  selectionWidth: PropTypes.number,
  highlightColor: PropTypes.string,
  marks: PropTypes.array,
  showAlleles: PropTypes.bool,
  dimUnselected: PropTypes.bool,
  updateSelectionStart: PropTypes.func,
  updateSelectedAminoAcidIndex: PropTypes.func,
  onClick: PropTypes.func
};

AminoAcidSlider.defaultProps = {
  aminoAcids: "",
  alleles: "",
  width: 300,
  selectionWidth: 70,
  selectionStart: 0,
  aminoAcidWidth: 17,
  codonWidth: 29,
  showAlleles: false,
  marks: [],
  dnaFontHeight: 16
};

export default AminoAcidSlider;
