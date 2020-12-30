const fs = require('fs')
let numbers;

fs.readFile('input.txt', 'utf8' , (err, data) => {
    main(data);
})

function isValid(idx) {
    let cp = numbers.slice(idx - 25, idx);

    for(let i = idx - 25; i < idx; i++){
        let b = numbers[idx] - numbers[i];
        if(b !== numbers[idx] && cp.indexOf(b) !== -1) {
            return true;
        }
    }
    return false;
}

function firstPart() {
    let i;
    for(i = 25; isValid(i); i++);
    console.log(numbers[i]);
    return numbers[i];
}

function secondPart() {
    // let firstInvalid = firstPart();
    let firstInvalid = 756008079;
    let idx1 = 0;
    let idx2 = 0;
    let sum = 0;

    while(sum !== firstInvalid) {
        if(sum < firstInvalid) {
            sum += numbers[idx2++];
        }

        if(sum > firstInvalid) {
            sum -= numbers[idx1++];
        }
    }

    let cs = numbers.slice(idx1, idx2+1);
    let min = cs.reduce((a, b) => Math.min(a, b));
    let max = cs.reduce((a, b) => Math.max(a, b));
    console.log(min + max);
}

function main(data) {
    numbers = data.split('\n').filter(x => !!x).map(x => parseInt(x));
    // firstPart();
    secondPart();
}
