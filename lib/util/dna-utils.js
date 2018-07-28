'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractCodons = extractCodons;
/**
 * Takes a string of DNA in the form
 *
 * "5'-ATGCCCA [...] CCTGGTGA-3'"
 *
 * and returns an array of codons, if the DNA is valid.
 *
 * Valid DNA currently needs to
 *
 * 1. Start with 5'- and end with -3'
 * 2. Have ATG as the first codon and any of TAG|TAA|TGA as the last
 * 3. Be evenly divisible by three.
 *
 * Eventually, we should support reading the DNA backwards (-3' to 5'-), and have any number of
 * bases before or after the start and stop codons.
 *
 * @param {string} dnaString
 * @returns {array} Array of codons as 3-letter strings
 */
function extractCodons(dnaString) {
  var validDNARegEx = /^5'-(ATG.*(TAG|TAA|TGA))-3'$/m;
  var cleanedDNAString = dnaString.replace(/\s/g, '').toUpperCase();
  var dnaStringParts = validDNARegEx.exec(cleanedDNAString);

  if (!dnaStringParts) {
    throw new Error('"' + dnaString + '" is not a valid DNA sequence');
  }

  var bases = dnaStringParts[1];

  if (bases.length % 3 !== 0) {
    throw new Error('"' + bases + '" must be evenly divisible into triplets, but is ' + bases.length + ' bases long');
  }

  //split into triples
  return bases.match(/.{1,3}/g);
}