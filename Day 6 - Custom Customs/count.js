const fs = require('fs')

function compute(group) {
    return group.length;
}

function unique(x) {
    return [...new Set(x)];
}

function parseGroup(group) {
    return group.split('\n').filter(isTruthy).map(unique).reduce((acc, p) => acc.filter(c => p.indexOf(c) !== -1));
}

function main(data) {
    let sum = data.split('\n\n').filter(isTruthy).map(parseGroup).map(x => x.length).reduce((a, b) => a + b);
    console.log(sum);
}

fs.readFile('input.txt', 'utf8' , (err, data) => {
    main(data);
})

function isTruthy(item) {
    return !!item;
}
