#! /usr/bin/python3

class Scientist:
	def __init__(self, name, field, born, nobel):
		self.name = name
		self.field = field
		self.born = born
		self.nobel = nobel

scientists = [
	Scientist("Einstein", "Physics", "1920", True),
	Scientist("Lovelace", "Maths", "old", False),
	Scientist("Turing", "CS", "2012", False)
]

print(scientists)
