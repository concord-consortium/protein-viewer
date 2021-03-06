export default function getParameterByName(name) {
  const url = window.location.href;
  name = name.replace(/[[]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  if (results[2] === 'false') return false;
  if (results[2] === 'true') return true;
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}