const salaries = {
  HRs: {
    Alice: 500,
    Bob: 700
  },
  Devs: {
    Carol: 2500,
    Carlos: 1000,
    Charles: 1500
  },
  QAs: {
    Chuck: 1650,
    Craig: 850,
    Dave: 3000
  }
};


function returnDoubledObject(obj) {
  let newObj = {};

  for (let key1 in obj) {
    newObj[key1] = {...obj[key1]};
    
    for (let key2 in obj[key1]) {
      newObj[key1][key2] *= 2;
    }
  }
  
  return newObj;
}
