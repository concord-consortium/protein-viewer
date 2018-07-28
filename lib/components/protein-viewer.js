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

var _dnaUtils = require('../util/dna-utils');

var _aminoAcidUtils = require('../util/amino-acid-utils');

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

    _this.handleDNAToggle = function () {
      _this.props.toggleShowDNA();
    };

    _this.handleAminoAcidsToggle = function () {
      _this.props.toggleShowingAminoAcidsOnProtein();
    };

    _this.state = {
      selectionStartPercent: 0,
      selectedAminoAcidIndex: 0,
      selectedAminoAcidXLocation: 0,
      showingInfoBox: false,
      marks: []
    };

    _this.handleUpdateSelectionStart = _this.handleUpdateSelectionStart.bind(_this);
    _this.handleAnimateToSelectionStart = _this.handleAnimateToSelectionStart.bind(_this);
    _this.handleUpdateSelectedAminoAcidIndex = _this.handleUpdateSelectedAminoAcidIndex.bind(_this);
    _this.handleAminoAcidSliderClick = _this.handleAminoAcidSliderClick.bind(_this);
    _this.handleMark = _this.handleMark.bind(_this);
    _this.animate = _this.animate.bind(_this);
    return _this;
  }

  _createClass(ProteinViewer, [{
    key: 'handleUpdateSelectionStart',
    value: function handleUpdateSelectionStart(selectionStartPercent) {
      this.setState({
        animating: false,
        selectionStartPercent: selectionStartPercent
      });
    }
  }, {
    key: 'handleAnimateToSelectionStart',
    value: function handleAnimateToSelectionStart(selectionStartPercentTarget) {
      this.setState({
        animating: true,
        selectionStartPercentTarget: selectionStartPercentTarget
      }, this.animate);
    }
  }, {
    key: 'animate',
    value: function animate() {
      var _state = this.state,
          selectionStartPercent = _state.selectionStartPercent,
          selectionStartPercentTarget = _state.selectionStartPercentTarget,
          animating = _state.animating;

      if (!animating) return;
      var speed = void 0;
      if (selectionStartPercent > selectionStartPercentTarget) {
        speed = Math.max(-0.02, selectionStartPercentTarget - selectionStartPercent);
      } else {
        speed = Math.min(0.02, selectionStartPercentTarget - selectionStartPercent);
      }
      this.setState({ selectionStartPercent: selectionStartPercent + speed });
      if (selectionStartPercentTarget - selectionStartPercent !== 0) {
        window.requestAnimationFrame(this.animate);
      }
    }
  }, {
    key: 'handleUpdateSelectedAminoAcidIndex',
    value: function handleUpdateSelectedAminoAcidIndex(selectedAminoAcidIndex, selectedAminoAcidXLocation, showInfo) {
      this.setState({
        selectedAminoAcidIndex: selectedAminoAcidIndex,
        selectedAminoAcidXLocation: selectedAminoAcidXLocation
      });

      if (showInfo) {
        if (!this.state.showingInfoBox || selectedAminoAcidIndex !== this.state.selectedAminoAcidIndex) {
          this.setState({
            showingInfoBox: true
          });
        } else {
          this.setState({ showingInfoBox: false });
        }
      }
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
      var _props = this.props,
          selectionWidth = _props.selectionWidth,
          dna = _props.dna,
          dna2 = _props.dna2,
          aminoAcidWidth = _props.aminoAcidWidth,
          width = _props.width,
          svgImage = _props.svgImage,
          svgImage2 = _props.svgImage2,
          showDNA = _props.showDNA,
          showAminoAcidsOnProtein = _props.showAminoAcidsOnProtein,
          dnaSwitchable = _props.dnaSwitchable;


      var codons = (0, _dnaUtils.extractCodons)(dna);
      var aminoAcids = (0, _aminoAcidUtils.getAminoAcidsFromCodons)(codons);

      window.codons = codons;
      window.aminoAcids = aminoAcids;

      window.getAminoAcidsFromCodons = _aminoAcidUtils.getAminoAcidsFromCodons;
      window.getAminoAcidFromCodon = _aminoAcidUtils.getAminoAcidFromCodon;

      var protein1SelectionPercent = selectionWidth / (aminoAcids.length * aminoAcidWidth);
      var codons2 = void 0;
      var aminoAcids2 = void 0;
      var protein2SelectionPercent = void 0;
      if (dna2) {
        codons2 = (0, _dnaUtils.extractCodons)(dna2);
        aminoAcids2 = (0, _aminoAcidUtils.getAminoAcidsFromCodons)(codons2);
        protein2SelectionPercent = selectionWidth / (aminoAcids2.length * aminoAcidWidth);
      }

      return _react2.default.createElement(
        'div',
        { className: 'protein-viewer' },
        _react2.default.createElement(
          'div',
          { className: 'proteins' },
          _react2.default.createElement(_protein2.default, {
            width: 260,
            selectionStartPercent: this.state.selectionStartPercent,
            updateSelectionStart: this.handleAnimateToSelectionStart,
            selectionPercent: protein1SelectionPercent,
            viewBox: '0 0 222 206',
            svg: svgImage,
            marks: this.state.marks.map(function (loc) {
              return (loc + 0.5) / aminoAcids.length;
            }),
            aminoAcids: aminoAcids,
            showAminoAcids: showAminoAcidsOnProtein
          }),
          svgImage2 && _react2.default.createElement(_protein2.default, {
            width: 260,
            selectionStartPercent: this.state.selectionStartPercent,
            updateSelectionStart: this.handleAnimateToSelectionStart,
            selectionPercent: protein2SelectionPercent,
            viewBox: '0 0 222 206',
            highlightColor: '4, 255, 0',
            svg: svgImage2,
            marks: this.state.marks.map(function (loc) {
              return (loc + 0.5) / aminoAcids2.length;
            }),
            aminoAcids: aminoAcids,
            showAminoAcids: showAminoAcidsOnProtein
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'amino-acids' },
          _react2.default.createElement(_aminoAcidSlider2.default, {
            aminoAcids: aminoAcids,
            codons: codons,
            width: width,
            aminoAcidWidth: aminoAcidWidth,
            selectionWidth: selectionWidth,
            selectionStartPercent: this.state.selectionStartPercent,
            updateSelectionStart: this.handleUpdateSelectionStart,
            selectedAminoAcidIndex: this.state.selectedAminoAcidIndex,
            updateSelectedAminoAcidIndex: this.handleUpdateSelectedAminoAcidIndex,
            onClick: this.handleAminoAcidSliderClick,
            marks: this.state.marks,
            showDNA: showDNA,
            dimUnselected: this.state.showingInfoBox
          }),
          aminoAcids2 && _react2.default.createElement(_aminoAcidSlider2.default, {
            aminoAcids: aminoAcids2,
            codons: codons2,
            width: width,
            aminoAcidWidth: aminoAcidWidth,
            selectionWidth: selectionWidth,
            selectionStartPercent: this.state.selectionStartPercent,
            updateSelectionStart: this.handleUpdateSelectionStart,
            selectedAminoAcidIndex: this.state.selectedAminoAcidIndex,
            updateSelectedAminoAcidIndex: this.handleUpdateSelectedAminoAcidIndex,
            onClick: this.handleAminoAcidSliderClick,
            marks: this.state.marks,
            dimUnselected: this.state.showingInfoBox,
            showDNA: showDNA,
            highlightColor: '4, 255, 0'
          })
        ),
        this.state.showingInfoBox && _react2.default.createElement(_infoBox2.default, {
          aminoAcids: aminoAcids,
          secondAminoAcids: aminoAcids2,
          selection: this.state.selectedAminoAcidIndex,
          selectedAminoAcidXLocation: this.state.selectedAminoAcidXLocation,
          marks: this.state.marks,
          onMarkLocation: this.handleMark,
          width: width - 26
        }),
        _react2.default.createElement(
          'div',
          null,
          dnaSwitchable && _react2.default.createElement(_FormControlLabel2.default, {
            control: _react2.default.createElement(_Checkbox2.default, {
              checked: showDNA,
              onChange: this.handleDNAToggle
            }),
            label: 'Show DNA'
          }),
          _react2.default.createElement(_FormControlLabel2.default, {
            control: _react2.default.createElement(_Checkbox2.default, {
              checked: showAminoAcidsOnProtein,
              onChange: this.handleAminoAcidsToggle
            }),
            label: 'Show Amino Acids on Protein'
          })
        )
      );
    }
  }]);

  return ProteinViewer;
}(_react.Component);

