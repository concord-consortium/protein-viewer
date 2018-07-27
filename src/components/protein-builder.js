import React, { Component } from 'react';
import AminoAcidSlider from './amino-acid-slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { svgPathProperties } from 'svg-path-properties';
import PropTypes from 'prop-types';
import parseSVG from '../util/svg-utils';
import { extractCodons } from '../util/dna-utils';
import { getAminoAcidsFromCodons, getAminoAcidColor, aminoAcidTypes } from '../util/amino-acid-utils';
import './protein-builder.css';

// we will need a way to calculate these hard-code values one we start
// having proteins with different dimensions.
const svgViewBoxWidth = 400;
const svgViewBoxHeight = 400;
const svgRibosomeEndX = 300;
const svgRnaY = 250;
const svgWidth = 440;
const svgHeight = 330;

function generateFloatingAAs(len) {
  return new Array(len).fill().map(() => {
    const rand = Math.random();
    const randomType = rand < 0.25 ? aminoAcidTypes.Polar
    : rand < 0.5 ? aminoAcidTypes.Hydrophobic
    : rand < 0.75? aminoAcidTypes.Positive
    : aminoAcidTypes.Negative;
    return {
      x: Math.random() * svgViewBoxWidth,
      y: Math.random() * svgViewBoxHeight,
      vx: 1 - Math.random() * 2,
      vy: 1 - Math.random() * 2,
      color: randomType.color
    }
  })
}

function moveFloatingAAs(aas) {
  return aas.map(aa => {
    if (aa.x < 0 || aa.x > svgViewBoxWidth) {
      aa.vx *= -1;
    }
    if (aa.y < 0 || aa.y > svgViewBoxHeight) {
      aa.vy *= -1;
    }
    aa.x += aa.vx;
    aa.y += aa.vy;
    return aa;
  });
}

class ProteinBuilder extends Component {

  constructor(props) {
    super(props);
    const svgModel = parseSVG(this.props.svgImage);

    const highlightPath = svgModel.querySelector('#highlight-path');
    const highlightProps = svgPathProperties(highlightPath.getAttribute("d"));
    const highlightPathLength = highlightProps.getTotalLength();

    const floatingAAs = generateFloatingAAs(50);

    this.state = {
      percentComplete: 0,
      animating: false,
      highlightPath,
      highlightProps,
      highlightPathLength,
      floatingAAs
    };

    this.handleUpdateSelectionStart = this.handleUpdateSelectionStart.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
    this.resetAnimation = this.resetAnimation.bind(this);
    this.animate = this.animate.bind(this);
  }

  handleUpdateSelectionStart(selectionStart) {
    const percentCompleteRequested = selectionStart * 0.8;

    const newState = {
      percentComplete: percentCompleteRequested
    };

    if (this.props.showAminoAcids) {
      newState.floatingAAs = moveFloatingAAs(this.state.floatingAAs);
    }

    this.setState(newState);
  }

  startAnimation() {
    const {animating, percentComplete} = this.state;
    if (!animating) {
      this.setState({
        percentComplete: percentComplete === 1 ? 0 : percentComplete,
        animating: true
      }, this.animate);
    }
  }

  resetAnimation() {
    this.setState({
      percentComplete: 0,
      animating: false
    });
  }

  animate() {
    const {percentComplete, animating} = this.state;
    if (!animating) return;

    const nextStep = Math.min(percentComplete + this.props.speed, 1);

    const newState = {
      percentComplete: nextStep
    };

    if (this.props.showAminoAcids) {
      newState.floatingAAs = moveFloatingAAs(this.state.floatingAAs);
    }

    this.setState(newState);

    if (nextStep < 1) {
      window.requestAnimationFrame(this.animate);
    } else {
      this.setState({
        percentComplete: 1,
        animating: false
      });
    }
  }

