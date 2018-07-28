'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./info-box.css');

var _aminoAcid = require('./amino-acid');

var _aminoAcid2 = _interopRequireDefault(_aminoAcid);

var _aminoAcidUtils = require('../util/amino-acid-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InfoBox = function InfoBox(props) {
  var selection = props.selection,
      aminoAcids = props.aminoAcids,
      secondAminoAcids = props.secondAminoAcids,
      width = props.width,
      marks = props.marks;


  var aminoAcid = aminoAcids.charAt(selection);

  var secondAminoAcid = void 0;
  if (secondAminoAcids) {
    secondAminoAcid = secondAminoAcids.charAt(selection);
    if (secondAminoAcid === aminoAcid) {
      secondAminoAcid = null;
    }
  }

  var style = {
    marginLeft: props.selectedAminoAcidXLocation - width / 2
  };

  var length = aminoAcids.length;
  var marked = marks.includes(selection);

  function renderInfo(aminoAcid) {
    var name = (0, _aminoAcidUtils.getFullNameForAminoAcid)(aminoAcid) + ' (' + (0, _aminoAcidUtils.expandAminoAcidAbbreviation)(aminoAcid) + ')';

    var description = (0, _aminoAcidUtils.getAminoAcidDescription)(aminoAcid);

    return _react2.default.createElement(
      'div',
      { className: 'info' },
      aminoAcid !== "0" && _react2.default.createElement(
        'svg',
        { viewBox: '0 0 30 30', width: '30px' },
        _react2.default.createElement(_aminoAcid2.default, { type: aminoAcid, width: 30 })
      ),
      _react2.default.createElement(
        'div',
        { className: 'name' },
        _react2.default.createElement(
          'b',
          null,
          'Name:'
        ),
        ' ',
        name
      ),
      _react2.default.createElement(
        'div',
        { className: 'property' },
        _react2.default.createElement(
          'b',
          null,
          'Property:'
        ),
        ' ',
        description
      )
    );
  }

  return _react2.default.createElement(
    'div',
    { className: 'info-box-wrapper' },
    _react2.default.createElement(
      'div',
      { className: 'info-box', style: style },
      _react2.default.createElement(
        'div',
        { className: 'info-wrapper' },
        renderInfo(aminoAcid),
        secondAminoAcid && renderInfo(secondAminoAcid)
      ),
      aminoAcid !== "0" && _react2.default.createElement(
        'div',
        { className: 'mark' },
        _react2.default.createElement(
          'div',
          null,
          'Amino acid ',
          selection + 1,
          ' of ',
          length
        ),
        _react2.default.createElement(
          'label',
          null,
          _react2.default.createElement('input', {
            name: 'isGoing',
            type: 'checkbox',
            checked: marked,
            onChange: function onChange() {
              props.onMarkLocation && props.onMarkLocation(selection);
            } }),
          'Mark this location'
        )
      )
    )
  );
};

InfoBox.propTypes = {
  svg: _propTypes2.default.string,
  highlightColor: _propTypes2.default.string,
  aminoAcids: _propTypes2.default.string,
  secondAminoAcids: _propTypes2.default.string,
  selection: _propTypes2.default.number,
  selectedAminoAcidXLocation: _propTypes2.default.number,
  marks: _propTypes2.default.array,
  onMarkLocation: _propTypes2.default.func
};

InfoBox.defaultProps = {
  highlightColor: "255, 255, 0",
  marks: []
};

exports.default = InfoBox;