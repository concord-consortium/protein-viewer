export function translateCodon(codon) {
  return codonLookup[codon.toUpperCase()]
}

export function getCodonsForAminoAcid(aminoAcid) {
  return Object.keys(codonLookup).reduce((codons, curr) => {
    if (codonLookup[curr] === aminoAcid.toUpperCase()) {
      codons.push(curr)
    }
    return codons
  }, [])
}

export function convertAminoAcidsToCodons(aminoAcids) {
  return aminoAcids.split('').reduce((genome, acid) => {
    const codons = getCodonsForAminoAcid(acid)
    return genome += codons[Math.floor(Math.random() * codons.length)]
  }, '')
}

const codonLookup = {
   "AAA" : "K",
   "AAC" : "N",
   "AAG" : "K",
   "AAT" : "N",
   "ACA" : "T",
   "ACC" : "T",
   "ACG" : "T",
   "ACT" : "T",
   "AGA" : "R",
   "AGC" : "S",
   "AGG" : "R",
   "AGT" : "S",
   "ATA" : "M",
   "ATC" : "M",
   "ATG" : "M",
   "ATT" : "M",
   "CAA" : "Q",
   "CAC" : "H",
   "CAG" : "Q",
   "CAT" : "H",
   "CCA" : "P",
   "CCC" : "P",
   "CCG" : "P",
   "CCT" : "P",
   "CGA" : "R",
   "CGC" : "R",
   "CGG" : "R",
   "CGT" : "R",
   "CTA" : "L",
   "CTC" : "L",
   "CTG" : "M",
   "CTT" : "L",
   "GAA" : "E",
   "GAC" : "D",
   "GAG" : "E",
   "GAT" : "D",
   "GCA" : "A",
   "GCC" : "A",
   "GCG" : "A",
   "GCT" : "A",
   "GGA" : "G",
   "GGC" : "G",
   "GGG" : "G",
   "GGT" : "G",
   "GTA" : "V",
   "GTC" : "V",
   "GTG" : "M",
   "GTT" : "V",
   "TAA" : "*",
   "TAC" : "Y",
   "TAG" : "*",
   "TAT" : "Y",
   "TCA" : "S",
   "TCC" : "S",
   "TCG" : "S",
   "TCT" : "S",
   "TGA" : "*",
   "TGC" : "C",
   "TGG" : "W",
   "TGT" : "C",
   "TTA" : "L",
   "TTC" : "F",
   "TTG" : "M",
   "TTT" : "F"
}