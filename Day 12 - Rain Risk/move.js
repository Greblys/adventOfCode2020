const fs = require('fs')

fs.readFile('input.txt', 'utf8' , (err, data) => {
    main(data);
})

function parse(item) {
    return {
        a: item[0],
        val: parseInt(item.slice(1))
    }
}

function main(data) {
    let tx, ty, d;
    let steps = data.split('\n').filter(x => !!x).map(parse);
    let x = 0;
    let y = 0;
    let dx = 10;
    let dy = 1;
    steps.forEach(step => {
        console.log(x, y, dx, dy, step);
        switch(step.a) {
            case "F": x += step.val * dx; y += step.val * dy; break;
            case "N": dy += step.val; break;
            case "S": dy -= step.val; break;
            case "E": dx += step.val; break;
            case "W": dx -= step.val; break;
            case "L":
                for(d = step.val; d > 0; d -= 90) {
                    tx = dx;
                    ty = dy;
                    dx = -1 * ty;
                    dy = tx;
                }
                break;
            case "R":
                for(d = step.val; d > 0; d -= 90) {
                    tx = dx;
                    ty = dy;
                    dx = ty;
                    dy = -1 * tx;
                }
                break;
        }
    })
    console.log(Math.abs(x) + Math.abs(y));
}
