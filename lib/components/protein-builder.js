'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _aminoAcidSlider = require('./amino-acid-slider');

var _aminoAcidSlider2 = _interopRequireDefault(_aminoAcidSlider);

var _FormControlLabel = require('@material-ui/core/FormControlLabel');

var _FormControlLabel2 = _interopRequireDefault(_FormControlLabel);

var _Checkbox = require('@material-ui/core/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _svgPathProperties = require('svg-path-properties');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _svgUtils = require('../util/svg-utils');

var _svgUtils2 = _interopRequireDefault(_svgUtils);

var _dnaUtils = require('../util/dna-utils');

var _aminoAcidUtils = require('../util/amino-acid-utils');

require('./protein-builder.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// we will need a way to calculate these hard-code values one we start
// having proteins with different dimensions.
var svgViewBoxWidth = 400;
var svgViewBoxHeight = 400;
var svgRibosomeEndX = 300;
var svgRnaY = 250;
var svgWidth = 440;
var svgHeight = 330;

function generateFloatingAAs(len) {
  return new Array(len).fill().map(function () {
    var rand = Math.random();
    var randomType = rand < 0.25 ? _aminoAcidUtils.aminoAcidTypes.Polar : rand < 0.5 ? _aminoAcidUtils.aminoAcidTypes.Hydrophobic : rand < 0.75 ? _aminoAcidUtils.aminoAcidTypes.Positive : _aminoAcidUtils.aminoAcidTypes.Negative;
    return {
      x: Math.random() * svgViewBoxWidth,
      y: Math.random() * svgViewBoxHeight,
      vx: 1 - Math.random() * 2,
      vy: 1 - Math.random() * 2,
      color: randomType.color
    };
  });
}

function moveFloatingAAs(aas) {
  return aas.map(function (aa) {
    if (aa.x < 0 || aa.x > svgViewBoxWidth) {
      aa.vx *= -1;
    }
    if (aa.y < 0 || aa.y > svgViewBoxHeight) {
      aa.vy *= -1;
    }
    aa.x += aa.vx;
    aa.y += aa.vy;
    return aa;
  });
}

var ProteinBuilder = function (_Component) {
  _inherits(ProteinBuilder, _Component);

  function ProteinBuilder(props) {
    _classCallCheck(this, ProteinBuilder);

    var _this = _possibleConstructorReturn(this, (ProteinBuilder.__proto__ || Object.getPrototypeOf(ProteinBuilder)).call(this, props));

    var svgModel = (0, _svgUtils2.default)(_this.props.svgImage);

    var highlightPath = svgModel.querySelector('#highlight-path');
    var highlightProps = (0, _svgPathProperties.svgPathProperties)(highlightPath.getAttribute("d"));
    var highlightPathLength = highlightProps.getTotalLength();

    var floatingAAs = generateFloatingAAs(50);

    _this.state = {
      percentComplete: 0,
      animating: false,
      highlightPath: highlightPath,
      highlightProps: highlightProps,
      highlightPathLength: highlightPathLength,
      floatingAAs: floatingAAs
    };

    _this.handleUpdateSelectionStart = _this.handleUpdateSelectionStart.bind(_this);
    _this.startAnimation = _this.startAnimation.bind(_this);
    _this.resetAnimation = _this.resetAnimation.bind(_this);
    _this.animate = _this.animate.bind(_this);
    return _this;
  }

  _createClass(ProteinBuilder, [{
    key: 'handleUpdateSelectionStart',
    value: function handleUpdateSelectionStart(selectionStart) {
      var percentCompleteRequested = selectionStart * 0.8;

      var newState = {
        percentComplete: percentCompleteRequested
      };

      if (this.props.showAminoAcids) {
        newState.floatingAAs = moveFloatingAAs(this.state.floatingAAs);
      }

      this.setState(newState);
    }
  }, {
    key: 'startAnimation',
    value: function startAnimation() {
      var _state = this.state,
          animating = _state.animating,
          percentComplete = _state.percentComplete;

      if (!animating) {
        this.setState({
          percentComplete: percentComplete === 1 ? 0 : percentComplete,
          animating: true
        }, this.animate);
      }
    }
  }, {
    key: 'resetAnimation',
    value: function resetAnimation() {
      this.setState({
        percentComplete: 0,
        animating: false
      });
    }
  }, {
    key: 'animate',
    value: function animate() {
      var _state2 = this.state,
          percentComplete = _state2.percentComplete,
          animating = _state2.animating;

      if (!animating) return;

      var nextStep = Math.min(percentComplete + this.props.speed, 1);

      var newState = {
        percentComplete: nextStep
      };

      if (this.props.showAminoAcids) {
        newState.floatingAAs = moveFloatingAAs(this.state.floatingAAs);
      }

      this.setState(newState);

      if (nextStep < 1) {
        window.requestAnimationFrame(this.animate);
      } else {
        this.setState({
          percentComplete: 1,
          animating: false
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state3 = this.state,
          highlightPath = _state3.highlightPath,
          highlightProps = _state3.highlightProps,
          highlightPathLength = _state3.highlightPathLength,
          percentComplete = _state3.percentComplete;


      var codons = (0, _dnaUtils.extractCodons)(this.props.dna);
      var aminoAcids = (0, _aminoAcidUtils.getAminoAcidsFromCodons)(codons);

      var buildingPercent = Math.min(percentComplete / 0.8, 1);
      var floatingPercent = Math.max(0, Math.min((percentComplete - 0.8) / 0.2, 1));

      var currentPathPoint = highlightPathLength * buildingPercent;
      highlightPath.setAttribute("stroke-dasharray", highlightPathLength);
      highlightPath.setAttribute("stroke-dashoffset", highlightPathLength - currentPathPoint);
      var s = new XMLSerializer();
      var highlight = s.serializeToString(highlightPath);

      var loc = currentPathPoint;
      var locBefore = Math.max(0, loc - 1);
      var locAfter = Math.min(loc + 1, highlightPathLength);

      var point = highlightProps.getPointAtLength(loc);
      var pointBefore = highlightProps.getPointAtLength(locBefore);
      var pointAfter = highlightProps.getPointAtLength(locAfter);
      var angle = Math.atan2(pointAfter.y - pointBefore.y, pointAfter.x - pointBefore.x);
      var angleDeg = angle * (180 / Math.PI);

      // angle we want protein chain sticking out
      var angleOffset = 200;

      var angleOfProtein = angleDeg + angleOffset;

      // undo spin while floting away
      angleOfProtein += floatingPercent * (360 - angleOfProtein);
      // move center of spin towards center of protein as we float away
      var rotX = floatingPercent * -(svgViewBoxWidth / 4);
      var rotY = floatingPercent * -(svgViewBoxHeight / 4);

      var transform = 'rotate(' + angleOfProtein + ', ' + rotX + ', ' + rotY + ') translate(' + -point.x + ' ' + -point.y + ')';

      var xLoc = svgRibosomeEndX * buildingPercent;

      var yOffset = svgRnaY;

      var aaLength = aminoAcids.length;
      var aaVisibleLength = Math.floor(aaLength * buildingPercent);
      var currentAminoAcids = aminoAcids.substr(0, aaVisibleLength) + "0".repeat(aaLength - aaVisibleLength);

      var totalLength = highlightProps.getTotalLength();
      var dots = void 0,
          floatingDots = void 0;
      if (this.props.showAminoAcids) {
        dots = aminoAcids.substr(0, aaVisibleLength).split('').map(function (aa, i) {
          if (aa === "0") return null;
          var color = (0, _aminoAcidUtils.getAminoAcidColor)(aa);
          var dist = i / aminoAcids.length * totalLength;
          var point = highlightProps.getPointAtLength(dist);

          return _react2.default.createElement('circle', { key: i, cx: point.x, cy: point.y, r: 2, style: { fill: color, stroke: "#222", strokeWidth: 0.5 } });
        });

        floatingDots = this.state.floatingAAs.map(function (aa, i) {
          return _react2.default.createElement('circle', { key: i, cx: aa.x, cy: aa.y, r: 2, style: { fill: aa.color, stroke: "#222", strokeWidth: 0.5 } });
        });
      }

      var sliderSelectionWidth = 70;
      var aminoAcidWidth = 17;
      var sliderSelectionPercent = sliderSelectionWidth / (aminoAcids.length * aminoAcidWidth);

      return _react2.default.createElement(
        'div',
        { className: 'protein-builder' },
        _react2.default.createElement(
          'svg',
          { viewBox: '0 0 ' + svgViewBoxWidth + ' ' + svgViewBoxHeight, width: svgWidth, height: svgHeight },
          floatingDots,
          _react2.default.createElement(
            'g',
            { transform: 'translate(-20, ' + yOffset + ') scale(1.5)' },
            _react2.default.createElement('path', { id: 'mRNA', style: { stroke: "#555", fill: "none", strokeDasharray: "4, 1" }, d: 'M 0 2.844 C 0 2.844 51.518 6.698 79.635 7.394 C 113.872 8.242 139.823 1.352 167.804 1.137 C 193.849 0.937 219.694 7.387 245.733 6.826 C 265.391 6.402 304.323 0 304.323 0' })
          ),
          _react2.default.createElement(
            'g',
            { transform: 'translate(' + xLoc + ', ' + yOffset + ')' },
            _react2.default.createElement(
              'g',
              null,
              _react2.default.createElement('path', {
                d: 'M 43.274 -32.784 C 47.421 -32.784 50.877 -31.749 53.642 -29.674 C 55.026 -32.439 58.482 -33.477 64.011 -32.784 C 68.851 -32.784 72.307 -30.711 74.381 -26.562 C 74.381 -25.871 74.726 -25.526 75.418 -25.526 C 77.491 -28.983 81.294 -30.711 86.824 -30.711 C 91.662 -30.711 95.119 -28.636 97.193 -24.489 C 99.267 -23.106 100.303 -21.033 100.303 -18.268 C 104.452 -18.959 107.217 -17.231 108.599 -13.083 C 110.673 -11.009 111.712 -7.553 111.712 -2.713 C 111.712 9.037 108.253 17.333 101.34 22.173 C 97.884 24.937 92.7 25.974 85.787 25.283 C 83.713 23.209 80.603 22.173 76.454 22.173 C 72.998 27.011 67.123 28.739 58.827 27.357 C 53.989 26.665 50.532 25.283 48.458 23.209 C 45.002 28.048 39.471 30.467 31.868 30.467 C 27.028 30.467 23.918 29.085 22.535 26.32 C 18.388 30.467 12.512 32.542 4.906 32.542 C -10.993 32.542 -22.399 28.739 -29.312 21.136 C -31.386 19.061 -32.423 15.951 -32.423 11.803 C -29.658 9.037 -28.621 4.89 -29.312 -0.64 C -30.003 -1.331 -30.349 -2.368 -30.349 -3.75 C -30.349 -9.281 -28.274 -13.083 -24.127 -15.156 C -22.744 -15.156 -22.053 -15.502 -22.053 -16.193 C -20.671 -21.724 -17.906 -25.526 -13.758 -27.599 C -11.684 -30.365 -7.537 -31.402 -1.315 -30.711 C 3.525 -30.018 7.671 -28.29 11.128 -25.526 C 13.203 -28.983 17.006 -30.711 22.535 -30.711 C 26.683 -30.711 29.793 -29.327 31.868 -26.562 C 33.941 -30.018 37.743 -32.093 43.274 -32.784 Z',
                style: { fill: "#c4a25d", stroke: "#b89450", strokeWidth: "2px" } })
            ),
            _react2.default.createElement(
              'g',
              { transform: 'translate(' + (0 - 100 * floatingPercent) + ', ' + (0 - 80 * floatingPercent) + ')' },
              _react2.default.createElement(
                'g',
                { transform: transform },
                _react2.default.createElement('g', { dangerouslySetInnerHTML: { __html: highlight } }),
                dots
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'amino-acids' },
          _react2.default.createElement(_aminoAcidSlider2.default, {
            aminoAcids: currentAminoAcids,
            codons: codons,
            width: this.props.sliderWidth,
            aminoAcidWidth: aminoAcidWidth,
            selectionWidth: sliderSelectionWidth,
            selectionStartPercent: Math.max(0, buildingPercent - sliderSelectionPercent / 2),
            updateSelectionStart: this.handleUpdateSelectionStart,
            selectedAminoAcidIndex: this.state.selectedAminoAcidIndex,
            updateSelectedAminoAcidIndex: function updateSelectedAminoAcidIndex() {},
            onClick: this.handleAminoAcidSliderClick,
            showDNA: true,
            dimUnselected: false,
            highlightColor: '196, 162, 93'
          })
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'button',
            { onClick: this.startAnimation },
            'Go'
          ),
          _react2.default.createElement(
            'button',
            { onClick: this.resetAnimation },
            'Reset'
          )
        ),
        _react2.default.createElement(_FormControlLabel2.default, {
          control: _react2.default.createElement(_Checkbox2.default, {
            checked: this.props.showAminoAcids,
            onChange: this.props.handleAminoAcidsToggle
          }),
          label: 'Show Amino Acids on Protein'
        })
      );
    }
  }]);

  return ProteinBuilder;
}(_react.Component);

ProteinBuilder.propTypes = {
  dna: _propTypes2.default.string,
  svgImage: _propTypes2.default.string,
  speed: _propTypes2.default.number,
  sliderWidth: _propTypes2.default.number,
  showAminoAcids: _propTypes2.default.bool,
  handleAminoAcidsToggle: _propTypes2.default.func
};

exports.default = ProteinBuilder;