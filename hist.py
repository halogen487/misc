#! /usr/bin/env python3

import matplotlib.pyplot as plt
import sys

data = []

for line in sys.stdin:
	data.append(int(line))
	print(line)

plt.hist(data, bins=40)
plt.show()
