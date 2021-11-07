#! /usr/bin/env node

// dijkstra's algorithm, featuring object orientation
// 28 lines, liberally
// by jacob

const dijkstra = (graph, start, end) => {
	let startNode = graph.find(node => node.name == start)
	let endNode = graph.find(node => node.name == end)
	let currentNode = startNode
	startNode.cost = 0
	while (graph.find(node => node.visited == false)) {
		for (cheapNode of graph.sort((a, b) => {return a.cost - b.cost})) {
			if (cheapNode.visited == false) {
				currentNode = cheapNode
				break
			}
		}
		for (arc of currentNode.neighbors) {
			let neighbor = graph.find(node => node.name == arc.name)
			if (neighbor.visited == false) { // if unvisited
				tentativeCost = currentNode.cost + arc.weight
				if (tentativeCost < neighbor.cost) {
					neighbor.cost = tentativeCost
					neighbor.previous = currentNode.name
				}
			}
		}
		currentNode.visited = true
		if (currentNode.name == end) {
			return [currentNode.previous, currentNode.cost]
		}
	}
}

const g = [
	{name: "a", cost: Infinity, visited: false, previous: null, neighbors: [
		{name: "b", weight: 3}, 
		{name: "c", weight: 5},
		{name: "e", weight: 8}
	]},
	{name: "b", cost: Infinity, visited: false, previous: null, neighbors: [
		{name: "a", weight: 3},
		{name: "c", weight: 1}, 
	]},
	{name: "c", cost: Infinity, visited: false, previous: null, neighbors: [
		{name: "a", weight: 5},
		{name: "b", weight: 1},
		{name: "d", weight: 4},
		{name: "e", weight: 2}
	]},
	{name: "d", cost: Infinity, visited: false, previous: null, neighbors: [
		{name: "c", weight: 4},
		{name: "e", weight: 3},
		{name: "f", weight: 3}
	]},
	{name: "e", cost: Infinity, visited: false, previous: null, neighbors: [
		{name: "a", weight: 8},
		{name: "c", weight: 2},
		{name: "d", weight: 3},
		{name: "f", weight: 1}
	]},
	{name: "f", cost: Infinity, visited: false, previous: null, neighbors: [
		{name: "d", weight: 3},
		{name: "e", weight: 1}
	]},
]

console.log(dijkstra(g, "a", "f"))
