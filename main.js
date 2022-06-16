// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (id, arr) => {
  return ({
    specimenNum : id,
    dna: arr,

    mutate() {
      let baseToMutate = Math.floor(Math.random()*15);
      let newBase = returnRandBase();
      if (this.dna[baseToMutate] === newBase) {
        this.mutate()
      } else {
        this.dna[baseToMutate] = newBase;
      }
      return this.dna
    },

  compareDNA(otherpAequor){
    let dna1 = this.dna;
    let dna2 = otherpAequor.dna;
    let id1 = this.specimenNum;
    let id2 = otherpAequor.specimenNum;

    let matchingDNA = 0;

    for (let i = 0; i < 15; i++) {
      if (dna1[i] === dna2[i]){
        matchingDNA++;
      }
    }

    let percentageMatchingDNA = Math.floor((matchingDNA / 15)*100);

    return percentageMatchingDNA;
  },

  willLikelySurvive() {
    let survivalBase = 0;

    for (let i=0; i < 15; i++) {
      if (this.dna[i] === 'C' || this.dna[i] === 'G') {
        survivalBase++;
      }
    }
    return Math.floor((survivalBase / 15)*100) >= 60;
  },

  complementStrand() {
    let newStrand = [];
    for (let i = 0; i < 15; i++){
      if (this.dna[i] === 'A'){
        newStrand.push('T');
      } else if (this.dna[i] === 'T'){
        newStrand.push('A');
      } else if (this.dna[i] === 'C'){
        newStrand.push('G');
      } else {
        newStrand.push('C');
      }
    }
    return newStrand;
  }
})
}



let studyArr = [];
for (i=0; i<30; i++){
  studyArr.push(pAequorFactory([i+1], mockUpStrand()));
}

let bestMatch1;
let bestMatch2;
let bestPercentage = 0;

for (const element1 of studyArr) {
  for (const element2 of studyArr) {
    if(element1 === element2) {
      continue;
    } else {
      if (element1.compareDNA(element2) > bestPercentage) {
        bestMatch1 = element1.specimenNum;
        bestMatch2 = element2.specimenNum;
        bestPercentage = element1.compareDNA(element2);
      }
    }
  }
}

console.log(`Best match of the array is specimen ${bestMatch1} with ${bestMatch2} with a similarity of ${bestPercentage}%`)