ProteinViewer.propTypes = {
  dna: _propTypes2.default.string,
  svgImage: _propTypes2.default.string,
  dna2: _propTypes2.default.string.isRequired,
  svgImage2: _propTypes2.default.string,
  /** Width of the protein and slider elements, in pixels */
  width: _propTypes2.default.number,
  /** Width of one amino acid in the slider elements, in pixels */
  aminoAcidWidth: _propTypes2.default.number,
  /** Width of one codon in the slider elements, in pixels */
  codonWidth: _propTypes2.default.number,
  /** Width of the selection box, in pixels. Note this, the `aminoAcidWidth` prop,
   * and the length of the amino acid chain will together combine to affect the
   * percent of protein selected. */
  selectionWidth: _propTypes2.default.number,
  /** Whether DNA is initially visible */
  showDNA: _propTypes2.default.bool,
  /** Whether "string of beads" amino acids are visible */
  showAminoAcidsOnProtein: _propTypes2.default.bool,
  /** Whether user can toggle DNA */
  dnaSwitchable: _propTypes2.default.bool,
  toggleShowDNA: _propTypes2.default.func,
  toggleShowingAminoAcidsOnProtein: _propTypes2.default.func
};

ProteinViewer.defaultProps = {
  width: 600,
  selectionWidth: 220,
  aminoAcidWidth: 17,
  codonWidth: 29,
  showDNA: false,
  showAminoAcidsOnProtein: false,
  dnaSwitchable: true
};

exports.default = ProteinViewer;