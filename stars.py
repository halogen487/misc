#!/usr/bin/env python3

from spectrum import arcovar, marple_data, arma2psd
from pylab import plot, log10, linspace, axis

ar_values, error = arcovar(marple_data, 15)
psd = arma2psd(ar_values, sides='centerdc')
plot(linspace(-0.5, 0.5, len(psd)), 10*log10(psd/max(psd)))

axis([-0.5, 0.5, -60, 0])

print("bitch")
