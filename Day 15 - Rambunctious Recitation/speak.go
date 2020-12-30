package main

import "fmt"

var mem = make(map[int]int)
func main() {
	input := []int{ 2, 20, 0, 4, 1, 17 }
	last := input[len(input) - 1]
	for i, v := range input[:len(input) - 1] {
		mem[v] = i + 1
	}

	fmt.Print("2 1\n20 2\n0 3\n4 4\n1 5\n17 6\n")
	for i := len(input); i < 30000000; i++ {
		var x int

		if mem[last] == 0 {
			x = 0
		} else {
			x = i - mem[last]
		}
		mem[last] = i
		last = x
	}
	fmt.Println(last)
}
