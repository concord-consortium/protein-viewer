'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseSVG;
exports.closestPointOnPath = closestPointOnPath;
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

function closestPointOnPath(_ref, pathNode) {
  var x = _ref.x,
      y = _ref.y;

  var pathLength = pathNode.getTotalLength();
  var precision = 8;
  var best = void 0;
  var bestLength = void 0;
  var bestDistance = Infinity;

  // linear scan for coarse approximation
  for (var scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
    if ((scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength))) < bestDistance) {
      best = scan;
      bestLength = scanLength;
      bestDistance = scanDistance;
    }
  }

  // binary search for precise estimate
  precision /= 2;
  while (precision > 0.5) {
    var before = void 0;
    var after = void 0;
    var beforeLength = void 0;
    var afterLength = void 0;
    var beforeDistance = void 0;
    var afterDistance = void 0;
    if ((beforeLength = bestLength - precision) >= 0 && (beforeDistance = distance2(before = pathNode.getPointAtLength(beforeLength))) < bestDistance) {
      best = before;
      bestLength = beforeLength;
      bestDistance = beforeDistance;
    } else if ((afterLength = bestLength + precision) <= pathLength && (afterDistance = distance2(after = pathNode.getPointAtLength(afterLength))) < bestDistance) {
      best = after;
      bestLength = afterLength;
      bestDistance = afterDistance;
    } else {
      precision /= 2;
    }
  }

  best.length = bestLength;
  best.distance = Math.sqrt(bestDistance);
  return best;

  function distance2(p) {
    var dx = p.x - x,
        dy = p.y - y;
    return dx * dx + dy * dy;
  }
}