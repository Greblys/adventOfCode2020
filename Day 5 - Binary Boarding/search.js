const fs = require('fs')

let map = {};

function parseBoardingPass(boardingPass) {
    boardingPass = boardingPass.replace(/(F|L)/g, "0");
    boardingPass = boardingPass.replace(/(B|R)/g, "1");
    return parseInt(boardingPass, 2);
}

function main(data) {
    let ids = data.split('\n').filter(isTruthy).map(parseBoardingPass).sort((a, b) => a - b);
    for(let i = 1; i < ids.length; i++){
        if(ids[i] - ids[i-1] > 1){
            console.log(ids[i] - 1);
        }

    }
}

fs.readFile('input.txt', 'utf8' , (err, data) => {
    main(data);
})

function isTruthy(item) {
    return !!item;
}
