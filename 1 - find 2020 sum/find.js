const fs = require('fs')

fs.readFile('input.txt', 'utf8' , (err, data) => {
    parse(data);
})

function parse(data){
    let numbers = data.split('\n').map(n => parseInt(n));
    compute(numbers);
}

function compute(numbers){
    for (let i = 0; i < numbers.length; i++) {
        for(let j = 0; j < numbers.length; j++) {
            if(j === i) break;
            for(let k = 0; k < numbers.length; k++) {
                if (k === i || k === j) break;
                if (numbers[i] + numbers[j] + numbers[k] === 2020) {
                    console.log(numbers[i] * numbers[j] * numbers[k]);
                }
            }
        }
    }
}