const fs = require('fs')

fs.readFile('input.txt', 'utf8' , (err, data) => {
    main(data);
})

function isTruthy(item) {
    return !!item;
}

function parse(line) {
    let params = line.split(" ");
    return {
        op: params[0],
        arg: parseInt(params[1])
    }
}

function main(data) {
    let instructions = data.split('\n').filter(isTruthy).map(parse);
    let programs = [];

    // modify each instruction once and store all program variations
    instructions.forEach((x, index) => {

        //copy instruction
        let instruction = {};
        Object.assign(instruction, instructions[index]);

        if(instruction.op === "jmp") {
            instruction.op = "nop";
        } else if(instruction.op === "nop") {
            instruction.op = "jmp";
        }

        let cp = instructions.slice();
        cp[index] = instruction;

        programs.push(new Program(cp));
    });

    let idx = 0;
    while(!programs[idx].isTerminated()){
        programs[idx].step();
        idx = ++idx % programs.length;
    }

    console.log(programs[idx].getAccumulator(), idx, programs[idx].counter, instructions.length);
}

class Program {
    accumulator = 0;
    idx = 0;
    counter = 0;

    constructor(instructions){
        this.instructions = instructions;
    }

    step() {
        this.counter++;
        let i = this.instructions[this.idx];

        switch (i.op) {
            case "nop":
                this.idx++;
                break;
            case "acc":
                this.idx++;
                this.accumulator += i.arg;
                break;
            case "jmp":
                this.idx += i.arg;
                break;
            default:
                console.error("Unknown instruction: ", i);
        }
    }

    isTerminated() {
        return this.idx >= this.instructions.length
    }

    getAccumulator() {
        return this.accumulator;
    }
}
