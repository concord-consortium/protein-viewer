import React, { Component } from 'react';
import { svgPathProperties } from 'svg-path-properties';
import PropTypes from 'prop-types';
import './protein.css';
import parseSVG from '../util/parse-svg';

// FIXME:
const selectionLength = 60;

class Protein extends Component {

  constructor(props) {
    super(props);
    const svgModel = parseSVG(this.props.svg);

    const highlightPath = svgModel.querySelector('#highlight-path').cloneNode();
    const highlightProps = svgPathProperties(highlightPath.getAttribute("d"));
    const highlightPathLength = highlightProps.getTotalLength();
    highlightPath.setAttribute("style", `fill:none;stroke:rgba(${this.props.highlightColor}, 0.6);stroke-width:22px;`);
    highlightPath.setAttribute("stroke-dasharray", selectionLength + " " + highlightPathLength);

    this.state = {
      selectionLeft: 0,
      highlightPath,
      highlightPathLength
    };
  }

  static getDerivedStateFromProps(props, state) {
    const maxLeft = state.highlightPathLength - selectionLength;
    const selectionLeft = props.selectionStart * maxLeft;
    return {
      selectionLeft
    }
  }

  render() {
    this.state.highlightPath.setAttribute("stroke-dashoffset", 0 - this.state.selectionLeft);
    const s = new XMLSerializer();
    const highlight = s.serializeToString(this.state.highlightPath);

    const highlightProps = svgPathProperties(this.state.highlightPath.getAttribute("d"));
    const highlightPathLength = highlightProps.getTotalLength();

    const marks = this.props.marks.map(loc => {
      const dist = loc * highlightPathLength;
      const point = highlightProps.getPointAtLength(dist);
      const point1 = highlightProps.getPointAtLength(dist-5);
      const point2 = highlightProps.getPointAtLength(dist+5);
      const angle = Math.atan2(point2.y - point1.y, point2.x - point1.x);
      const length = 10;
      const d = `M ${Math.sin(angle) * length + point.x} ${-Math.cos(angle) * length + point.y}, L ${-Math.sin(angle) * length + point.x} ${Math.cos(angle) * length + point.y}`

      return <path d={d} style={{stroke: "#33F", strokeWidth: 3}} />
    });

    return (
      <div className="protein">
        <svg viewBox={this.props.viewBox} width={this.props.width}>
          <g dangerouslySetInnerHTML={{__html: this.props.svg}} />
          <g dangerouslySetInnerHTML={{__html: highlight}} />
          { marks }
        </svg>
      </div>
    );
  }
}

Protein.propTypes = {
  svg: PropTypes.string,
  highlightColor: PropTypes.string,
  marks: PropTypes.array
};

Protein.defaultProps = {
  highlightColor: "255, 255, 0",
  marks: []
}

export default Protein;
