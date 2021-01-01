package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"log"
	"strconv"
)

type Stack []interface{}

func (s Stack) push(item interface{}) Stack {
	return append(s, item)
}

func (s Stack) pop() (Stack, interface{}) {
	item := s[len(s)-1]
	s = s[:len(s)-1]
	return s, item
}

func (s Stack) size() int {
	return len(s)
}

type NodeVal struct {
	v int
	op byte
}

type Node struct {
	val NodeVal
	left *Node
	right *Node
}

type Tree Node

var equations []Tree

func parse(expr []byte) Node {
	if len(expr) == 0 {
		return Node{}
	}

	tokens := bytes.Split(expr, []byte{' '})

	//if it got here it must be a number leaf
	if len(tokens) == 1 {
		v, _ := strconv.Atoi(string(expr))
		return Node {val: NodeVal {v: v}}
	}

	var leftSlice, rightSlice []byte
	var op byte

	if expr[0] == '(' {
		// need to find where is the closing parenthesis
		// if parenthesis appear on the right hand side - don't worry about it just yet
		counter := 0
		var end int
		for i := range expr {
			if expr[i] == '(' {
				counter++
			} else if expr[i] == ')' {
				counter--
				if counter == 0 {
					end = i
					break
				}
			}
		}
		//remove parenthesis runes
		leftSlice = expr[1:end]
		if len(expr) >= end + 2 {
			//account one rune for empty space
			op = expr[end+2]
			//account one rune for empty space
			rightSlice = expr[end+4:]
		}

	} else {
		leftSlice = tokens[0]
		op = tokens[1][0]
		rightSlice = expr[len(tokens[0]) + 3:]
	}

	left := parse(leftSlice)
	right := parse(rightSlice)
	return Node {
		left:  &left,
		val:   NodeVal {op: op},
		right: &right,
	}
}

func (n Node) calc() int {
	if n.left == nil && n.right == nil {
		return n.val.v
	} else {
		left := n.left.calc()
		right := n.right.calc()
		//println(left, string(n.val), right)
		if n.val.op == '+' {
			return left + right
		} else {
			return left * right
		}
	}
}

//func (n Node) printNode() {
//	println(string(n.val.op), n.val.v)
//	if n.left != nil {
//		n.left.printNode()
//	}
//	if n.right != nil {
//		n.right.printNode()
//	}
//	println()
//}

//func (v NodeVal) String() string {
//	return fmt.Sprintf("V: %d O: %s", v.v, string(v.op))
//}
//
//func (n Node) String() string {
//	var left, right string
//
//	if n.left == nil {
//		left = "nil"
//	} else {
//		left = n.left.String()
//	}
//
//	if n.right == nil {
//		right = "nil"
//	} else {
//		right = n.right.String()
//	}
//
//	return fmt.Sprintf("L: %s V: %s R: %s\n", left, n.val.String(), right)
//}

func compute(equations []Tree) int {
	result := 0
	for _, e := range equations {
		r := Node(e).calc()
		println(string(e.left.val.op), e.val.v, string(e.right.val.op))
		result += r
	}
	return result
}

var lines [][]byte

func main() {
	//content, err := ioutil.ReadFile("input.txt")
	content, err := ioutil.ReadFile("debug.txt")
	lines = bytes.Split(content, []byte{'\n'})

	for i := range lines {
		eq := parse(lines[i])
		equations = append(equations, Tree(eq))
	}

	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Result: %d\n", compute(equations))
}
