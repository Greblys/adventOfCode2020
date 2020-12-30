let timetable;
let timestamp = 0;
let multiplier;
let maxIdx = 0;

const fs = require('fs')

fs.readFile('input.txt', 'utf8' , (err, data) => {
    main(data);
})

function firstPart(data) {
    let input = data.split('\n').filter(x => !!x);
    let timestamp = input[0];
    let timetable = input[1].split(',').filter(x => x !== "x").map(x => parseInt(x));
    let remainders = timetable.map(x => timestamp % x);
    let departures = timetable.map((x, i) => timestamp - remainders[i] + x);
    let earliest = departures.reduce((a, b) => Math.min(a, b));
    let ei = departures.indexOf(earliest);

    console.log(earliest);
}

function parse(x, i) {
    if(x !== 'x') {
        let base = parseInt(x);
        let remainder = i;
        while(base < remainder) base += parseInt(x);
        return {
            orig: parseInt(x),
            base: base,
            remainder: remainder
        }
    } else {
        return null;
    }
}

let last;

function isComplete(timestamp) {
    for(let i = 0; i < timetable.length; i++){
        if(timestamp % timetable[i].base !== timetable[i].remainder) {
            return false;
        }
        if(i > 4) {
            console.log(i,timestamp, timestamp - last, multiplier, timestamp % timetable[i].base, timetable)
            last = timestamp;
        }
    }
    return true;
}

function computeLCM(x, y, remainder) {
    let a, b;

    if(x > y) {
        a = x;
        b = y;
    } else {
        a = y;
        b = x;
    }

    while(a % b !== 0) {
        console.log(a, b, a % b);
        tb = a % b;
        a = b;
        b = tb;
    }

    return x * y / b;
}

function main(data) {
    let prospect = 393165832162222;
    console.log("A match, but too low: ", prospect)
    let input = data.split('\n').filter(x => !!x);
    timetable = input[1].split(',').map(parse).filter(x => !!x)
    console.log(timetable);
    // let rarest = timetable
    //     .reduce((a, b) => {
    //         if(a.base > b.base) {
    //             return a;
    //         } else {
    //             return b;
    //         }
    //     })
    //console.log(computeLCM(557,419, 31))
    multiplier = 37; // 41 * 557
    timestamp = multiplier + 81039354439680
    while(!isComplete(timestamp) && timestamp < Number.MAX_SAFE_INTEGER) {
        timestamp += multiplier;
    }
    console.log(timestamp, timestamp < Number.MAX_SAFE_INTEGER);
}
