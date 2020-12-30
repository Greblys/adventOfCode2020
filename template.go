package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"strings"
)

func parse(input []byte) []string {
	return strings.Split(string(input), "\n")
}

func compute(items []string) int {
	return 1
}

func main() {
	content, err := ioutil.ReadFile("input.txt")

	if err != nil {
		log.Fatal(err)
	}

	lines := parse(content)

	fmt.Printf("Result: %d\n", compute(lines))
}
