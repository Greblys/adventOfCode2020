const fs = require('fs')

let rules = {};
let q = [];

function stepA(colour) {
    for (let key in rules) {
        let recipe = rules[key];
        if(contain(recipe, colour)){
            q.push(key);
        }
    }
}

function stepB(colour){
    let total = 1; //count itself as first bag
    for(let bag of rules[colour]){
        total += stepB(bag.key) * bag.n;
    }
    return total;
}

function contain(bag, colour) {
    return bag.map(x => x.key).indexOf(colour) !== -1;
}

function parse(rule) {
    // match word pairs which are in front of bag(s)
    let tokens = rule.match(/(\w+ \w+)(?<!no other)(?= bags?)/g);
    let lhs = tokens[0];
    let rhs = tokens.slice(1);
    // match numbers which are in front of word pairs
    let quantities = rule.match(/\d+(?= \w+ \w+ bags?)/g)

    let recipe = [];
    for(let i = 0; i < rhs.length; i++){
        recipe.push({
            key:  rhs[i],
            n: parseInt(quantities[i])
        })
    }
    rules[lhs] = recipe;
}

function main(data) {
    data.split('\n').filter(isTruthy).forEach(parse);
    // q.push("shiny gold");
    // let i = 0;
    // while(i < q.length) {
    //     stepA(q[i]);
    //     i++;
    // }

    //console.log([...new Set(q)].length - 1);

    //count all the bags inside shiny gold, so exclude itself
    console.log(stepB("shiny gold") - 1);
}

fs.readFile('input.txt', 'utf8' , (err, data) => {
    main(data);
})

function count(sum, item) {
    return item ? sum + 1 : sum;
}

function isTruthy(item) {
    return !!item;
}
