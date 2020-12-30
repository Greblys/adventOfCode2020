const fs = require('fs')

function countTrees(map, deltaX, deltaY) {
    let count = 0;
    for(let y = 0, x = 0; y < map.length; y += deltaY, x += deltaX){
        // same pattern repeats horizontally if out of boundaries, so reset x in that case
        if(x >= map[y].length) {
            x = x - map[y].length;
        }

        if(map[y][x] === '#'){
            count++;
        }
    }
    return count;
}

function parse(data) {
    let map = data.split('\n').filter(x => x).map(x => x.split(''));
    let product = 1;
    product *= countTrees(map, 1, 1);
    product *= countTrees(map, 3, 1);
    product *= countTrees(map, 5, 1);
    product *= countTrees(map, 7, 1);
    product *= countTrees(map, 1, 2);
    console.log(product)
}

fs.readFile('input.txt', 'utf8' , (err, data) => {
    parse(data);
})