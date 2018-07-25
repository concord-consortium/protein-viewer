'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseSVG;
/* global ActiveXObject */

function parseSVG(svgString) {
  var doc = void 0;
  if (typeof DOMParser !== 'undefined') {
    var parser = new DOMParser();
    doc = parser.parseFromString(svgString, 'text/xml');
  } else if (window.ActiveXObject) {
    doc = new ActiveXObject('Microsoft.XMLDOM');
    doc.async = 'false';
    // IE chokes on DOCTYPE
    doc.loadXML(svgString.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i, ''));
  }
  return doc.documentElement;
}