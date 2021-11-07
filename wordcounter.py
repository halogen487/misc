#! /usr/bin/env python3

import sys

words = 0

for line in sys.stdin:
	words += len(line.split())

print(words)
