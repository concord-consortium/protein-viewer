'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

require('./index.css');

var _ProteinWrapper = require('./components/ProteinWrapper/ProteinWrapper');

var _ProteinWrapper2 = _interopRequireDefault(_ProteinWrapper);

var _registerServiceWorker = require('./registerServiceWorker');

var _registerServiceWorker2 = _interopRequireDefault(_registerServiceWorker);

var _urlUtils = require('./util/urlUtils');

var _urlUtils2 = _interopRequireDefault(_urlUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var display = (0, _urlUtils2.default)("proteins") || "";
var showDNA = (0, _urlUtils2.default)('dnaVisible');
var dnaSwitchable = (0, _urlUtils2.default)('dnaSwitchable');
var showBuilder = (0, _urlUtils2.default)("showBuilder");
_reactDom2.default.render(_react2.default.createElement(_ProteinWrapper2.default, {
  display: display,
  showDNA: showDNA,
  dnaSwitchable: dnaSwitchable,
  showBuilder: showBuilder }), document.getElementById('root'));
(0, _registerServiceWorker2.default)();