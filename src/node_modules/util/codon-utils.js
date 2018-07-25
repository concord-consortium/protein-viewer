export function getCodonsForAminoAcid(aminoAcid) {
  return codonLookup[aminoAcid].codons;
}

export function expandAminoAcidAbbreviation(singleLetterAbbreviation) {
  return codonLookup[singleLetterAbbreviation].threeLetterAbbreviation;
}

export function getFullNameForAminoAcid(aminoAcid) {
  return codonLookup[aminoAcid].fullName;
}

// Converts a string of single letter amino acids to a string of codons
// The codons are chosen at random from among valid codons
export function convertAminoAcidsToCodons(aminoAcids) {
  return aminoAcids.split('').reduce((genome, acid) => {
    const codons = getCodonsForAminoAcid(acid)
    return genome += codons[Math.floor(Math.random() * codons.length)]
  }, '')
}

const codonLookup = {
  'I': {
    fullName: 'Isoleucine',
    threeLetterAbbreviation: 'Ile',
    codons: ['ATT', 'ATC', 'ATA']
  },
  'L': {
    fullName: 'Leucine',
    threeLetterAbbreviation: 'Leu',
    codons: ['CTT', 'CTC', 'CTA', 'CTG', 'TTA', 'TTG']
  },
  'V': {
    fullName: 'Valine',
    threeLetterAbbreviation: 'Val',
    codons: ['ATT', 'ATC', 'ATA']
  },
  'F': {
    fullName: 'Phenylalanine',
    threeLetterAbbreviation: 'Phe',
    codons: ['TTT', 'TTC']
  },
  'M': {
    fullName: 'Methionine',
    threeLetterAbbreviation: 'Met',
    codons: ['ATG']
  },
  'C': {
    fullName: 'Cysteine',
    threeLetterAbbreviation: 'Cys',
    codons: ['TGT', 'TGC']
  },
  'A': {
    fullName: 'Alanine',
    threeLetterAbbreviation: 'Ala',
    codons: ['GCT', 'GCC', 'GCA', 'GCG']
  },
  'G': {
    fullName: 'Glycine',
    threeLetterAbbreviation: 'Gly',
    codons: ['GGT', 'GGC', 'GGA', 'GGG']
  },
  'P': {
    fullName: 'Proline',
    threeLetterAbbreviation: 'Pro',
    codons: ['CCT', 'CCC', 'CCA', 'CCG']
  },
  'T': {
    fullName: 'Threonine',
    threeLetterAbbreviation: 'Thr',
    codons: ['ACT', 'ACC', 'ACA', 'ACG']
  },
  'S': {
    fullName: 'Serine',
    threeLetterAbbreviation: 'Ser',
    codons: ['TCT', 'TCC', 'TCA', 'TCG', 'AGT', 'AGC']
  },
  'Y': {
    fullName: 'Tyrosine',
    threeLetterAbbreviation: 'Tyr',
    codons: ['TAT', 'TAC']
  },
  'W': {
    fullName: 'Tryptophan',
    threeLetterAbbreviation: 'Trp',
    codons: ['TGG']
  },
  'Q': {
    fullName: 'Glutamine',
    threeLetterAbbreviation: 'Gln',
    codons: ['CAA', 'CAG']
  },
  'N': {
    fullName: 'Asparagine',
    threeLetterAbbreviation: 'Asn',
    codons: ['AAT', 'AAC']
  },
  'H': {
    fullName: 'Histidine',
    threeLetterAbbreviation: 'His',
    codons: ['CAT', 'CAC']
  },
  'E': {
    fullName: 'Glutamic acid',
    threeLetterAbbreviation: 'Glu',
    codons: ['GAA', 'GAG']
  },
  'D': {
    fullName: 'Aspartic acid',
    threeLetterAbbreviation: 'Asp',
    codons: ['GAT', 'GAC']
  },
  'K': {
    fullName: 'Lysine',
    threeLetterAbbreviation: 'Lys',
    codons: ['AAA', 'AAG']
  },
  'R': {
    fullName: 'Arginine',
    threeLetterAbbreviation: 'Arg',
    codons: ['CGT', 'CGC', 'CGA', 'CGG', 'AGA', 'AGG']
  }
}
