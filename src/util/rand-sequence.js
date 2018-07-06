const acidLookup = {
  a: ["GCA", "GCC", "GCG", "GCT"],
  r: ["AGA", "AGG", "CGA", "CGC", "CGG", "CGT"],
  c: ["TGC", "TGT"],
  d: ["GAC", "GAT"],
  e: ["GAA", "GAG"],
  f: ["TTC", "TTT"]
}


randSequence = () => {
  const acids = ['a', 'r', 'c', 'd', 'e', 'f']
  let seq = ""
  for (let i = 0; i < 50; i++) {
  	const acid = acids[Math.floor(Math.random() * acids.length)]
  	const codon = acidLookup[acid][Math.floor(Math.random() * acidLookup[acid].length)]
  	seq += codon
  }
  console.log(seq)
}