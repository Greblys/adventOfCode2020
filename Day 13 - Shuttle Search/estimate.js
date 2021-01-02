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

function isComplete(timestamp) {
    for(let i = 0; i < timetable.length; i++){
        if(timestamp % timetable[i].base !== timetable[i].remainder) {
            return false;
        }
    }
    return true;
}

function main(data) {
    let input = data.split('\n').filter(x => !!x);
    timetable = input[1].split(',').map(parse).filter(x => !!x)
    console.log(timetable);
    multiplier = 0
    while(!isComplete(557 * multiplier + 41) && timestamp < Number.MAX_SAFE_INTEGER) {
        multiplier += 1
    }
    console.log(timestamp, timestamp / Number.MAX_SAFE_INTEGER);
}
