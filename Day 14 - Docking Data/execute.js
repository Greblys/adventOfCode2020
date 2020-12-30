const fs = require('fs')

fs.readFile('input.txt', 'utf8' , (err, data) => {
    main(data);
})

function parse(line) {
    [op, val] = line.split(" = ");

    if(op.indexOf("mask") !== -1) {
        return {
            op: "mask",
            val: val,
            orMask: parseInt(val.replace(/X/g, 0), 2),
            andMask: parseInt(val.replace(/X/g, 1), 2)
        }
    } else {
        return {
            op: "mem",
            idx: op.match(/\d+/)[0],
            val: parseInt(val)
        }
    }
}

function main(data) {
    let statements = data.split('\n').filter(x => !!x).map(parse);
    let mem = {};
    let mask = {};
    statements.forEach((x, i) => {
        if(x.op === "mask") {
            mask = x;
        } else {
            mem[x.idx] = x.val & mask.andMask | mask.orMask;
        }
        if(i < 10) {
            console.log(x, mem[x.idx], mask);
        }
    })
    let sum = 0;
    Object.values(mem).forEach(val => {
        sum += val;
    })
    console.log(sum);
}

