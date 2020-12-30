const fs = require('fs')

function isValidA(policy){
    let count = policy.pswd.split(policy.char).length - 1;
    return count >= policy.min && count <= policy.max;
}

function isValidB(policy){
    let count = 0;
    if(policy.pswd[policy.min-1] === policy.char) count++;
    if(policy.pswd[policy.max-1] === policy.char) count++;
    return count === 1;
}

function parseLine(line){
    let args = line.split(/[-: ]+/);
    return {
        min: parseInt(args[0]),
        max: parseInt(args[1]),
        char: args[2],
        pswd: args[3]
    }
}

function parse(data) {
    let totalA = data.split('\n').filter(x => x).map(parseLine).map(isValidA).reduce((acc, x) => x ? acc + 1 : acc);
    console.log(totalA);
    let totalB = data.split('\n').filter(x => x).map(parseLine).map(isValidB).reduce((acc, x) => x ? acc + 1 : acc);
    console.log(totalB);
}

fs.readFile('input.txt', 'utf8' , (err, data) => {
    parse(data);
})