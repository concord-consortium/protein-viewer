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

var AminoAcidSlider = function (_Component) {
  _inherits(AminoAcidSlider, _Component);

  function AminoAcidSlider(props) {
    _classCallCheck(this, AminoAcidSlider);

    var _this = _possibleConstructorReturn(this, (AminoAcidSlider.__proto__ || Object.getPrototypeOf(AminoAcidSlider)).call(this, props));

    _this.state = {
      selectionLeft: 0,
      allelesWidth: 0,
      allelesOffset: 0,
      dragging: false,
      draggingRel: null
    };

    _this.wrapperRef = _react2.default.createRef();
    _this.selectionRef = _react2.default.createRef();
    _this.alleleStringRef = _react2.default.createRef();

    // this.aa_a = aa_a;
    // debugger

    _this.onMouseDown = _this.onMouseDown.bind(_this);
    _this.onMouseMove = _this.onMouseMove.bind(_this);
    _this.onMouseUp = _this.onMouseUp.bind(_this);
    _this.onClick = _this.onClick.bind(_this);
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

      if (this.state.allelesWidth !== this.alleleStringRef.current.scrollWidth) {
        this.setState({
          allelesWidth: this.alleleStringRef.current.scrollWidth
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        allelesWidth: this.alleleStringRef.current.scrollWidth
      });
    }
  }, {
    key: 'onMouseDown',


    // calculate relative position to the mouse and set dragging=true
    value: function onMouseDown(evt) {
      // only left mouse button
      if (evt.button !== 0) return;
      var elLoc = this.selectionRef.current.getBoundingClientRect();
      this.setState({
        dragging: true,
        draggingRel: {
          x: evt.pageX - elLoc.left
        }
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
      var elLoc = this.wrapperRef.current.getBoundingClientRect();
      var left = evt.pageX - this.state.draggingRel.x - elLoc.left;

      var maxLeft = this.props.width - this.props.selectionWidth;
      var percLeft = Math.max(0, Math.min(left / maxLeft, 1));
      this.props.updateSelectionStart(percLeft);
      evt.stopPropagation();
      evt.preventDefault();
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      if (Date.now() - lastMouseDownTime > maxClickTime) return;

      if (this.props.onClick) {
        this.props.onClick();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var wrapperClass = "amino-acid-slider";
      //FIXME
      if (this.state.selectionLeft > 10) {
        wrapperClass += " fade-left";
      }
      var maxLeft = this.props.width - this.props.selectionWidth;
      if (this.state.selectionLeft < maxLeft - 10) {
        wrapperClass += " fade-right";
      }

      var frameStyle = {
        width: this.props.width + 'px'
      };

      var selectStyle = {
        width: this.props.selectionWidth + 'px',
        left: this.state.selectionLeft + 'px'
      };
      if (this.props.highlightColor) {
        selectStyle.border = '1px solid rgb(' + this.props.highlightColor + ')';
        selectStyle.backgroundColor = 'rgba(' + this.props.highlightColor + ', 0.3)';
      }

      var allelesStyle = {
        left: '-' + this.state.allelesOffset + 'px'
      };

      var acidWidth = 17;
      var acidHeight = 15;
      var fontHeight = 16; // this is the font maximum
      var acidMargin = 2; // space below amino acids
      var codonWidth = this.props.showAlleles ? 29 : acidWidth;
      var codonMargin = codonWidth * 0.1; // space between codons
      var chainOffset = 9; // space before the acid chain starts

      var location = Math.floor((this.props.aminoAcids.length - 1) * this.props.selectionStart);
      var AminoAcids = this.props.aminoAcids.split('').map(function (a, i) {
        var codonOffset = chainOffset + i * (codonWidth + codonMargin);
        var dimmed = _this2.props.dimUnselected && location !== i;
        return _react2.default.createElement(
          'g',
          { key: i },
          _react2.default.createElement(_aminoAcid2.default, { type: a, x: codonOffset + (codonWidth - acidWidth) / 2, y: 0, width: acidWidth, dimmed: dimmed }),
          _this2.props.showAlleles && _react2.default.createElement(_codon2.default, { dna: _this2.props.alleles.substring(i * 3, (i + 1) * 3), x: codonOffset, y: acidHeight + acidMargin + fontHeight, dimmed: dimmed })
        );
      });

      var marks = this.props.marks.map(function (loc) {
        return _react2.default.createElement('rect', { key: loc, x: acidWidth / 2 + loc * (acidWidth * 1.1) - 1, y: '1', width: '19', height: '20', style: { fill: "#33F", stroke: "#AAF", strokeWidth: 2 } });
      });

      var svgHeight = acidHeight + acidMargin;
      if (this.props.showAlleles) {
        svgHeight += fontHeight;
      }
      var svgWidth = (codonWidth + codonMargin) * this.props.aminoAcids.length + chainOffset;
      return _react2.default.createElement(
        'div',
        { className: wrapperClass, style: frameStyle, ref: this.wrapperRef },
        _react2.default.createElement('div', {
          className: 'selection',
          style: selectStyle,
          ref: this.selectionRef,
          onMouseDown: this.onMouseDown,
          onClick: this.onClick
        }),
        _react2.default.createElement(
          'div',
          { className: 'amino-acids', style: allelesStyle, ref: this.alleleStringRef },
          _react2.default.createElement(
            'svg',
            { width: svgWidth, height: svgHeight, viewBox: '0 0 ' + svgWidth + ' ' + svgHeight },
            _react2.default.createElement('path', { d: 'M' + chainOffset + ',9L' + (svgWidth - chainOffset) + ',9', style: { stroke: '#AAA', strokeWidth: '2px' } }),
            marks,
            AminoAcids
          )
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props, state) {
      var maxLeft = props.width - props.selectionWidth;
      var selectionLeft = props.selectionStart * maxLeft;
      var maxAllelesOffset = state.allelesWidth - props.width;
      return {
        allelesOffset: Math.floor(maxAllelesOffset * props.selectionStart),
        selectionLeft: selectionLeft
      };
    }
  }]);

  return AminoAcidSlider;
}(_react.Component);

AminoAcidSlider.propTypes = {
  aminoAcids: _propTypes2.default.string,
  alleles: _propTypes2.default.string,
  width: _propTypes2.default.number,
  selectionStart: _propTypes2.default.number,
  selectionWidth: _propTypes2.default.number,
  highlightColor: _propTypes2.default.string,
  updateSelectionStart: _propTypes2.default.func,
  showAlleles: _propTypes2.default.bool,
  marks: _propTypes2.default.array
};

AminoAcidSlider.defaultProps = {
  aminoAcids: "",
  alleles: "",
  width: 600,
  selectionWidth: 90,
  selectionStart: 0,
  showAlleles: false,
  marks: []
};

exports.default = AminoAcidSlider;