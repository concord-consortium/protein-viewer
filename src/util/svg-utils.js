/* global ActiveXObject */

export default function parseSVG(svgString) {
  let doc
  if (typeof DOMParser !== 'undefined') {
    var parser = new DOMParser()
    doc = parser.parseFromString(svgString, 'text/xml')
  } else if (window.ActiveXObject) {
    doc = new ActiveXObject('Microsoft.XMLDOM')
    doc.async = 'false'
    // IE chokes on DOCTYPE
    doc.loadXML(svgString.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i, ''))
  }
  return doc.documentElement
}

export function closestPointOnPath({x, y}, pathNode) {
  const pathLength = pathNode.getTotalLength();
  let precision = 8;
  let best;
  let bestLength;
  let bestDistance = Infinity;

  // linear scan for coarse approximation
  for (let scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
    if ((scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength))) < bestDistance) {
      best = scan;
      bestLength = scanLength;
      bestDistance = scanDistance;
    }
  }

  // binary search for precise estimate
  precision /= 2;
  while (precision > 0.5) {
    let before;
    let after;
    let beforeLength;
    let afterLength;
    let beforeDistance;
    let afterDistance;
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