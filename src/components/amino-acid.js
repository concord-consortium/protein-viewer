import React from 'react';
import PropTypes from 'prop-types';

/**
 * Takes an svg path def and scales it and offsets it by x and y
 * @example scalePath("M1,2L3,4Z", 2, 0, 1);  // returns "M2,5L6,9Z"
 * @param {string} d svg path def
 * @param {float} scale
 */
const scalePath = (d, scale, x=0, y=0) => {
  // goes from "Ma,blc,dZ" to [[a',b'],[c',d']] where a' is (a * scale)
  let points = d.substr(1, d.length-2).split("L").map(xy => xy.split(",").map(n => parseFloat(n) * scale))
  // offsets each point by x and y
  points = points.map(xy => xy.map((p, i) => i === 0 ? p + x : p + y));
  return `M${points.map(xy => xy.join()).join("L")}Z`;
}

const simpleCircle = ({width, x, y, strokeWidth, stroke, fill, scale, opacity}) => {
  const scaledStrokeWidth = strokeWidth * scale;
  const r = (width/2) - (scaledStrokeWidth/2);
  return (
    <circle
      style={{
        stroke,
        strokeWidth: `${scaledStrokeWidth}px`,
        fill
      }}
      cx={x + r + scaledStrokeWidth/2}
      cy={y + r + scaledStrokeWidth/2}
      r={r}
      opacity={opacity}
    />
  );
}

const closedPath = ({d, x, y, strokeWidth, stroke, fill, scale, opacity}) => {
  const scaledD = scalePath(d, scale, x, y);
  const scaledStrokeWidth = strokeWidth * scale;
  return (
    <path
      d={scaledD}
      style={{
        fill,
        fillRule: 'nonzero',
        stroke,
        strokeWidth: `${scaledStrokeWidth}px`,
        opacity
      }}
    />
  );
}

const aminoAcids = {
  a: ({width, x, y, dimmed}) => simpleCircle({
    width: width * 0.95,
    x, y,
    strokeWidth: 7,
    stroke: 'rgb(191, 233, 51)',
    fill: 'rgb(244, 255, 141)',
    scale: width/50,
    opacity: dimmed ? .3 : 1}),
  r: ({width, x, y, dimmed}) => simpleCircle({
    width: width * 0.95,
    x, y,
    strokeWidth: 12,
    stroke: 'rgb(233, 51, 179)',
    fill: 'rgb(244, 255, 141)',
    scale: width/50,
    opacity: dimmed ? .3 : 1}),
  c: ({width, x, y, dimmed}) => closedPath({
    d: "M16.023,3.044L42.018,7.799L46.662,34.567L23.535,46.357L4.6,26.875L16.023,3.044Z",
    x, y,
    strokeWidth: 5,
    stroke: 'rgb(89,85,218)',
    fill: 'rgb(0,10,210)',
    scale: width/50,
    opacity: dimmed ? .3 : 1}),
  d: ({width, x, y, dimmed}) => closedPath({
    d: "M16.037,7.079L32.135,6.876L42.588,19.531L39.525,35.515L25.252,42.791L10.517,35.88L6.416,19.987L16.037,7.079Z",
    x, y,
    strokeWidth: 13,
    stroke: 'rgb(218,85,100)',
    fill: 'rgb(0,10,210)',
    scale: width/50,
    opacity: dimmed ? .3 : 1}),
  e: ({width, x, y, dimmed}) => closedPath({
    d: "M44.762,21.261L36.047,43.526L11.472,43.025L4.997,20.449L25.572,6.999L44.762,21.261Z",
    x, y,
    strokeWidth: 5,
    stroke: 'rgb(239,111,0)',
    fill: 'rgb(8,120,138)',
    scale: width/50,
    opacity: dimmed ? .3 : 1}),
  f: ({width, x, y, dimmed}) => closedPath({
    d: "M45.83,25.538L29.875,29.897L28.706,45.665L19.338,32.556L3.206,36.291L13.371,23.83L4.57,10.371L20.221,15.779L30.913,3.725L30.421,19.529L45.83,25.538Z",
    x, y,
    strokeWidth: 5,
    stroke: 'rgb(186,186,186)',
    fill: 'rgb(210,119,253)',
    scale: width/50,
    opacity: dimmed ? .3 : 1}),
}

const AminoAcid = ({type="a", width=18, x=0, y=0, dimmed=false}) => aminoAcids[type]({width, x, y, dimmed});

AminoAcid.propTypes = {
  type: PropTypes.string,
  width: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  dimmed: PropTypes.bool
};

export default AminoAcid;
