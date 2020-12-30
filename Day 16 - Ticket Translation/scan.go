package main

import (
	"io/ioutil"
	"log"
	"regexp"
	"strconv"
	"strings"
)

type Range struct {
	min int
	max int
}

type Rule struct {
	key string
	ranges [2]Range
	idx int
	vals map[int]bool
}

type Ticket struct {
	vals []int
}

func (rule *Rule) pass(val int) bool {
	for _, r := range rule.ranges {
		if val >= r.min && val <= r.max {
			return true
		}
	}
	return false
}

func (ticket *Ticket) isValid() bool {
	for i, val := range ticket.vals {
		isValid := false

		for _, rule := range rules {
			if rule.pass(val)  {
				isValid = true
			} else {
				rule.vals[i] = false
			}
		}

		if !isValid {
			return false
		}
	}

	return true
}

var rules []Rule
var myTicket Ticket
var nearbyTickets []Ticket

func parse(input []byte) error {
	var err error

	matchRule := regexp.MustCompile(`(.+):\s(\d+)-(\d+)\sor\s(\d+)-(\d+)`)
	for _, vals := range matchRule.FindAllSubmatch(input, -1) {
		rule := Rule{key: string(vals[1]), idx: -1,  vals: make(map[int]bool)}

		var numbers [4]int
		for i, n := range vals[2:] {
			numbers[i], err = strconv.Atoi(string(n))
		}
		for i := range rule.ranges {
			rule.ranges[i] = Range {
				min: numbers[i * 2],
				max: numbers[i * 2 + 1],
			}
		}
		rules = append(rules, rule)
	}

	matchTickets := regexp.MustCompile(`((?:(?:\d+),*)+)`)
	ticketsIndex := strings.Index(string(input), "your ticket")
	for i, match := range matchTickets.FindAllSubmatch(input[ticketsIndex:], -1) {
		var vals []int
		for _, val := range strings.Split(string(match[1]), ",") {
			n, e := strconv.Atoi(val)
			err = e
			vals = append(vals, n)
		}
		if i == 0 {
			myTicket.vals = vals
		} else {
			nearbyTickets = append(nearbyTickets, Ticket{vals: vals})
		}

	}

	return err
}

func done() bool {
	for i, rule := range rules {
		var ids []int
		for k, v := range rule.vals {
			if v {
				ids = append(ids, k)
			}
		}
		if len(ids) == 1 {
			rules[i].idx = ids[0]
			for _, r := range rules {
				r.vals[ids[0]] = false
			}
			return false
		}
	}
	return true
}

func compute() int {
	//filter invalid tickets
	for i := 0; i < len(nearbyTickets); {
		if nearbyTickets[i].isValid() {
			i++
		} else {
			nearbyTickets[i] = nearbyTickets[len(nearbyTickets)-1]
			nearbyTickets = nearbyTickets[:len(nearbyTickets)-1]
		}
	}

	for _, rule := range rules {
		for i := 0; i < len(rules); i++ {
			rule.vals[i] = true
		}
	}

	for _, t := range nearbyTickets {
		t.isValid()
	}

	for !done() {}

	result := 1
	for _, rule := range rules {
		if strings.Contains(rule.key, "departure") {
			result *= myTicket.vals[rule.idx]
		}
	}

	return result
}

func main() {
	content, err := ioutil.ReadFile("input.txt")

	err = parse(content)

	if err != nil {
		log.Fatal(err)
	}

	println("Result:", compute())
}
