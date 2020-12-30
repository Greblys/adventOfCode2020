package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"regexp"
	"strconv"
	"strings"
)

type Statement struct {
	op string
	idx, val, or, and uint64
	floats []uint64
}

func getFloats(floats *[]uint64, float string) {
	if strings.Contains(float, "X") {
		getFloats(floats, strings.Replace(float, "X", "0", 1))
		getFloats(floats, strings.Replace(float, "X", "1", 1))
	} else {
		fmt.Printf("%s, ",float)
		f, _ := strconv.ParseUint(float, 2, 64)
		*floats = append(*floats, f)
	}
}

func parse(lines []string) []Statement {
	var err error
	matchInteger := regexp.MustCompile(`\d+`)
	var statements []Statement
	for _, line := range lines {
		s := Statement{}
		sides := strings.Split(line, " = ")
		op := sides[0]
		val := sides[1]
		if strings.Contains(op, "mask") {
			s.op = "mask"
			s.or, err = strconv.ParseUint(strings.ReplaceAll(val, "X", "0"), 2, 64)
			and := strings.ReplaceAll(val, "0", "1")
			and = strings.ReplaceAll(and, "X", "0")
			s.and, err = strconv.ParseUint(and, 2, 64)
			float := strings.ReplaceAll(val, "1", "0")
			getFloats(&s.floats, float)
			fmt.Println()
			fmt.Println()
		} else {
			s.op = "mem"
			s.idx, err = strconv.ParseUint(string(matchInteger.Find([]byte(op))), 10, 64)
			s.val, err = strconv.ParseUint(val, 10, 64)
		}

		if err != nil {
			log.Fatal(err)
		}
		statements = append(statements, s)
	}
	return statements
}

var mem = make(map[uint64]uint64)

func execute(statements []Statement) {
	var mask Statement

	for _, s := range statements {
		if strings.Contains(s.op, "mask") {
			mask = s
		} else {
			o := (s.idx | mask.or) & mask.and
			for _, a := range mask.floats {
				mem[o + a] = s.val
			}
		}
	}
}

func getMemSum() uint64 {
	var sum uint64 = 0

	for _, v := range mem {
		sum += v
	}

	return sum
}

func main() {
	content, err := ioutil.ReadFile("input.txt")
	lines := strings.Split(string(content), "\n")
	lines = lines[:len(lines) - 1]

	statements := parse(lines)
	execute(statements)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Result: %d\n", getMemSum())
}