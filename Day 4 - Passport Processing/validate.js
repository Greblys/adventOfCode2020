const fs = require('fs')

function isValid(passport) {
    if(!passport.byr || !passport.iyr || !passport.eyr || !passport.hgt || !passport.hcl || !passport.ecl || !passport.pid) return false;
    if(!passport.byr.match(/^\d{4}$/) || passport.byr < "1920" || passport.byr > "2002") return false;
    if(!passport.eyr.match(/^\d{4}$/) || passport.eyr < "2020" || passport.eyr > "2030") return false;
    if(!passport.hgt.match(/^\d+(cm|in)$/)) return false;
    if(passport.hgt.indexOf("cm") !== -1 && (passport.hgt < "150cm" || passport.hgt > "193cm")) return false;
    if(passport.hgt.indexOf("in") !== -1 && (passport.hgt < "59in" || passport.hgt > "76in")) return false;
    if(!passport.hcl.match(/^#(\d|[a-f]){6}$/)) return false;
    if(!passport.ecl.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/)) return false;
    if(!passport.pid.match(/^\d{9}$/)) return false;
    return true;
}

function parsePassport(token) {
    let passport = {};
    token.split(/\s/).map(x => x.split(':')).forEach(([key, value]) => {
        passport[key] = value;
    })
    return passport;
}

function main(data) {
    let sum = data.split("\n\n").filter(isTruthy).map(parsePassport).map(isValid).reduce(count);
    console.log(sum);
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