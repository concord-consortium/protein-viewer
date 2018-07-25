'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _svgPathProperties = require('svg-path-properties');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./protein.css');

var _parseSvg = require('../util/parse-svg');

var _parseSvg2 = _interopRequireDefault(_parseSvg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// FIXME:
var selectionLength = 60;

var Protein = function (_Component) {
  _inherits(Protein, _Component);

  function Protein(props) {
    _classCallCheck(this, Protein);

    var _this = _possibleConstructorReturn(this, (Protein.__proto__ || Object.getPrototypeOf(Protein)).call(this, props));

    var svgModel = (0, _parseSvg2.default)(_this.props.svg);

    var highlightPath = svgModel.querySelector('#highlight-path').cloneNode();
    var highlightProps = (0, _svgPathProperties.svgPathProperties)(highlightPath.getAttribute("d"));
    var highlightPathLength = highlightProps.getTotalLength();
    highlightPath.setAttribute("style", 'fill:none;stroke:rgba(' + _this.props.highlightColor + ', 0.6);stroke-width:22px;');
    highlightPath.setAttribute("stroke-dasharray", selectionLength + " " + highlightPathLength);

    _this.state = {
      selectionLeft: 0,
      highlightPath: highlightPath,
      highlightPathLength: highlightPathLength
    };
    return _this;
  }

  _createClass(Protein, [{
    key: 'render',
    value: function render() {
      this.state.highlightPath.setAttribute("stroke-dashoffset", 0 - this.state.selectionLeft);
      var s = new XMLSerializer();
      var highlight = s.serializeToString(this.state.highlightPath);

      var highlightProps = (0, _svgPathProperties.svgPathProperties)(this.state.highlightPath.getAttribute("d"));
      var highlightPathLength = highlightProps.getTotalLength();

      var marks = this.props.marks.map(function (loc) {
        var dist = loc * highlightPathLength;
        var point = highlightProps.getPointAtLength(dist);
        var point1 = highlightProps.getPointAtLength(dist - 5);
        var point2 = highlightProps.getPointAtLength(dist + 5);
        var angle = Math.atan2(point2.y - point1.y, point2.x - point1.x);
        var length = 10;
        var d = 'M ' + (Math.sin(angle) * length + point.x) + ' ' + (-Math.cos(angle) * length + point.y) + ', L ' + (-Math.sin(angle) * length + point.x) + ' ' + (Math.cos(angle) * length + point.y);

        return _react2.default.createElement('path', { key: loc, d: d, style: { stroke: "#33F", strokeWidth: 3 } });
      });

      return _react2.default.createElement(
        'div',
        { className: 'protein' },
        _react2.default.createElement(
          'svg',
          { viewBox: this.props.viewBox, width: this.props.width },
          _react2.default.createElement('g', { dangerouslySetInnerHTML: { __html: this.props.svg } }),
          _react2.default.createElement('g', { dangerouslySetInnerHTML: { __html: highlight } }),
          marks
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props, state) {
      var maxLeft = state.highlightPathLength - selectionLength;
      var selectionLeft = props.selectionStart * maxLeft;
      return {
        selectionLeft: selectionLeft
      };
    }
  }]);

  return Protein;
}(_react.Component);

Protein.propTypes = {
  svg: _propTypes2.default.string,
  highlightColor: _propTypes2.default.string,
  marks: _propTypes2.default.array
};

Protein.defaultProps = {
  highlightColor: "255, 255, 0",
  marks: []
};

exports.default = Protein;