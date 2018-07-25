'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes an svg path def and scales it and offsets it by x and y
 * @example scalePath("M1,2L3,4Z", 2, 0, 1);  // returns "M2,5L6,9Z"
 * @param {string} d svg path def
 * @param {float} scale
 */
var scalePath = function scalePath(d, scale) {
  var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  // goes from "Ma,blc,dZ" to [[a',b'],[c',d']] where a' is (a * scale)
  var points = d.substr(1, d.length - 2).split("L").map(function (xy) {
    return xy.split(",").map(function (n) {
      return parseFloat(n) * scale;
    });
  });
  // offsets each point by x and y
  points = points.map(function (xy) {
    return xy.map(function (p, i) {
      return i === 0 ? p + x : p + y;
    });
  });
  return 'M' + points.map(function (xy) {
    return xy.join();
  }).join("L") + 'Z';
};

var simpleCircle = function simpleCircle(_ref) {
  var width = _ref.width,
      x = _ref.x,
      y = _ref.y,
      strokeWidth = _ref.strokeWidth,
      stroke = _ref.stroke,
      fill = _ref.fill,
      scale = _ref.scale,
      opacity = _ref.opacity;

  var scaledStrokeWidth = strokeWidth * scale;
  var r = width / 2 - scaledStrokeWidth / 2;
  return _react2.default.createElement('circle', {
    style: {
      stroke: stroke,
      strokeWidth: scaledStrokeWidth + 'px',
      fill: fill
    },
    cx: x + r + scaledStrokeWidth / 2,
    cy: y + r + scaledStrokeWidth / 2,
    r: r,
    opacity: opacity
  });
};

var closedPath = function closedPath(_ref2) {
  var d = _ref2.d,
      x = _ref2.x,
      y = _ref2.y,
      strokeWidth = _ref2.strokeWidth,
      stroke = _ref2.stroke,
      fill = _ref2.fill,
      scale = _ref2.scale,
      opacity = _ref2.opacity;

  var scaledD = scalePath(d, scale, x, y);
  var scaledStrokeWidth = strokeWidth * scale;
  return _react2.default.createElement('path', {
    d: scaledD,
    style: {
      fill: fill,
      fillRule: 'nonzero',
      stroke: stroke,
      strokeWidth: scaledStrokeWidth + 'px',
      opacity: opacity
    }
  });
};

var aminoAcids = {
  A: function A(_ref3) {
    var width = _ref3.width,
        x = _ref3.x,
        y = _ref3.y,
        dimmed = _ref3.dimmed;
    return simpleCircle({
      width: width * 0.95,
      x: x, y: y,
      strokeWidth: 7,
      stroke: 'rgb(191, 233, 51)',
      fill: 'rgb(244, 255, 141)',
      scale: width / 50,
      opacity: dimmed ? .3 : 1 });
  },
  R: function R(_ref4) {
    var width = _ref4.width,
        x = _ref4.x,
        y = _ref4.y,
        dimmed = _ref4.dimmed;
    return simpleCircle({
      width: width * 0.95,
      x: x, y: y,
      strokeWidth: 12,
      stroke: 'rgb(233, 51, 179)',
      fill: 'rgb(244, 255, 141)',
      scale: width / 50,
      opacity: dimmed ? .3 : 1 });
  },
  C: function C(_ref5) {
    var width = _ref5.width,
        x = _ref5.x,
        y = _ref5.y,
        dimmed = _ref5.dimmed;
    return closedPath({
      d: "M16.023,3.044L42.018,7.799L46.662,34.567L23.535,46.357L4.6,26.875L16.023,3.044Z",
      x: x, y: y,
      strokeWidth: 5,
      stroke: 'rgb(89,85,218)',
      fill: 'rgb(0,10,210)',
      scale: width / 50,
      opacity: dimmed ? .3 : 1 });
  },
  D: function D(_ref6) {
    var width = _ref6.width,
        x = _ref6.x,
        y = _ref6.y,
        dimmed = _ref6.dimmed;
    return closedPath({
      d: "M16.037,7.079L32.135,6.876L42.588,19.531L39.525,35.515L25.252,42.791L10.517,35.88L6.416,19.987L16.037,7.079Z",
      x: x, y: y,
      strokeWidth: 13,
      stroke: 'rgb(218,85,100)',
      fill: 'rgb(0,10,210)',
      scale: width / 50,
      opacity: dimmed ? .3 : 1 });
  },
  E: function E(_ref7) {
    var width = _ref7.width,
        x = _ref7.x,
        y = _ref7.y,
        dimmed = _ref7.dimmed;
    return closedPath({
      d: "M44.762,21.261L36.047,43.526L11.472,43.025L4.997,20.449L25.572,6.999L44.762,21.261Z",
      x: x, y: y,
      strokeWidth: 5,
      stroke: 'rgb(239,111,0)',
      fill: 'rgb(8,120,138)',
      scale: width / 50,
      opacity: dimmed ? .3 : 1 });
  },
  F: function F(_ref8) {
    var width = _ref8.width,
        x = _ref8.x,
        y = _ref8.y,
        dimmed = _ref8.dimmed;
    return closedPath({
      d: "M45.83,25.538L29.875,29.897L28.706,45.665L19.338,32.556L3.206,36.291L13.371,23.83L4.57,10.371L20.221,15.779L30.913,3.725L30.421,19.529L45.83,25.538Z",
      x: x, y: y,
      strokeWidth: 5,
      stroke: 'rgb(186,186,186)',
      fill: 'rgb(210,119,253)',
      scale: width / 50,
      opacity: dimmed ? .3 : 1 });
  }
};

var AminoAcid = function AminoAcid(_ref9) {
  var _ref9$type = _ref9.type,
      type = _ref9$type === undefined ? "A" : _ref9$type,
      _ref9$width = _ref9.width,
      width = _ref9$width === undefined ? 18 : _ref9$width,
      _ref9$x = _ref9.x,
      x = _ref9$x === undefined ? 0 : _ref9$x,
      _ref9$y = _ref9.y,
      y = _ref9$y === undefined ? 0 : _ref9$y,
      _ref9$dimmed = _ref9.dimmed,
      dimmed = _ref9$dimmed === undefined ? false : _ref9$dimmed;
  return aminoAcids[type]({ width: width, x: x, y: y, dimmed: dimmed });
};

AminoAcid.propTypes = {
  type: _propTypes2.default.string,
  width: _propTypes2.default.number,
  x: _propTypes2.default.number,
  y: _propTypes2.default.number,
  dimmed: _propTypes2.default.bool
};

exports.default = AminoAcid;