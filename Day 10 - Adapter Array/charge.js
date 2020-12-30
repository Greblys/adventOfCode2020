const fs = require('fs')

fs.readFile('input.txt', 'utf8' , (err, data) => {
    main(data);
})

let sets = [];
let lastColumn = -1;
function compute(adapters) {
    for(let i = 1; i < adapters.length; i++) {
        if(adapters[i] - adapters[i-1] === 3) {
            sets.push(adapters.slice(lastColumn+1, i-1))
            lastColumn = i;
        }
    }

    sets = sets.filter(x => x.length > 0);

    console.log(sets, adapters);

    //number of possible permutations for each slice length
    let permutations = {
        1: 2,
        2: 4,
        3: 7
    }

    let result = sets.map(x => permutations[x.length]).reduce((a, b) => a * b);
    console.log(result);
}

function main(data) {
    let adapters = data.split('\n').filter(x => !!x).map(x => parseInt(x));
    adapters.sort((a, b) => a - b);
    adapters.push(adapters[adapters.length-1] + 3);
    compute(adapters);
}
