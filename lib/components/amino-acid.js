'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _aminoAcidUtils = require('../util/amino-acid-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// dimensions of the viewBox the original images
var originalWidth = 100;

var aminoAcidElements = {
  A: _react2.default.createElement('rect', { x: '15.88', y: '30', width: '68.23', height: '40', rx: '3', ry: '3', style: { fill: (0, _aminoAcidUtils.getAminoAcidColor)('A') } }),
  C: _react2.default.createElement('ellipse', { cx: '50', cy: '50', rx: '38.82', ry: '21.76', style: { fill: (0, _aminoAcidUtils.getAminoAcidColor)('C') } }),
  D: _react2.default.createElement('path', { d: 'M11.58,52.69,71,82.14a3,3,0,0,0,4.33-2.69V20.55A3,3,0,0,0,71,17.86L11.58,47.31A3,3,0,0,0,11.58,52.69Z', style: { fill: (0, _aminoAcidUtils.getAminoAcidColor)('D') } }),
  E: _react2.default.createElement('path', { d: 'M50,17.83a3.14,3.14,0,0,1,3.47-3.11,35.47,35.47,0,0,1,0,70.56A3.14,3.14,0,0,1,50,82.17Z', style: { fill: (0, _aminoAcidUtils.getAminoAcidColor)('E') } }),
  F: _react2.default.createElement('circle', { cx: '50', cy: '50', r: '33.53', style: { fill: (0, _aminoAcidUtils.getAminoAcidColor)('F') } }),
  G: _react2.default.createElement('path', { d: 'M17.83,50a3.14,3.14,0,0,1-3.11-3.47,35.47,35.47,0,0,1,70.56,0A3.14,3.14,0,0,1,82.17,50Z', style: { fill: (0, _aminoAcidUtils.getAminoAcidColor)('G') } }),
  H: _react2.default.createElement('path', { d: 'M50,82.17a3.14,3.14,0,0,1-3.47,3.11,35.47,35.47,0,0,1,0-70.56A3.14,3.14,0,0,1,50,17.83Z', style: { fill: (0, _aminoAcidUtils.getAminoAcidColor)('H') } }),
  I: _react2.default.createElement('path', { d: 'M75.47,79.83l.27-46.95A3,3,0,0,0,73.55,30L28.34,17.3a3,3,0,0,0-3.81,2.87l-.27,47A3,3,0,0,0,26.45,70L71.66,82.7A3,3,0,0,0,75.47,79.83Z', style: { fill: (0, _aminoAcidUtils.getAminoAcidColor)('I') } }),
  K: _react2.default.createElement('path', { d: 'M88.42,47.31,29,17.86a3,3,0,0,0-4.33,2.69v58.9A3,3,0,0,0,29,82.14l59.4-29.45A3,3,0,0,0,88.42,47.31Z', style: { fill: (0, _aminoAcidUtils.getAminoAcidColor)('K') } }),
  L: _react2.default.createElement('ellipse', { cx: '50', cy: '50', rx: '21.76', ry: '38.82', style: { fill: (0, _aminoAcidUtils.getAminoAcidColor)('L') } }),
  M: _react2.default.createElement('path', { d: 'M47.31,11.58,17.86,71a3,3,0,0,0,2.69,4.33h58.9A3,3,0,0,0,82.14,71L52.69,11.58A3,3,0,0,0,47.31,11.58Z', style: { fill: (0, _aminoAcidUtils.getAminoAcidColor)('M') } }),
  N: _react2.default.createElement('path', { d: 'M52.69,88.42,82.14,29a3,3,0,0,0-2.69-4.33H20.55A3,3,0,0,0,17.86,29l29.45,59.4A3,3,0,0,0,52.69,88.42Z', style: { fill: (0, _aminoAcidUtils.getAminoAcidColor)('N') } }),
  P: _react2.default.createElement('path', { d: 'M85.29,50A35.29,35.29,0,1,1,50,14.71,35.29,35.29,0,0,1,85.29,50ZM50,33.55A16.45,16.45,0,1,0,66.45,50,16.44,16.44,0,0,0,50,33.55Z', style: { fill: (0, _aminoAcidUtils.getAminoAcidColor)('P') } }),
  Q: _react2.default.createElement('path', { d: 'M23.81,79.83l-.27-46.95A3,3,0,0,1,25.73,30L70.93,17.3a3,3,0,0,1,3.81,2.87l.27,47A3,3,0,0,1,72.82,70L27.62,82.7A3,3,0,0,1,23.81,79.83Z', style: { fill: (0, _aminoAcidUtils.getAminoAcidColor)('Q') } }),
  R: _react2.default.createElement('rect', { x: '30', y: '15.88', width: '40', height: '68.23', rx: '3', ry: '3', style: { fill: (0, _aminoAcidUtils.getAminoAcidColor)('R') } }),
  S: _react2.default.createElement('path', { d: 'M82.17,50a3.14,3.14,0,0,1,3.11,3.47,35.47,35.47,0,0,1-70.56,0A3.14,3.14,0,0,1,17.83,50Z', style: { fill: (0, _aminoAcidUtils.getAminoAcidColor)('S') } }),
  T: _react2.default.createElement('rect', { x: '21.76', y: '21.76', width: '56.47', height: '56.47', rx: '3', ry: '3', style: { fill: (0, _aminoAcidUtils.getAminoAcidColor)('T') } }),
  V: _react2.default.createElement('path', { d: 'M52.39,89.15,80.86,51.82a3,3,0,0,0,0-3.64L52.39,10.85a3,3,0,0,0-4.78,0L19.14,48.18a3,3,0,0,0,0,3.64L47.61,89.15A3,3,0,0,0,52.39,89.15Z', style: { fill: (0, _aminoAcidUtils.getAminoAcidColor)('V') } }),
  W: _react2.default.createElement('path', { d: 'M48.1,13.21l-30.59,25a3,3,0,0,0-1,3.07l8.87,34.4A3,3,0,0,0,28.28,78H71.72a3,3,0,0,0,2.9-2.25l8.87-34.4a3,3,0,0,0-1-3.07l-30.59-25A3,3,0,0,0,48.1,13.21Z', style: { fill: (0, _aminoAcidUtils.getAminoAcidColor)('W') } }),
  Y: _react2.default.createElement('path', { d: 'M48.5,14.19,19.74,30.79a3,3,0,0,0-1.5,2.6V66.61a3,3,0,0,0,1.5,2.6L48.5,85.81a3,3,0,0,0,3,0l28.76-16.6a3,3,0,0,0,1.5-2.6V33.39a3,3,0,0,0-1.5-2.6L51.5,14.19A3,3,0,0,0,48.5,14.19Z', style: { fill: (0, _aminoAcidUtils.getAminoAcidColor)('Y') } })
};

var AminoAcid = function AminoAcid(_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === undefined ? "A" : _ref$type,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? 18 : _ref$width,
      _ref$x = _ref.x,
      x = _ref$x === undefined ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === undefined ? 0 : _ref$y,
      _ref$dimmed = _ref.dimmed,
      dimmed = _ref$dimmed === undefined ? false : _ref$dimmed;
  return _react2.default.createElement(
    'g',
    { style: { opacity: dimmed ? 0.4 : 1 }, transform: 'scale(' + width / originalWidth + ') translate(' + x / (width / originalWidth) + ', ' + y / (width / originalWidth) + ')' },
    _react2.default.createElement('circle', { id: 'AA back', 'data-name': 'AA back', cx: originalWidth / 2, cy: originalWidth / 2, r: originalWidth / 2, style: { fill: "rgb(135, 146, 157)" } }),
    _react2.default.createElement(
      'g',
      { id: 'AA shape' },
      aminoAcidElements[type]
    )
  );
};

AminoAcid.propTypes = {
  type: _propTypes2.default.string,
  width: _propTypes2.default.number,
  x: _propTypes2.default.number,
  y: _propTypes2.default.number,
  dimmed: _propTypes2.default.bool
};

exports.default = AminoAcid;