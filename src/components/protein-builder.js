import React, { Component } from 'react';
import { svgPathProperties } from 'svg-path-properties';
import PropTypes from 'prop-types';
import parseSVG from '../util/parse-svg';
import './protein-builder.css';

const speed = 0.002;

class ProteinBuilder extends Component {

  constructor(props) {
    super(props);
    const svgModel = parseSVG(this.props.svgImage);

    const highlightPath = svgModel.querySelector('#highlight-path');
    const highlightProps = svgPathProperties(highlightPath.getAttribute("d"));
    const highlightPathLength = highlightProps.getTotalLength();

    this.state = {
      percentComplete: 0,
      highlightPath,
      highlightProps,
      highlightPathLength
    };

    this.startAnimation = this.startAnimation.bind(this);
    this.animate = this.animate.bind(this);
  }

  startAnimation() {
    this.setState({
      percentComplete: 0
    }, this.animate);
  }

  animate() {
    const nextStep = Math.min(this.state.percentComplete + speed, 1);
    console.log(nextStep);
    this.setState({percentComplete: nextStep});
    if (nextStep < 1) {
      window.requestAnimationFrame(this.animate);
    }
  }

  render() {
    const {highlightPath, highlightProps, highlightPathLength, percentComplete} = this.state;

    const buildingPercent = Math.min(percentComplete / 0.7, 1);
    const floatingPercent = Math.max(0, Math.min((percentComplete-0.7) / 0.3, 1));

    const currentPathPoint = highlightPathLength - (highlightPathLength * buildingPercent);
    highlightPath.setAttribute("stroke-dasharray", highlightPathLength);
    highlightPath.setAttribute("stroke-dashoffset", -currentPathPoint);
    const s = new XMLSerializer();
    const highlight = s.serializeToString(highlightPath);

    const loc = currentPathPoint;
    const loc1 = Math.max(0, loc-1);
    const loc2 = Math.min(loc+1, highlightPathLength);


    const point = highlightProps.getPointAtLength(loc);
    const point1 = highlightProps.getPointAtLength(loc1);
    const point2 = highlightProps.getPointAtLength(loc2);
    const angle = Math.atan2(point2.y - point1.y, point2.x - point1.x);
    const angleDeg = angle *  (180 / Math.PI);

    const angleOffset = 200;

    const transform = `rotate(${-angleDeg + angleOffset}) translate(${-point.x} ${-point.y})`;
    const xLoc = 300 * buildingPercent;

    const yOffset = 250;

    return (
      <div className="protein-builder">
        <svg viewBox="0 0 400 400" width={400} height={300}>
          <g transform={`translate(-20, ${yOffset}) scale(1.5)`}>
            <path id="mRNA" style={{stroke: "#555", fill: "none", "stroke-dasharray": "4, 1"}} d="M 0 2.844 C 0 2.844 51.518 6.698 79.635 7.394 C 113.872 8.242 139.823 1.352 167.804 1.137 C 193.849 0.937 219.694 7.387 245.733 6.826 C 265.391 6.402 304.323 0 304.323 0"></path>
          </g>
          <g transform={`translate(${xLoc}, ${yOffset})`}>
            <g>
              <path
                d="M 43.274 -32.784 C 47.421 -32.784 50.877 -31.749 53.642 -29.674 C 55.026 -32.439 58.482 -33.477 64.011 -32.784 C 68.851 -32.784 72.307 -30.711 74.381 -26.562 C 74.381 -25.871 74.726 -25.526 75.418 -25.526 C 77.491 -28.983 81.294 -30.711 86.824 -30.711 C 91.662 -30.711 95.119 -28.636 97.193 -24.489 C 99.267 -23.106 100.303 -21.033 100.303 -18.268 C 104.452 -18.959 107.217 -17.231 108.599 -13.083 C 110.673 -11.009 111.712 -7.553 111.712 -2.713 C 111.712 9.037 108.253 17.333 101.34 22.173 C 97.884 24.937 92.7 25.974 85.787 25.283 C 83.713 23.209 80.603 22.173 76.454 22.173 C 72.998 27.011 67.123 28.739 58.827 27.357 C 53.989 26.665 50.532 25.283 48.458 23.209 C 45.002 28.048 39.471 30.467 31.868 30.467 C 27.028 30.467 23.918 29.085 22.535 26.32 C 18.388 30.467 12.512 32.542 4.906 32.542 C -10.993 32.542 -22.399 28.739 -29.312 21.136 C -31.386 19.061 -32.423 15.951 -32.423 11.803 C -29.658 9.037 -28.621 4.89 -29.312 -0.64 C -30.003 -1.331 -30.349 -2.368 -30.349 -3.75 C -30.349 -9.281 -28.274 -13.083 -24.127 -15.156 C -22.744 -15.156 -22.053 -15.502 -22.053 -16.193 C -20.671 -21.724 -17.906 -25.526 -13.758 -27.599 C -11.684 -30.365 -7.537 -31.402 -1.315 -30.711 C 3.525 -30.018 7.671 -28.29 11.128 -25.526 C 13.203 -28.983 17.006 -30.711 22.535 -30.711 C 26.683 -30.711 29.793 -29.327 31.868 -26.562 C 33.941 -30.018 37.743 -32.093 43.274 -32.784 Z"
                style={{fill: "rgb(166, 209, 48)", stroke: "rgb(129, 151, 57)", "stroke-width": "2px"}}></path>
            </g>
            <g transform={`translate(${0-(100*floatingPercent)}, ${0-(220*floatingPercent)})`}>
              <g
                transform={transform}
                dangerouslySetInnerHTML={{__html: highlight}}
              />
            </g>
          </g>
        </svg>
        <div>
          <button onClick={this.startAnimation}>Go</button>
        </div>
      </div>
    );
  }
}

ProteinBuilder.propTypes = {
  svgImage: PropTypes.string
};

export default ProteinBuilder;
