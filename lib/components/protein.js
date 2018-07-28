'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _svgPathProperties = require('svg-path-properties');

var _svgUtils = require('../util/svg-utils');

var _svgUtils2 = _interopRequireDefault(_svgUtils);

var _aminoAcidUtils = require('../util/amino-acid-utils');

require('./protein.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Protein = function Protein(props) {
  var svgModel = (0, _svgUtils2.default)(props.svg);

  var highlightPath = svgModel.querySelector('#highlight-path').cloneNode();
  var highlightProps = (0, _svgPathProperties.svgPathProperties)(highlightPath.getAttribute("d"));
  var highlightPathTotalLength = highlightProps.getTotalLength();
  var selectionLength = highlightPathTotalLength * props.selectionPercent;
  highlightPath.setAttribute("style", 'fill:none;stroke:rgba(' + props.highlightColor + ', 0.6);stroke-width:22px;');
  highlightPath.setAttribute("stroke-dasharray", selectionLength + " " + highlightPathTotalLength);

  var selectionLeft = highlightPathTotalLength * props.selectionStartPercent;
  highlightPath.setAttribute("stroke-dashoffset", 0 - selectionLeft);

  var s = new XMLSerializer();
  var highlight = s.serializeToString(highlightPath);

  var marks = props.marks.map(function (loc) {
    var dist = loc * highlightPathTotalLength;
    var point = highlightProps.getPointAtLength(dist);
    var point1 = highlightProps.getPointAtLength(dist - 5);
    var point2 = highlightProps.getPointAtLength(dist + 5);
    var angle = Math.atan2(point2.y - point1.y, point2.x - point1.x);
    var length = 10;
    var d = 'M ' + (Math.sin(angle) * length + point.x) + ' ' + (-Math.cos(angle) * length + point.y) + ', L ' + (-Math.sin(angle) * length + point.x) + ' ' + (Math.cos(angle) * length + point.y);

    return _react2.default.createElement('path', { key: loc, d: d, style: { stroke: "#33F", strokeWidth: 3 } });
  });

  var dots = void 0;
  if (props.showAminoAcids) {
    dots = props.aminoAcids.split('').map(function (aa, i) {
      if (aa === "0") return null;
      var color = (0, _aminoAcidUtils.getAminoAcidColor)(aa);
      var dist = i / props.aminoAcids.length * highlightPathTotalLength;
      var point = highlightProps.getPointAtLength(dist);

      return _react2.default.createElement('circle', { key: i, cx: point.x, cy: point.y, r: 2, style: { fill: color, stroke: "#222", strokeWidth: 0.5 } });
    });
  }

  var svgEl = null;

  var onClick = function onClick(evt) {
    var pt = svgEl.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    var svgPt = pt.matrixTransform(svgEl.getScreenCTM().inverse());
    var closestPoint = (0, _svgUtils.closestPointOnPath)(svgPt, highlightProps);
    if (closestPoint.distance > 20) {
      // too far
      return;
    }
    var perc = closestPoint.length / highlightPathTotalLength;
    perc = perc - props.selectionPercent / 2;
    perc = Math.max(0, Math.min(perc, 1 - props.selectionPercent));
    props.updateSelectionStart(perc);
  };

  return _react2.default.createElement(
    'div',
    { className: 'protein' },
    _react2.default.createElement(
      'svg',
      { ref: function ref(el) {
          svgEl = el;
        }, viewBox: props.viewBox, width: props.width, height: props.width, onClick: onClick },
      _react2.default.createElement('g', { dangerouslySetInnerHTML: { __html: props.svg } }),
      _react2.default.createElement('g', { dangerouslySetInnerHTML: { __html: highlight } }),
      marks,
      dots
    )
  );
};

Protein.propTypes = {
  svg: _propTypes2.default.string,
  viewBox: _propTypes2.default.string,
  width: _propTypes2.default.number,
  selectionStartPercent: _propTypes2.default.number,
  selectionPercent: _propTypes2.default.number,
  highlightColor: _propTypes2.default.string,
  marks: _propTypes2.default.array,
  aminoAcids: _propTypes2.default.string,
  showAminoAcids: _propTypes2.default.bool,
  updateSelectionStart: _propTypes2.default.func
};

Protein.defaultProps = {
  highlightColor: "255, 255, 0",
  marks: []
};

exports.default = Protein;