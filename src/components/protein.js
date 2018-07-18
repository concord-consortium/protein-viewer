import React from 'react';
import PropTypes from 'prop-types';
import { svgPathProperties } from 'svg-path-properties';
import parseSVG from '../util/parse-svg';
import './protein.css';

const Protein = (props) => {
  const svgModel = parseSVG(props.svg);

  const highlightPath = svgModel.querySelector('#highlight-path').cloneNode();
  const highlightProps = svgPathProperties(highlightPath.getAttribute("d"));
  const highlightPathTotalLength = highlightProps.getTotalLength();
  const selectionLength = highlightPathTotalLength * props.selectionPercent;
  highlightPath.setAttribute("style", `fill:none;stroke:rgba(${props.highlightColor}, 0.6);stroke-width:22px;`);
  highlightPath.setAttribute("stroke-dasharray", selectionLength + " " + highlightPathTotalLength);

  const selectionLeft = highlightPathTotalLength * props.selectionStartPercent;
  highlightPath.setAttribute("stroke-dashoffset", 0 - selectionLeft);

  const s = new XMLSerializer();
  const highlight = s.serializeToString(highlightPath);

  const marks = props.marks.map(loc => {
    const dist = loc * highlightPathTotalLength;
    const point = highlightProps.getPointAtLength(dist);
    const point1 = highlightProps.getPointAtLength(dist-5);
    const point2 = highlightProps.getPointAtLength(dist+5);
    const angle = Math.atan2(point2.y - point1.y, point2.x - point1.x);
    const length = 10;
    const d = `M ${Math.sin(angle) * length + point.x} ${-Math.cos(angle) * length + point.y}, L ${-Math.sin(angle) * length + point.x} ${Math.cos(angle) * length + point.y}`

    return <path key={loc} d={d} style={{stroke: "#33F", strokeWidth: 3}} />
  });

  return (
    <div className="protein">
      <svg viewBox={props.viewBox} width={props.width}>
        <g dangerouslySetInnerHTML={{__html: props.svg}} />
        <g dangerouslySetInnerHTML={{__html: highlight}} />
        { marks }
      </svg>
    </div>
  );
}

Protein.propTypes = {
  svg: PropTypes.string,
  viewBox: PropTypes.string,
  width: PropTypes.number,
  selectionStartPercent: PropTypes.number,
  selectionPercent: PropTypes.number,
  highlightColor: PropTypes.string,
  marks: PropTypes.array
};

Protein.defaultProps = {
  highlightColor: "255, 255, 0",
  marks: []
}

export default Protein;
