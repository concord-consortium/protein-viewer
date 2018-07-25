'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _aminoAcidSlider = require('./amino-acid-slider');

var _aminoAcidSlider2 = _interopRequireDefault(_aminoAcidSlider);

var _protein = require('./protein');

var _protein2 = _interopRequireDefault(_protein);

var _infoBox = require('./info-box');

var _infoBox2 = _interopRequireDefault(_infoBox);

var _urlUtils = require('../util/urlUtils');

var _urlUtils2 = _interopRequireDefault(_urlUtils);

var _FormControlLabel = require('@material-ui/core/FormControlLabel');

var _FormControlLabel2 = _interopRequireDefault(_FormControlLabel);

var _Checkbox = require('@material-ui/core/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

require('./protein-viewer.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProteinViewer = function (_Component) {
  _inherits(ProteinViewer, _Component);

  function ProteinViewer() {
    _classCallCheck(this, ProteinViewer);

    var _this = _possibleConstructorReturn(this, (ProteinViewer.__proto__ || Object.getPrototypeOf(ProteinViewer)).call(this));

    _this.handleAllelesToggle = function () {
      _this.setState({
        showingAlleles: !_this.state.showingAlleles
      });
    };

    _this.state = {
      selectionStart: 0,
      showingInfoBox: false,
      showingAlleles: !!(0, _urlUtils2.default)('dnaVisible'),
      marks: []
    };

    _this.handleUpdateSelectionStart = _this.handleUpdateSelectionStart.bind(_this);
    _this.handleAminoAcidSliderClick = _this.handleAminoAcidSliderClick.bind(_this);
    _this.handleMark = _this.handleMark.bind(_this);
    return _this;
  }

  _createClass(ProteinViewer, [{
    key: 'handleUpdateSelectionStart',
    value: function handleUpdateSelectionStart(selectionStart) {
      this.setState({
        selectionStart: selectionStart
      });
    }
  }, {
    key: 'handleAminoAcidSliderClick',
    value: function handleAminoAcidSliderClick() {
      this.setState({
        showingInfoBox: !this.state.showingInfoBox
      });
    }
  }, {
    key: 'handleMark',
    value: function handleMark(location) {
      var existingMarks = this.state.marks;
      if (existingMarks.indexOf(location) > -1) {
        existingMarks.splice(existingMarks.indexOf(location), 1);
      } else {
        existingMarks.push(location);
      }
      this.setState({
        marks: existingMarks
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'protein-viewer' },
        _react2.default.createElement(
          'div',
          { className: 'proteins' },
          _react2.default.createElement(_protein2.default, {
            width: 300,
            selectionStart: this.state.selectionStart,
            viewBox: '0 0 222 206',
            svg: this.props.svgImage,
            marks: this.state.marks.map(function (loc) {
              return loc / _this2.props.aminoAcids.length;
            })
          }),
          this.props.svgImage2 && _react2.default.createElement(_protein2.default, {
            width: 300,
            selectionStart: this.state.selectionStart,
            viewBox: '0 0 222 206',
            highlightColor: '4, 255, 0',
            svg: this.props.svgImage2,
            marks: this.state.marks.map(function (loc) {
              return loc / _this2.props.aminoAcids.length;
            })
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'amino-acids' },
          _react2.default.createElement(_aminoAcidSlider2.default, {
            aminoAcids: this.props.aminoAcids,
            alleles: this.props.alleles,
            width: 300,
            selectionWidth: this.state.showingAlleles ? 150 : 90,
            selectionStart: this.state.selectionStart,
            updateSelectionStart: this.handleUpdateSelectionStart,
            onClick: this.handleAminoAcidSliderClick,
            marks: this.state.marks,
            showAlleles: this.state.showingAlleles,
            dimUnselected: this.state.showingInfoBox
          }),
          this.props.aminoAcids2 && _react2.default.createElement(_aminoAcidSlider2.default, {
            aminoAcids: this.props.aminoAcids2,
            alleles: this.props.alleles2,
            width: 300,
            selectionWidth: this.state.showingAlleles ? 150 : 90,
            selectionStart: this.state.selectionStart,
            updateSelectionStart: this.handleUpdateSelectionStart,
            onClick: this.handleAminoAcidSliderClick,
            marks: this.state.marks,
            dimUnselected: this.state.showingInfoBox,
            showAlleles: this.state.showingAlleles,
            highlightColor: '4, 255, 0'
          })
        ),
        this.state.showingInfoBox && _react2.default.createElement(_infoBox2.default, {
          aminoAcids: this.props.aminoAcids,
          secondAminoAcids: this.props.aminoAcids2,
          selection: this.state.selectionStart,
          marks: this.state.marks,
          onMarkLocation: this.handleMark,
          width: 274
        }),
        (0, _urlUtils2.default)('dnaSwitchable') && _react2.default.createElement(_FormControlLabel2.default, {
          control: _react2.default.createElement(_Checkbox2.default, {
            checked: this.state.showingAlleles,
            onChange: this.handleAllelesToggle
          }),
          label: 'Show DNA'
        })
      );
    }
  }]);

  return ProteinViewer;
}(_react.Component);

ProteinViewer.propTypes = {
  aminoAcids: _propTypes2.default.string,
  alleles: _propTypes2.default.string,
  svgImage: _propTypes2.default.string,
  aminoAcids2: _propTypes2.default.string,
  alleles2: _propTypes2.default.string,
  svgImage2: _propTypes2.default.string
};

exports.default = ProteinViewer;