'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Codon = function Codon(_ref) {
  var _ref$dna = _ref.dna,
      dna = _ref$dna === undefined ? "GAC" : _ref$dna,
      _ref$x = _ref.x,
      x = _ref$x === undefined ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === undefined ? 0 : _ref$y,
      _ref$dimmed = _ref.dimmed,
      dimmed = _ref$dimmed === undefined ? false : _ref$dimmed,
      _ref$fontSize = _ref.fontSize,
      fontSize = _ref$fontSize === undefined ? 16 : _ref$fontSize;
  return _react2.default.createElement(
    'text',
    { x: x, y: y, opacity: dimmed ? .3 : 1, style: { fontSize: fontSize } },
    dna.toUpperCase()
  );
};

Codon.propTypes = {
  dna: _propTypes2.default.string,
  x: _propTypes2.default.number,
  y: _propTypes2.default.number,
  fontSize: _propTypes2.default.number,
  dimmed: _propTypes2.default.bool
};

exports.default = Codon;