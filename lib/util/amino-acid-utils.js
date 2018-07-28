'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.getCodonsForAminoAcid = getCodonsForAminoAcid;
exports.expandAminoAcidAbbreviation = expandAminoAcidAbbreviation;
exports.getFullNameForAminoAcid = getFullNameForAminoAcid;
exports.convertAminoAcidsToCodons = convertAminoAcidsToCodons;
exports.getAminoAcidFromCodon = getAminoAcidFromCodon;
exports.getAminoAcidsFromCodons = getAminoAcidsFromCodons;
exports.getAminoAcidColor = getAminoAcidColor;
exports.getAminoAcidDescription = getAminoAcidDescription;
function getCodonsForAminoAcid(aminoAcid) {
  return aminoAcids[aminoAcid].codons;
}

function expandAminoAcidAbbreviation(singleLetterAbbreviation) {
  return aminoAcids[singleLetterAbbreviation].threeLetterAbbreviation;
}

function getFullNameForAminoAcid(aminoAcid) {
  return aminoAcids[aminoAcid].fullName;
}

// Converts a string of single letter amino acids to a string of codons
// The codons are chosen at random from among valid codons
function convertAminoAcidsToCodons(aminoAcids) {
  return aminoAcids.split('').reduce(function (genome, acid) {
    var codons = getCodonsForAminoAcid(acid);
    return genome += codons[Math.floor(Math.random() * codons.length)];
  }, '');
}

function getAminoAcidFromCodon(codon) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.entries(aminoAcids)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2),
          letter = _step$value[0],
          aminoAcid = _step$value[1];

      if (aminoAcid.codons.includes(codon)) {
        return letter;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function getAminoAcidsFromCodons(codons) {
  return codons.map(getAminoAcidFromCodon).join("");
}

var aminoAcidTypes = exports.aminoAcidTypes = {
  Polar: {
    name: "Polar",
    color: "#73e26d"
  },
  Hydrophobic: {
    name: "Hydrophobic",
    color: "#edd672"
  },
  Positive: {
    name: "Charged (+)",
    color: "#0ad9ef"
  },
  Negative: {
    name: "Charged (-)",
    color: "#ff92ce"
  }
};

function getAminoAcidColor(aa) {
  if (typeof aa === "string") {
    aa = aminoAcids[aa];
  }
  return aa.type.color || "#000";
}

function getAminoAcidDescription(aa) {
  if (typeof aa === "string") {
    aa = aminoAcids[aa];
  }
  return aa.type.name || "";
}

var aminoAcids = exports.aminoAcids = {
  A: {
    fullName: 'Alanine',
    threeLetterAbbreviation: 'Ala',
    codons: ['GCT', 'GCC', 'GCA', 'GCG'],
    type: aminoAcidTypes.Hydrophobic
  },
  C: {
    fullName: 'Cysteine',
    threeLetterAbbreviation: 'Cys',
    codons: ['TGT', 'TGC'],
    type: aminoAcidTypes.Polar
  },
  D: {
    fullName: 'Aspartic acid',
    threeLetterAbbreviation: 'Asp',
    codons: ['GAT', 'GAC'],
    type: aminoAcidTypes.Negative
  },
  E: {
    fullName: 'Glutamic acid',
    threeLetterAbbreviation: 'Glu',
    codons: ['GAA', 'GAG'],
    type: aminoAcidTypes.Negative
  },
  F: {
    fullName: 'Phenylalanine',
    threeLetterAbbreviation: 'Phe',
    codons: ['TTT', 'TTC'],
    type: aminoAcidTypes.Hydrophobic
  },
  G: {
    fullName: 'Glycine',
    threeLetterAbbreviation: 'Gly',
    codons: ['GGT', 'GGC', 'GGA', 'GGG'],
    type: aminoAcidTypes.Hydrophobic
  },
  H: {
    fullName: 'Histidine',
    threeLetterAbbreviation: 'His',
    codons: ['CAT', 'CAC'],
    type: aminoAcidTypes.Polar
  },
  I: {
    fullName: 'Isoleucine',
    threeLetterAbbreviation: 'Ile',
    codons: ['ATT', 'ATC', 'ATA'],
    type: aminoAcidTypes.Hydrophobic
  },
  K: {
    fullName: 'Lysine',
    threeLetterAbbreviation: 'Lys',
    codons: ['AAA', 'AAG'],
    type: aminoAcidTypes.Positive
  },
  L: {
    fullName: 'Leucine',
    threeLetterAbbreviation: 'Leu',
    codons: ['CTT', 'CTC', 'CTA', 'CTG', 'TTA', 'TTG'],
    type: aminoAcidTypes.Hydrophobic
  },
  M: {
    fullName: 'Methionine',
    threeLetterAbbreviation: 'Met',
    codons: ['ATG'],
    type: aminoAcidTypes.Hydrophobic
  },
  N: {
    fullName: 'Asparagine',
    threeLetterAbbreviation: 'Asn',
    codons: ['AAT', 'AAC'],
    type: aminoAcidTypes.Polar
  },
  P: {
    fullName: 'Proline',
    threeLetterAbbreviation: 'Pro',
    codons: ['CCT', 'CCC', 'CCA', 'CCG'],
    type: aminoAcidTypes.Hydrophobic
  },
  Q: {
    fullName: 'Glutamine',
    threeLetterAbbreviation: 'Gln',
    codons: ['CAA', 'CAG'],
    type: aminoAcidTypes.Polar
  },
  R: {
    fullName: 'Arginine',
    threeLetterAbbreviation: 'Arg',
    codons: ['CGT', 'CGC', 'CGA', 'CGG', 'AGA', 'AGG'],
    type: aminoAcidTypes.Positive
  },
  S: {
    fullName: 'Serine',
    threeLetterAbbreviation: 'Ser',
    codons: ['TCT', 'TCC', 'TCA', 'TCG', 'AGT', 'AGC'],
    type: aminoAcidTypes.Polar
  },
  T: {
    fullName: 'Threonine',
    threeLetterAbbreviation: 'Thr',
    codons: ['ACT', 'ACC', 'ACA', 'ACG'],
    type: aminoAcidTypes.Polar
  },
  V: {
    fullName: 'Valine',
    threeLetterAbbreviation: 'Val',
    codons: ['GTT', 'GTC', 'GTA', 'GTG'],
    type: aminoAcidTypes.Hydrophobic
  },
  W: {
    fullName: 'Tryptophan',
    threeLetterAbbreviation: 'Trp',
    codons: ['TGG'],
    type: aminoAcidTypes.Hydrophobic
  },
  Y: {
    fullName: 'Tyrosine',
    threeLetterAbbreviation: 'Tyr',
    codons: ['TAT', 'TAC'],
    type: aminoAcidTypes.Polar
  },
  0: {
    fullName: 'Stop Codon',
    threeLetterAbbreviation: 'S',
    codons: ['TAA', 'TAG', 'TGA'],
    type: {}
  }
};