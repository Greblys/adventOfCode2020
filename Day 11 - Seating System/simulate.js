const fs = require('fs')

fs.readFile('input.txt', 'utf8' , (err, data) => {
    main(data);
})

function parse(item) {
    return item.split("");
}

let map;
function main(data) {
    map = data.split('\n').filter(x => !!x).map(parse);
    let changed = true;
    while(changed) {
        changed = false;
        let virtual = map.slice().map(x => x.slice());
        for(let y = 0; y < map.length - 1; y++) {
            for(let x = 0; x < map[0].length - 1; x++) {
                let n = getAdjacentOccupied(y, x);
                if(map[y][x] === "L" && n === 0) {
                    virtual[y][x] = "#";
                    changed = true;
                } else if(map[y][x] === "#" && n >= 5){
                    virtual[y][x] = "L";
                    changed = true;
                }
            }
        }
        map = virtual;
    }

    let result = map.map(x => x.map(t => t === "#" ? 1 : 0).reduce((a,b) => a + b)).reduce((a, b) => a + b);
    console.log(result);
}

function getAdjacentOccupied(y, x) {
    let seats = [
        sight(y, x, -1,-1),
        sight(y, x, 1, 1),
        sight(y, x, -1, 0),
        sight(y, x, 0, -1),
        sight(y, x, 1,0),
        sight(y, x, 0,1),
        sight(y, x, -1,1),
        sight(y, x, 1,-1),
    ];

    return seats.reduce((a, b) => a + b);
}

function sight(y, x, dy, dx) {
    do {
        y += dy;
        x += dx;

        if(y < 0 || y >= map.length || x < 0 || x >= map[0].length) {
            return 0;
        }
    } while(map[y][x] === '.');

    return map[y][x] === "#" ? 1 : 0;
}
