#! /usr/bin/env python3

import random
import sys

n = int(sys.argv[1])

def bogocount(n):
	shuffles = 0
	l = [*range(1, n + 1)]
	random.shuffle(l)
	while l != [*range(1, n + 1)]:
		random.shuffle(l)
		shuffles += 1
	return shuffles

for i in range(int(sys.argv[2])):
	with open("./bogolist.txt", "a") as f:
		print(str(bogocount(n)))
