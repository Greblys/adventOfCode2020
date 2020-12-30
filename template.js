const fs = require('fs')

fs.readFile('input.txt', 'utf8' , (err, data) => {
    main(data);
})

function parse(item) {}

function main(data) {
    let input = data.split('\n').filter(x => !!x).map(parse);
}
