'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./amino-acid-slider.css');

var _aminoAcid = require('./amino-acid');

var _aminoAcid2 = _interopRequireDefault(_aminoAcid);

var _codon = require('./codon');

var _codon2 = _interopRequireDefault(_codon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var lastMouseDownTime = -1;
var maxClickTime = 500;

var chainMargin = 4; // space at start and end of chain
var aminoAcidMargin = 2; // space between AAs when no codons are showing
var codonMargin = 6; // space between codons

var AminoAcidSlider = function (_Component) {
  _inherits(AminoAcidSlider, _Component);

  function AminoAcidSlider(props) {
    _classCallCheck(this, AminoAcidSlider);

    var _this = _possibleConstructorReturn(this, (AminoAcidSlider.__proto__ || Object.getPrototypeOf(AminoAcidSlider)).call(this, props));

    _this.getXLocationOfAminoAcid = function (index) {
      // furthest left offset amino acid chain can be
      var maxAminoAcidLeftShift = _this.aminoAcidChainLength - _this.props.width;
      // current left shift
      var aminoAcidLeftShift = maxAminoAcidLeftShift * _this.travelPercent;

      return _this.aminoAcidSpacing * index - aminoAcidLeftShift + chainMargin;
    };

    _this.state = {
      dragging: false,
      draggingRel: null
    };

    _this.wrapperRef = _react2.default.createRef();
    _this.selectionRef = _react2.default.createRef();
    _this.dnaStringRef = _react2.default.createRef();

    _this.onMouseDown = _this.onMouseDown.bind(_this);
    _this.onMouseMove = _this.onMouseMove.bind(_this);
    _this.onMouseUp = _this.onMouseUp.bind(_this);
    _this.onClick = _this.onClick.bind(_this);
    _this.onAminoAcidSelection = _this.onAminoAcidSelection.bind(_this);
    return _this;
  }

  _createClass(AminoAcidSlider, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(props, state) {
      if (this.state.dragging && !state.dragging) {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
      } else if (!this.state.dragging && state.dragging) {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
      }
    }

    // calculate relative position to the mouse and set dragging=true

  }, {
    key: 'onMouseDown',
    value: function onMouseDown(evt) {
      // only left mouse button
      if (evt.button !== 0) return;

      this.setState({
        dragging: true,
        draggingXStart: evt.pageX,
        draggingInitialStartPercent: this.props.selectionStartPercent
      });
      evt.stopPropagation();
      evt.preventDefault();

      lastMouseDownTime = Date.now();
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(evt) {
      this.setState({ dragging: false });
      evt.stopPropagation();
      evt.preventDefault();
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(evt) {
      if (!this.state.dragging) return;

      var dx = evt.pageX - this.state.draggingXStart;
      var newStartPercent = this.state.draggingInitialStartPercent + dx / (this.props.width - this.actualSelectionWidth);

      var maxSelectionStartPercent = 1 - this.aminoAcidSelectionWidthPercent;

      this.props.updateSelectionStart(Math.max(0, Math.min(newStartPercent, maxSelectionStartPercent)));

      if (this.currentlySelectedAminoAcidIndex !== this.props.selectedAminoAcidIndex) {
        this.props.updateSelectedAminoAcidIndex(this.currentlySelectedAminoAcidIndex, this.getXLocationOfAminoAcid(this.currentlySelectedAminoAcidIndex));
      }

      evt.stopPropagation();
      evt.preventDefault();
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      // if it was to short
      if (Date.now() - lastMouseDownTime > maxClickTime) return;
      // or if we have stated dragging
      if (this.props.selectionStartPercent !== this.state.draggingInitialStartPercent) return;

      if (this.props.onClick) {
        this.props.onClick();
      }
    }
  }, {
    key: 'onAminoAcidSelection',
    value: function onAminoAcidSelection(index) {
      var _this2 = this;

      return function (evt) {
        _this2.props.updateSelectedAminoAcidIndex(index, _this2.getXLocationOfAminoAcid(index), true);
        evt.stopPropagation();
        evt.preventDefault();
      };
    }

    /** distance between amino acids */

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          aminoAcids = _props.aminoAcids,
          codons = _props.codons,
          selectedAminoAcidIndex = _props.selectedAminoAcidIndex,
          width = _props.width,
          aminoAcidWidth = _props.aminoAcidWidth,
          dnaFontHeight = _props.dnaFontHeight,
          highlightColor = _props.highlightColor,
          marks = _props.marks,
          showDNA = _props.showDNA,
          dimUnselected = _props.dimUnselected;


      var frameStyle = {
        width: width + 'px'
      };

      var acidMargin = 2; // space below amino acids

      // furthest right offset selection box can be
      var maxSelectionBoxRightShift = width - this.actualSelectionWidth;
      // current selection box right offset
      var selectionRightShift = maxSelectionBoxRightShift * this.travelPercent;
      // center AA image in each space
      var innerAminoAcidOffset = this.aminoAcidSpacing / 2 - aminoAcidWidth / 2;

      var wrapperClass = "amino-acid-slider";

      if (selectionRightShift > 10) {
        wrapperClass += " fade-left";
      }
      if (selectionRightShift < maxSelectionBoxRightShift - 10) {
        wrapperClass += " fade-right";
      }

      var selectStyle = {
        width: this.actualSelectionWidth + 'px',
        left: selectionRightShift + 'px'
      };
      if (highlightColor) {
        selectStyle.border = '1px solid rgb(' + highlightColor + ')';
        selectStyle.backgroundColor = 'rgba(' + highlightColor + ', 0.3)';
      }

      // Returns an array of images containing both the AA shape and, optionally, the codon below
      var aminoAcidImages = aminoAcids.split('').map(function (a, i) {
        var x = _this3.getXLocationOfAminoAcid(i);

        if (x < -_this3.aminoAcidSpacing || x > width) {
          return null;
        }

        // const codonOffset = chainOffset + i * (codonWidth + codonMargin);
        var dimmed = dimUnselected && selectedAminoAcidIndex !== i;
        var selected = marks.includes(i);
        return _react2.default.createElement(
          'g',
          { key: i, onClick: _this3.onAminoAcidSelection(i) },
          selected && _react2.default.createElement('rect', { x: x + innerAminoAcidOffset - 1, y: 1, width: aminoAcidWidth + 1, height: aminoAcidWidth + 2, style: { fill: "#33F", stroke: "#AAF", opacity: dimmed ? 0.4 : 1, strokeWidth: 2 } }),
          a !== "0" && a !== "1" && _react2.default.createElement(_aminoAcid2.default, { type: a, x: x + innerAminoAcidOffset, y: 2.5, width: aminoAcidWidth, dimmed: dimmed }),
          showDNA && _react2.default.createElement(_codon2.default, { dna: codons[i], x: x, y: aminoAcidWidth + acidMargin + dnaFontHeight, fontSize: dnaFontHeight, dimmed: dimmed })
        );
      });

      var svgHeight = aminoAcidWidth + acidMargin + 2;
      if (showDNA) {
        svgHeight += dnaFontHeight;
      }

      var chainLineStart = Math.max(0, this.getXLocationOfAminoAcid(0) + innerAminoAcidOffset + aminoAcidWidth / 2);
      var chainLineEnd = Math.min(width, this.getXLocationOfAminoAcid(aminoAcids.length - 2) + innerAminoAcidOffset + aminoAcidWidth / 2);

      return _react2.default.createElement(
        'div',
        { className: wrapperClass, style: frameStyle, ref: this.wrapperRef,
          onMouseDown: this.onMouseDown,
          onClick: this.onClick },
        _react2.default.createElement('div', {
          className: 'selection',
          style: selectStyle,
          ref: this.selectionRef
        }),
        _react2.default.createElement(
          'div',
          { className: 'amino-acids', ref: this.dnaStringRef },
          _react2.default.createElement(
            'svg',
            { width: width, height: svgHeight, viewBox: '0 0 ' + width + ' ' + svgHeight },
            _react2.default.createElement('path', { d: 'M' + chainLineStart + ',' + (aminoAcidWidth / 2 + 3) + 'L' + chainLineEnd + ',' + (aminoAcidWidth / 2 + 3), style: { stroke: '#AAA', strokeWidth: '2px', opacity: dimUnselected ? 0.4 : 1 } }),
            aminoAcidImages
          )
        )
      );
    }
  }, {
    key: 'aminoAcidSpacing',
    get: function get() {
      if (this.props.showDNA) {
        return this.props.codonWidth + codonMargin;
      } else {
        return this.props.aminoAcidWidth + aminoAcidMargin;
      }
    }

    /** length amino acid chain would be in fuly drawn, in pixels */

  }, {
    key: 'aminoAcidChainLength',
    get: function get() {
      return this.props.aminoAcids.length * this.aminoAcidSpacing + chainMargin * 2;
    }

    /** width of selection box in pixels, which depends on whether DNA is visible */

  }, {
    key: 'actualSelectionWidth',
    get: function get() {
      if (this.props.showDNA) {
        var noDNAChainLength = this.props.aminoAcids.length * (this.props.aminoAcidWidth + aminoAcidMargin) + chainMargin * 2;
        return this.props.selectionWidth * (this.aminoAcidChainLength / noDNAChainLength);
      } else {
        return this.props.selectionWidth;
      }
    }

    /** width of selection box, as a % of total amino acid chain */

  }, {
    key: 'aminoAcidSelectionWidthPercent',
    get: function get() {
      return this.actualSelectionWidth / this.aminoAcidChainLength;
    }

    /** distance along track user has dragged selection box. From 0 to 1.
     * cf `selectionStartPercent`, which is the left side of the selection box, and always < 1
     */

  }, {
    key: 'travelPercent',
    get: function get() {
      // value of `selectionStartPercent` when we're at far-right of window
      var maxSelectionStartPercent = 1 - this.aminoAcidSelectionWidthPercent;
      // percent selection box has been dragged across window, where far-right is 1.0
      return Math.min(this.props.selectionStartPercent / maxSelectionStartPercent, 1);
    }

    /** index of the single AA selected. This is usually the one closest to the center of the box, except near the ends where it's at the edge
     * of the selection box (or the ends would never be selected).
     */

  }, {
    key: 'currentlySelectedAminoAcidIndex',
    get: function get() {
      var _props2 = this.props,
          aminoAcids = _props2.aminoAcids,
          selectionStartPercent = _props2.selectionStartPercent;

      var aaIndexStart = (aminoAcids.length - 1) * selectionStartPercent;
      var numAAinSelectionBox = aminoAcids.length * this.aminoAcidSelectionWidthPercent;
      // Calculate position along selection box where AA is selected.
      // From 0-10% of travel, we go from the left edge to the center of the box. From 10-90% we stay at the center. From
      // 90-100% we move to the far right edge.
      var selectionPercentAlongBox = this.travelPercent < 0.1 ? this.travelPercent * 5 : this.travelPercent > 0.9 ? 0.5 + (this.travelPercent - 0.9) * 5 : 0.5;
      return Math.round(aaIndexStart + numAAinSelectionBox * selectionPercentAlongBox);
    }

    // returns x location within view of an amino acid, in pixels

  }]);

  return AminoAcidSlider;
}(_react.Component);

AminoAcidSlider.propTypes = {
  aminoAcids: _propTypes2.default.string,
  codons: _propTypes2.default.array,
  width: _propTypes2.default.number,
  aminoAcidWidth: _propTypes2.default.number,
  codonWidth: _propTypes2.default.number,
  selectionStartPercent: _propTypes2.default.number,
  selectionWidth: _propTypes2.default.number,
  selectedAminoAcidIndex: _propTypes2.default.number,
  highlightColor: _propTypes2.default.string,
  marks: _propTypes2.default.array,
  showDNA: _propTypes2.default.bool,
  dimUnselected: _propTypes2.default.bool,
  updateSelectionStart: _propTypes2.default.func,
  updateSelectedAminoAcidIndex: _propTypes2.default.func,
  onClick: _propTypes2.default.func
};

AminoAcidSlider.defaultProps = {
  aminoAcids: "",
  codons: [],
  width: 300,
  selectionWidth: 70,
  selectionStart: 0,
  aminoAcidWidth: 17,
  codonWidth: 29,
  showDNA: false,
  marks: [],
  dnaFontHeight: 16
};

exports.default = AminoAcidSlider;