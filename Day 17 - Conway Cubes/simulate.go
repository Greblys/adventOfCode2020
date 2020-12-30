package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"log"
)

func parse(input []byte) [][]byte {
	return bytes.Split(input, []byte{'\n'})
}

func getActive(m [][][]byte) int {
	counter := 0
	for i := range m {
		for j := range m[i] {
			for k := range m[i][j] {
				if m[i][j][k] == '#' {
					counter++
				}
			}
		}
	}
	return counter
}

func getEmptyArea(length int, width int) [][]byte {
	result := make([][]byte, length)
	for i := range result {
		result[i] = bytes.Repeat([]byte{'.'}, width)
	}
	return result
}

func expand(m [][]byte) [][][]byte {
	initial := make([][]byte, len(m) + 12)

	for i := range initial {
		initial[i] = bytes.Repeat([]byte{'.'}, len(m[0]) + 12)
	}

	center := initial[6:]
	for i := range m {
		copy(center[i][6:], m[i])
	}

	//initialise 3-dimensional array and copy the initial area at index level 0
	result := make([][][]byte , 13)
	for i := range result {
		result[i] = getEmptyArea(len(m) + 12, len(m[0]) + 12)
	}

	for i := range result[6] {
		copy(result[6][i], initial[i])
	}

	return result
}

func getActiveNeighbours(m[][][]byte, z int, y int, x int) int {
	counter := 0

	for tx := x - 1; tx <= x + 1; tx++ {
		for ty := y - 1; ty <= y + 1; ty++ {
			for tz := z - 1; tz <= z + 1; tz++ {
				if tx == x && ty == y && tz == z {
					continue
				}

				if tx < 0 || ty < 0 || tz < 0 || tz >= len(m) || ty >= len(m[tz]) || tx >= len(m[tz][ty]) {
					continue
				}

				if m[tz][ty][tx] == '#' {
					counter++
				}
			}
		}
	}

	return counter
}

func step(m [][][]byte) [][][]byte {
	virtual := make([][][]byte, 13)

	for i := range m {
		virtual[i] = make([][]byte, len(m[i]))
		for j := range m[i] {
			virtual[i][j] = make([]byte , len(m[i][j]))
			copy(virtual[i][j], m[i][j])
		}
	}

	for z := range m {
		for y := range m[z] {
			for x := range m[z][y] {
				n := getActiveNeighbours(m, z, y, x)
				if m[z][y][x] == '#' && (n == 2 || n == 3) {
					continue
				} else {
					virtual[z][y][x] = '.'
				}

				if m[z][y][x] == '.' &&  n == 3 {
					virtual[z][y][x] = '#'
				}
			}
		}
	}

	return virtual
}

func print(m [][][]byte) {
	for y := range m[0] {
		for z := range m {
			if z > 0 && z < len(m) - 1 {
				fmt.Printf(" %s", string(m[z][y]))
			}
		}
		println()
	}
}

func main() {
	content, err := ioutil.ReadFile("input.txt")

	if err != nil {
		log.Fatal(err)
	}

	initialArea := parse(content)
	cubes := expand(initialArea)
	print(cubes)
	println()
	for i := 0; i < 6; i++ {
		cubes = step(cubes)
		print(cubes)
		println()
	}

	fmt.Printf("Result: %d\n", getActive(cubes))
}
