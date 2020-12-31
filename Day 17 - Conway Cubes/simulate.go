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

func getActive(m [][][][]byte) int {
	counter := 0
	for i := range m {
		for j := range m[i] {
			for k := range m[i][j] {
				for p := range m[i][j][k] {
					if m[i][j][k][p] == '#' {
						counter++
					}
				}
			}
		}
	}
	return counter
}

func getEmptyArea(length int, width int) [][][]byte {
	result := make([][][]byte, 13)
	for j := range result {
		result[j] = make([][]byte, length)
		for i := range result[j] {
			result[j][i] = bytes.Repeat([]byte{'.'}, width)
		}
	}
	return result
}

func expand(m [][]byte) [][][][]byte {
	initial := make([][]byte, len(m) + 12)

	for i := range initial {
		initial[i] = bytes.Repeat([]byte{'.'}, len(m[0]) + 12)
	}

	center := initial[6:]
	for i := range m {
		copy(center[i][6:], m[i])
	}

	//initialise 3-dimensional array and copy the initial area at index level 0
	result := make([][][][]byte , 13)
	for i := range result {
		result[i] = getEmptyArea(len(m) + 12, len(m[0]) + 12)
	}

	for i := range result[6][6] {
		copy(result[6][6][i], initial[i])
	}

	return result
}

func getActiveNeighbours(m[][][][]byte, o int, z int, y int, x int) int {
	counter := 0

	for tx := x - 1; tx <= x + 1; tx++ {
		for ty := y - 1; ty <= y + 1; ty++ {
			for tz := z - 1; tz <= z + 1; tz++ {
				for to := o - 1; to <= o + 1; to++ {
					if tx == x && ty == y && tz == z && to == o {
						continue
					}

					if tx < 0 || ty < 0 || tz < 0 || to < 0 || to >= len(m) || tz >= len(m[to]) || ty >= len(m[to][tz]) || tx >= len(m[to][tz][ty]) {
						continue
					}

					if m[to][tz][ty][tx] == '#' {
						counter++
					}
				}
			}
		}
	}

	return counter
}

func step(m [][][][]byte) [][][][]byte {
	virtual := make([][][][]byte, 13)

	for i := range m {
		virtual[i] = make([][][]byte , 13)
		for j := range virtual[i] {
			virtual[i][j] = make([][]byte, len(m[i][j]))
			for k := range m[i][j] {
				virtual[i][j][k] = make([]byte , len(m[i][j][k]))
				copy(virtual[i][j][k], m[i][j][k])
			}
		}
	}

	for o := range m {
		for z := range m[o] {
			for y := range m[o][z] {
				for x := range m[o][z][y] {
					n := getActiveNeighbours(m, o, z, y, x)
					if m[o][z][y][x] == '#' && (n == 2 || n == 3) {
						continue
					} else {
						virtual[o][z][y][x] = '.'
					}

					if m[o][z][y][x] == '.' &&  n == 3 {
						virtual[o][z][y][x] = '#'
					}
				}
			}
		}
	}

	return virtual
}

//func print(m [][][]byte) {
//	for y := range m[0] {
//		for z := range m {
//			if z > 0 && z < len(m) - 1 {
//				fmt.Printf(" %s", string(m[z][y]))
//			}
//		}
//		println()
//	}
//	println()
//}

func main() {
	content, err := ioutil.ReadFile("input.txt")

	if err != nil {
		log.Fatal(err)
	}

	initialArea := parse(content)
	cubes := expand(initialArea)
	//print(cubes)
	for i := 0; i < 6; i++ {
		cubes = step(cubes)
		//print(cubes)
	}

	fmt.Printf("Result: %d\n", getActive(cubes))
}
