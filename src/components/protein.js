import React from 'react';
import PropTypes from 'prop-types';
import { svgPathProperties } from 'svg-path-properties';
import parseSVG, { closestPointOnPath } from '../util/svg-utils';
import { getAminoAcidColor } from '../util/amino-acid-utils';
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

  let dots;
  if (props.showAminoAcids) {
    dots = props.aminoAcids.split('').map((aa, i) => {
      if (aa === "0") return null;
      const color = getAminoAcidColor(aa);
      const dist = i/props.aminoAcids.length * highlightPathTotalLength;
      const point = highlightProps.getPointAtLength(dist);

      return <circle key={i} cx={point.x} cy={point.y} r={2} style={{fill: color, stroke: "#222", strokeWidth: 0.5}} />
    });
  }

  let svgEl = null;

  const onClick = (evt) => {
    const pt = svgEl.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    const svgPt = pt.matrixTransform(svgEl.getScreenCTM().inverse())
    const closestPoint = closestPointOnPath(svgPt, highlightProps);
    if (closestPoint.distance > 20) {
      // too far
      return;
    }
    let perc = closestPoint.length / highlightPathTotalLength;
    perc = perc - (props.selectionPercent / 2);
    perc = Math.max(0, Math.min(perc, 1 - props.selectionPercent));
    props.updateSelectionStart(perc);
  }

  return (
    <div className="protein">
      <svg ref={(el) => { svgEl = el; }} viewBox={props.viewBox} width={props.width} height={props.width} onClick={onClick}>
        <g dangerouslySetInnerHTML={{__html: props.svg}} />
        <g dangerouslySetInnerHTML={{__html: highlight}} />
        { marks }
        { dots }
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
  marks: PropTypes.array,
  aminoAcids: PropTypes.string,
  showAminoAcids: PropTypes.bool,
  updateSelectionStart: PropTypes.func
};

Protein.defaultProps = {
  highlightColor: "255, 255, 0",
  marks: []
}

export default Protein;
