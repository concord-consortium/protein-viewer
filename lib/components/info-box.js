'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./info-box.css');

var _aminoAcid = require('./amino-acid');

var _aminoAcid2 = _interopRequireDefault(_aminoAcid);

var _aminoAcidTypes = require('../util/amino-acid-types');

var _aminoAcidTypes2 = _interopRequireDefault(_aminoAcidTypes);

var _codonUtils = require('../util/codon-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InfoBox = function (_Component) {
  _inherits(InfoBox, _Component);

  function InfoBox() {
    _classCallCheck(this, InfoBox);

    return _possibleConstructorReturn(this, (InfoBox.__proto__ || Object.getPrototypeOf(InfoBox)).apply(this, arguments));
  }

  _createClass(InfoBox, [{
    key: 'renderInfo',
    value: function renderInfo(aminoAcid) {
      var name = (0, _codonUtils.getFullNameForAminoAcid)(aminoAcid) + ' (' + (0, _codonUtils.expandAminoAcidAbbreviation)(aminoAcid) + ')';

      var type = _aminoAcidTypes2.default[aminoAcid];
      var description = type.description.map(function (d, i) {
        return _react2.default.createElement(
          'li',
          { key: i },
          d
        );
      });

      return _react2.default.createElement(
        'div',
        { className: 'info' },
        _react2.default.createElement(
          'svg',
          { viewBox: '0 0 30 30', width: '30px' },
          _react2.default.createElement(_aminoAcid2.default, { type: aminoAcid, width: 30 })
        ),
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            'b',
            null,
            'Name:'
          ),
          ' ',
          name
        ),
        _react2.default.createElement(
          'ul',
          null,
          description
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var location = Math.floor((this.props.aminoAcids.length - 1) * this.props.selection);
      var aminoAcid = this.props.aminoAcids.charAt(location) || "e";

      var secondAminoAcid = void 0;
      if (this.props.secondAminoAcids) {
        secondAminoAcid = this.props.secondAminoAcids.charAt(location) || "e";
        if (secondAminoAcid === aminoAcid) {
          secondAminoAcid = null;
        }
      }

      var style = {
        marginLeft: this.props.selection * this.props.width - this.props.width / 2
      };

      var marked = this.props.marks.indexOf(location) > -1;

      return _react2.default.createElement(
        'div',
        { className: 'info-box-wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'info-box', style: style },
          _react2.default.createElement(
            'div',
            { className: 'info-wrapper' },
            this.renderInfo(aminoAcid),
            secondAminoAcid && this.renderInfo(secondAminoAcid)
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'label',
              null,
              _react2.default.createElement('input', {
                name: 'isGoing',
                type: 'checkbox',
                checked: marked,
                onChange: function onChange() {
                  _this2.props.onMarkLocation && _this2.props.onMarkLocation(location);
                } }),
              'Mark this location'
            )
          )
        )
      );
    }
  }]);

  return InfoBox;
}(_react.Component);

InfoBox.propTypes = {
  svg: _propTypes2.default.string,
  highlightColor: _propTypes2.default.string,
  aminoAcids: _propTypes2.default.string,
  secondAminoAcids: _propTypes2.default.string,
  selection: _propTypes2.default.number,
  marks: _propTypes2.default.array,
  onMarkLocation: _propTypes2.default.func
};

InfoBox.defaultProps = {
  highlightColor: "255, 255, 0",
  marks: []
};

exports.default = InfoBox;