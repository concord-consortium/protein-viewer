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