#!/usr/bin/env python3

import subprocess

print(str(subprocess.run(["gsettings", "get", "org.gnome.shell", "favorite-apps"], capture_output=True).stdout)[2:-3])
	#print(i + " ")
