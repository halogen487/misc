graph = []

class node:
	def __init__(self, id, neighbors):
		self.id = id
		self.neighbors = neighbors
		self.sanitise()

	def sanitise(self):
		while self.id in self.neighbors:
			self.neighbors.remove(self.id)
		for curNode in graph:
			if self in curNode.neighbors:
				if curNode not in self.neighbors:
					self.neighbors.append(curNode)

graph.append(node("a", ["b", "c", "d", "a"]))
graph.append(node("b", ["a", "d"]))
graph.append(node("c", ["a", "d"]))
graph.append(node("d", ["a", "c"]))
for node in graph:
	node.sanitise()
	print(node.id, node.neighbors)