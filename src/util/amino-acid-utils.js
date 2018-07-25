export function getCodonsForAminoAcid(aminoAcid) {
  return aminoAcids[aminoAcid].codons;
}

export function expandAminoAcidAbbreviation(singleLetterAbbreviation) {
  return aminoAcids[singleLetterAbbreviation].threeLetterAbbreviation;
}

export function getFullNameForAminoAcid(aminoAcid) {
  return aminoAcids[aminoAcid].fullName;
}

// Converts a string of single letter amino acids to a string of codons
// The codons are chosen at random from among valid codons
export function convertAminoAcidsToCodons(aminoAcids) {
  return aminoAcids.split('').reduce((genome, acid) => {
    const codons = getCodonsForAminoAcid(acid);
    return genome += codons[Math.floor(Math.random() * codons.length)];
  }, '')
}

export function getAminoAcidFromCodon(codon) {
  for (const [letter, aminoAcid] of Object.entries(aminoAcids)) {
    if (aminoAcid.codons.includes(codon)) {
      return letter;
    }
  }
}

export function getAminoAcidsFromCodons(codons) {
  return codons.map(getAminoAcidFromCodon).join("");
}

export const aminoAcidTypes = {
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
}

export function getAminoAcidColor(aa) {
  if (typeof aa === "string") {
    aa = aminoAcids[aa];
  }
  return aa.type.color || "#000";
}

export function getAminoAcidDescription(aa) {
  if (typeof aa === "string") {
    aa = aminoAcids[aa];
  }
  return aa.type.name || "";
}

export const aminoAcids = {
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
}
