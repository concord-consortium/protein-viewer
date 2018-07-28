'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./ProteinWrapper.css');

var _proteinViewer = require('../protein-viewer');

var _proteinViewer2 = _interopRequireDefault(_proteinViewer);

var _proteinBuilder = require('../protein-builder');

var _proteinBuilder2 = _interopRequireDefault(_proteinBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var workingDNA = '\n    5\'-ATGCCCACCCAGGGGCCTCAGAAGAGGCTTCTGGGTTCTCTCAACTCCACCTCCACAGCCACCCCTCACCTTGGACTGGCCACAAACCAGACAGG\n    GCCTTGGTGCCTGCAGGTGTCTGTCCCGGATGGCCTCTTCCTCAGCCTGGGGCTGGTGAGTCTGGTGGAGAATGTGCTGGTCGTGATAGCTATCACCA\n    AAAACCGCAACCTGCACTCGCCCATGTATTCCTTCATCTGCTGTCTGGCCCTGTCTGACCTTTTGGTGAGTATAAGCTTGGTGCTGGAGACGGCTATC\n    ATCCTGCTGCTGGAGGCAGGGGCCCTGGTGACCCGGGCCGCTTTGGTGCAACAGCTGGACAATGTCATTGACGTGCTCATCTGTGGCTCCATGGTGTC\n    CAGTCTTTGCTTCCTTGGTGTCATTGCCATAGACCGCTACATCTCCATCTTCTATGCATTACGTTATCACAGCATTGTGACGCTGCCCCGGGCACGAC\n    GGGCCATCGTGGGCATCTGGGTGGCCAGCATCTTCTTCAGCACCCTCTTTATCACCTACTACAACCACACAGCCGTCCTAATCTGCCTTGTCACTTTC\n    TTTCTAGCCATGCTGGCCCTCATGGCAATTCTGTATGTCCACATGCTCACCCGAGCATACCAGCATGCTCAGGGGATTGCCCAGCTCCAGAAGAGGCA\n    GGGCTCCACCCGCCAAGGCTTCTGCCTTAAGGGTGCTGCCACCCTTACTATCATTCTGGGAATTTTCTTCCTGTGCTGGGGCCCCTTCTTCCTGCATC\n    TCACACTCATCGTCCTCTGCCCTCAGCACCCCACCTGCAGCTGCATCTTTAAGAACTTCAACCTCTACCTCGTTCTCATCATCTTCATTTTTATCGTC\n    GACCCCCTCATCTATGCTTTTCGGAGCCAGGAGCTCCGCATGACACTCAGGGAGGTGCTGCTGTGCTCCTGGTGA-3\'';

var brokenDNA = '\n    5\'-ATGCCCACCCAGGGGCCTCAGAAGAGGCTTCTGGGTTCTCTCAACTCCACCTCCACAGCCACCCCTCACCTTGGACTGGCCACAAACCAGACAGG\n    GCCTTGGTGCCTGCAGGTGTCTGTCCCGGATGGCCTCTTCCTCAGCCTGGGGCTGGTGAGTCTGGTGGAGAATGTGCTGGTCGTGATAGCCATCACCA\n    AAAACCGCAACCTGCACTCGCCCATGTATTCCTTCATCTGCTGTCTGGCCCTGTCTGACCTTTTGGTGAGTATAAGCTTGGTGCTGGAGACGGCTATC\n    ATCCTGCTGCTGGAGGCAGGGGCCCTGGTGACCCGGGCCGCTTTGGTGCAACAGCTGGACAATGTCATTGACGTGCTCATCTGTGGCTCCATGGTGTC\n    CAGTCTTTGCTTCCTTGGTGTCATTGCCATAGACCGCTACATCTCCATCTTCTATGCATTACGTTATCACAGCATTGTGACGCTGCCCCGGGCACGAC\n    GGGCCATCGTGGGCATCTGGGTGGCCAGCATCTTCTTCAGCACCCTCTTTATCACCTACTACAACCACACAGCCGTCCTAATCTGCCTTGTCACTTTC\n    TTTCTAGCCATGCTGGCCCTCATGGCAATTCTGTATGTCCACATGCTCACCCGAGCATACCAGCATGCTCAGGGGATTGCCCAGCTCCAGAAGAGGCA\n    GCGCTCCACCCGCCAAGGCTTCTGCCTTAAGGGTGCTGCCACCCTTACTATCATTCTGGGAATTTTCTTCCTGTGCTGGGGCCCCTTCTTCCTGCATC\n    TCACACTCATCGTCCTCTGCCCTCAGCACCCCACCTGCAGCTGCATCTTTAAGAACTTCAACCTCTACCTCGTTCTCATCATCTTCATTTTTATCGTC\n    GACCCCCTCATCTATGCTTTTCGGAGCCAGGAGCTCCGCATGACACTCAGGGAGGTGCTGCTGTGCTCCTGGTGA-3\'';

var proteins = {
  working: {
    dna: workingDNA,
    svgImage: '\n      <g id="receptor-bound">\n        <path d="M13,21.006L13,29.006L35,43.006L56,29.006L58,13.006" style="fill:none;stroke:rgb(255,93,189);stroke-width:10px;"/>\n        <path id="highlight-path" d="M8,21.006C8,21.006 8.651,43.334 20,45.006C31.349,46.678 43.297,45.68 53,41.006C62.703,36.331 57.856,9.091 66,8.006C74.144,6.92 66.793,163.702 67,164.006C73.922,174.164 89.291,213.757 97,190.006C100.731,178.511 78.963,42.21 92,26.006C97.854,18.729 94.993,20.406 108,37.006C121.007,53.606 104.167,126.672 107,150.006C107.624,155.143 118.522,159.881 125,151.006C136.655,135.036 113.368,73.318 122,54.006C129.804,36.546 133.822,33.809 143,53.006C155.105,78.326 126.881,150.711 139,157.006C147.243,161.287 151.646,188.695 151.646,188.695C151.646,188.695 147.816,165.688 161,170.006C173.94,174.243 148.197,47.187 156,39.006C163.803,30.825 201.548,27.212 208,37.006C214.452,46.8 174.385,153.323 181,163.006C186.252,170.693 180.32,136.453 201,145.006" style="fill:none;stroke:rgb(255,93,189);stroke-width:16px;"/>\n        <path d="M7,23.006C7,23.006 8.651,43.334 20,45.006C31.349,46.678 43.297,45.68 53,41.006C62.703,36.331 57.856,13.091 66,12.006C74.144,10.92 66.793,162.702 67,163.006C73.922,173.164 92.208,207.591 98,191.006C98.917,188.38 99.336,183.15 99.393,177.728C99.789,139.928 79.599,39.178 91,25.006C96.854,17.729 97.703,19.519 108,37.006C118.701,55.178 110.559,118.772 107,142.006C106.264,146.813 103.432,151.116 122,151.006C139.902,150.899 114.099,62.134 125,44.006C131.17,33.745 134.856,35.639 143,49.006C157.603,72.973 132.263,144.753 140,156.006C142.241,159.265 149.787,183.93 150.996,187.428C155.731,201.135 142.41,170.078 164,170.006C177.616,169.96 150.197,48.187 158,40.006C165.803,31.825 198.548,29.212 205,39.006C211.452,48.8 172.461,151.67 178,162.006C183.539,172.341 185.37,145.525 195,143.006C200.777,141.494 202.368,151.527 206.863,151.932" style="fill:none;stroke:url(#_Linear1);stroke-width:8px;"/>\n      </g>\n      <defs>\n        <linearGradient id="_Linear1" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(207.424,0,0,183.451,7,103.726)"><stop offset="0" style="stop-color:rgb(116,0,0);stop-opacity:1"/><stop offset="1" style="stop-color:rgb(253,0,0);stop-opacity:1"/></linearGradient>\n      </defs>\n    '
  },
  broken: {
    dna: brokenDNA,
    svgImage: '\n      <g id="receptor-broken">\n        <path d="M13,21.006L13,29.006L35,43.006L56,29.006L58,13.006" style="fill:none;stroke:rgb(255,93,189);stroke-width:10px;"/>\n        <path id="highlight-path" d="M8,21.006C8,21.006 8.651,43.334 20,45.006C31.349,46.678 43.297,45.68 53,41.006C62.703,36.332 57.856,9.091 66,8.006C74.144,6.921 70.793,158.702 71,159.006C77.922,169.164 87.208,175.591 93,159.006C100.309,138.077 70.963,46.211 84,30.006C89.854,22.729 94.993,20.406 108,37.006C121.007,53.606 105.083,152.523 106,154.006C108.722,158.406 115.568,156.407 118,155.006C144.707,139.618 112.099,56.134 123,38.006C129.17,27.745 136.856,21.639 145,35.006C159.603,58.973 125.881,144.711 138,151.006C146.243,155.287 151.754,151.973 161,153.006C174.532,154.518 158.197,33.187 166,25.006C173.803,16.825 180.548,19.212 187,29.006C193.452,38.8 172.385,143.323 179,153.006C184.252,160.693 167.379,160.457 175,164.006" style="fill:none;stroke:rgb(255,93,189);stroke-width:16px;"/>\n        <path d="M7,23.006C7,23.006 8.651,43.334 20,45.006C31.349,46.678 43.297,45.68 53,41.006C62.703,36.332 57.856,13.091 66,12.006C74.144,10.921 72.793,157.702 73,158.006C79.922,168.164 86.208,173.591 92,157.006C99.309,136.077 69.963,51.211 83,35.006C88.854,27.729 92.993,22.406 106,39.006C119.007,55.606 105.227,152.87 106,154.006C107.409,156.076 113.071,157.62 120,155.006C136.75,148.686 112.099,59.134 123,41.006C129.17,30.745 135.856,22.639 144,36.006C158.603,59.973 131.263,139.753 139,151.006C141.241,154.265 147.218,153.315 161,153.006C174.613,152.7 158.197,35.187 166,27.006C173.803,18.825 180.548,21.212 187,31.006C193.452,40.8 171.461,139.67 177,150.006C182.539,160.341 169.368,162.527 173.863,162.932" style="fill:none;stroke:rgb(255,0,0);stroke-width:8px;"/>\n      </g>\n    '
  }
};

var ProteinWrapper = function (_Component) {
  _inherits(ProteinWrapper, _Component);

  function ProteinWrapper(props) {
    _classCallCheck(this, ProteinWrapper);

    var _this = _possibleConstructorReturn(this, (ProteinWrapper.__proto__ || Object.getPrototypeOf(ProteinWrapper)).call(this, props));

    _this.getDisplayedProteins = function () {
      var display = _this.props.display;

      if (display) {
        return display.split(",");
      } else {
        return ["working", "broken"];
      }
    };

    _this.isDemo = function () {
      return !_this.props.display;
    };

    _this.toggleShowingAminoAcidsOnViewer = function () {
      _this.setState({
        showAminoAcidsOnViewer: !_this.state.showAminoAcidsOnViewer
      });
    };

    _this.toggleShowingAminoAcidsOnBuilder = function () {
      _this.setState({
        showAminoAcidsOnBuilder: !_this.state.showAminoAcidsOnBuilder
      });
    };

    _this.toggleShowDNA = function () {
      _this.setState({
        showDNA: !_this.state.showDNA
      });
    };

    _this.state = {
      showDNA: props.showDNA,
      showAminoAcidsOnViewer: false,
      showAminoAcidsOnBuilder: false
    };
    return _this;
  }

  _createClass(ProteinWrapper, [{
    key: 'render',
    value: function render() {
      var visibleProteins = this.getDisplayedProteins().map(function (d) {
        return proteins[d];
      });
      var _props = this.props,
          dnaSwitchable = _props.dnaSwitchable,
          showBuilder = _props.showBuilder;


      return _react2.default.createElement(
        'div',
        { className: 'App' },
        visibleProteins.length === 2 && _react2.default.createElement(
          'div',
          { className: 'example' },
          _react2.default.createElement(_proteinViewer2.default, {
            dna: visibleProteins[0].dna,
            svgImage: visibleProteins[0].svgImage,
            dna2: visibleProteins[1].dna,
            svgImage2: visibleProteins[1].svgImage,
            showDNA: this.state.showDNA,
            showAminoAcidsOnProtein: this.state.showAminoAcidsOnViewer,
            dnaSwitchable: dnaSwitchable,
            toggleShowDNA: this.toggleShowDNA,
            toggleShowingAminoAcidsOnProtein: this.toggleShowingAminoAcidsOnViewer
          })
        ),
        (visibleProteins.length === 1 || this.isDemo()) && _react2.default.createElement(
          'div',
          { className: 'example' },
          _react2.default.createElement(_proteinViewer2.default, {
            dna: visibleProteins[0].dna,
            svgImage: visibleProteins[0].svgImage,
            showDNA: this.state.showDNA,
            showAminoAcidsOnProtein: this.state.showAminoAcidsOnViewer,
            dnaSwitchable: dnaSwitchable,
            toggleShowDNA: this.toggleShowDNA,
            toggleShowingAminoAcidsOnProtein: this.toggleShowingAminoAcidsOnViewer
          })
        ),
        (showBuilder || this.isDemo()) && _react2.default.createElement(
          'div',
          { className: 'example' },
          _react2.default.createElement(_proteinBuilder2.default, {
            dna: visibleProteins[0].dna,
            svgImage: visibleProteins[0].svgImage,
            speed: 0.001,
            sliderWidth: 500,
            showAminoAcids: this.state.showAminoAcidsOnBuilder,
            handleAminoAcidsToggle: this.toggleShowingAminoAcidsOnBuilder
          })
        )
      );
    }
  }]);

  return ProteinWrapper;
}(_react.Component);

exports.default = ProteinWrapper;