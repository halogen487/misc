#! /usr/bin/env python3

import sys
def fact(x):
	fact = 1
	for i in range(1, x + 1):
		fact *= i
	return fact

print(fact(int(sys.argv[1])))