  render() {
    const {highlightPath, highlightProps, highlightPathLength, percentComplete} = this.state;

    const codons = extractCodons(this.props.dna);
    const aminoAcids = getAminoAcidsFromCodons(codons);

    const buildingPercent = Math.min(percentComplete / 0.8, 1);
    const floatingPercent = Math.max(0, Math.min((percentComplete-0.8) / 0.2, 1));

    const currentPathPoint = highlightPathLength * buildingPercent;
    highlightPath.setAttribute("stroke-dasharray", highlightPathLength);
    highlightPath.setAttribute("stroke-dashoffset", highlightPathLength - currentPathPoint);
    const s = new XMLSerializer();
    const highlight = s.serializeToString(highlightPath);

    const loc = currentPathPoint;
    const locBefore = Math.max(0, loc-1);
    const locAfter = Math.min(loc+1, highlightPathLength);

    const point = highlightProps.getPointAtLength(loc);
    const pointBefore = highlightProps.getPointAtLength(locBefore);
    const pointAfter = highlightProps.getPointAtLength(locAfter);
    const angle = Math.atan2(pointAfter.y - pointBefore.y, pointAfter.x - pointBefore.x);
    const angleDeg = angle *  (180 / Math.PI);

    // angle we want protein chain sticking out
    const angleOffset = 200;

    let angleOfProtein = angleDeg + angleOffset;

    // undo spin while floting away
    angleOfProtein += floatingPercent * (360 - angleOfProtein);
    // move center of spin towards center of protein as we float away
    const rotX = floatingPercent * -(svgViewBoxWidth / 4);
    const rotY = floatingPercent * -(svgViewBoxHeight / 4);

    const transform = `rotate(${angleOfProtein}, ${rotX}, ${rotY}) translate(${-point.x} ${-point.y})`;

    const xLoc = svgRibosomeEndX * buildingPercent;

    const yOffset = svgRnaY;

    const aaLength = aminoAcids.length;
    const aaVisibleLength = Math.floor(aaLength * buildingPercent);
    const currentAminoAcids = aminoAcids.substr(0, aaVisibleLength) + "0".repeat(aaLength-aaVisibleLength);

    const totalLength = highlightProps.getTotalLength();
    let dots, floatingDots;
    if (this.props.showAminoAcids) {
      dots = aminoAcids.substr(0, aaVisibleLength).split('').map((aa, i) => {
        if (aa === "0") return null;
        const color = getAminoAcidColor(aa);
        const dist = i/aminoAcids.length * totalLength;
        const point = highlightProps.getPointAtLength(dist);

        return <circle key={i} cx={point.x} cy={point.y} r={2} style={{fill: color, stroke: "#222", strokeWidth: 0.5}} />
      });

      floatingDots = this.state.floatingAAs.map((aa, i) =>
        <circle key={i} cx={aa.x} cy={aa.y} r={2} style={{fill: aa.color, stroke: "#222", strokeWidth: 0.5}} />
      );
    }

    const sliderSelectionWidth = 70;
    const aminoAcidWidth = 17;
    const sliderSelectionPercent = sliderSelectionWidth / (aminoAcids.length * aminoAcidWidth);

    return (
      <div className="protein-builder">
        <svg viewBox={`0 0 ${svgViewBoxWidth} ${svgViewBoxHeight}`} width={svgWidth} height={svgHeight}>
          { floatingDots }
          <g transform={`translate(-20, ${yOffset}) scale(1.5)`}>
            <path id="mRNA" style={{stroke: "#555", fill: "none", strokeDasharray: "4, 1"}} d="M 0 2.844 C 0 2.844 51.518 6.698 79.635 7.394 C 113.872 8.242 139.823 1.352 167.804 1.137 C 193.849 0.937 219.694 7.387 245.733 6.826 C 265.391 6.402 304.323 0 304.323 0"></path>
          </g>
          <g transform={`translate(${xLoc}, ${yOffset})`}>
            <g>
              <path
                d="M 43.274 -32.784 C 47.421 -32.784 50.877 -31.749 53.642 -29.674 C 55.026 -32.439 58.482 -33.477 64.011 -32.784 C 68.851 -32.784 72.307 -30.711 74.381 -26.562 C 74.381 -25.871 74.726 -25.526 75.418 -25.526 C 77.491 -28.983 81.294 -30.711 86.824 -30.711 C 91.662 -30.711 95.119 -28.636 97.193 -24.489 C 99.267 -23.106 100.303 -21.033 100.303 -18.268 C 104.452 -18.959 107.217 -17.231 108.599 -13.083 C 110.673 -11.009 111.712 -7.553 111.712 -2.713 C 111.712 9.037 108.253 17.333 101.34 22.173 C 97.884 24.937 92.7 25.974 85.787 25.283 C 83.713 23.209 80.603 22.173 76.454 22.173 C 72.998 27.011 67.123 28.739 58.827 27.357 C 53.989 26.665 50.532 25.283 48.458 23.209 C 45.002 28.048 39.471 30.467 31.868 30.467 C 27.028 30.467 23.918 29.085 22.535 26.32 C 18.388 30.467 12.512 32.542 4.906 32.542 C -10.993 32.542 -22.399 28.739 -29.312 21.136 C -31.386 19.061 -32.423 15.951 -32.423 11.803 C -29.658 9.037 -28.621 4.89 -29.312 -0.64 C -30.003 -1.331 -30.349 -2.368 -30.349 -3.75 C -30.349 -9.281 -28.274 -13.083 -24.127 -15.156 C -22.744 -15.156 -22.053 -15.502 -22.053 -16.193 C -20.671 -21.724 -17.906 -25.526 -13.758 -27.599 C -11.684 -30.365 -7.537 -31.402 -1.315 -30.711 C 3.525 -30.018 7.671 -28.29 11.128 -25.526 C 13.203 -28.983 17.006 -30.711 22.535 -30.711 C 26.683 -30.711 29.793 -29.327 31.868 -26.562 C 33.941 -30.018 37.743 -32.093 43.274 -32.784 Z"
                style={{fill: "#c4a25d", stroke: "#b89450", strokeWidth: "2px"}}></path>
            </g>
            <g transform={`translate(${0-(100*floatingPercent)}, ${0-(80*floatingPercent)})`}>
              <g transform={transform}>
                <g dangerouslySetInnerHTML={{__html: highlight}} />
                { dots }
              </g>
            </g>
          </g>
        </svg>
        <div className="amino-acids">
          <AminoAcidSlider
            aminoAcids={currentAminoAcids}
            codons={codons}
            width={this.props.sliderWidth}
            aminoAcidWidth={aminoAcidWidth}
            selectionWidth={sliderSelectionWidth}
            selectionStartPercent={Math.max(0, buildingPercent - (sliderSelectionPercent / 2))}
            updateSelectionStart={this.handleUpdateSelectionStart}
            selectedAminoAcidIndex={this.state.selectedAminoAcidIndex}
            updateSelectedAminoAcidIndex={() => {}}
            onClick={this.handleAminoAcidSliderClick}
            showDNA={true}
            dimUnselected={false}
            highlightColor="196, 162, 93"
          />
        </div>
        <div>
          <button onClick={this.startAnimation}>Go</button>
          <button onClick={this.resetAnimation}>Reset</button>
        </div>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.props.showAminoAcids}
              onChange={this.props.handleAminoAcidsToggle}
            />
          }
          label="Show Amino Acids on Protein"
        />
      </div>
    );
  }
}

ProteinBuilder.propTypes = {
  dna: PropTypes.string,
  svgImage: PropTypes.string,
  speed: PropTypes.number,
  sliderWidth: PropTypes.number,
  showAminoAcids: PropTypes.bool,
  handleAminoAcidsToggle: PropTypes.func
};

export default ProteinBuilder;
