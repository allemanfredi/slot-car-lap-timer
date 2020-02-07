import RPi.GPIO as IO
import time
import sys

IO.setmode(IO.BCM)

MAX_SIGNAL_FOR_LAP = 3
SLEEP_TIME = 0.01

IO.setup(14,IO.IN)
IO.setup(18, IO.IN)
IO.setup(23,IO.IN)
IO.setup(24, IO.IN)

l1s = 0
l2s = 0
l3s = 0
l4s = 0

while 1:
    l1 = IO.input(14)
    if l1 == False:
        sys.stdout.write("L1:1")
        sys.stdout.flush()
        l1s = 0
    elif l1s < MAX_SIGNAL_FOR_LAP:
        sys.stdout.write("L1:0")
        sys.stdout.flush()
        l1s = l1s + 1

    l2 = IO.input(18)
    if l2 == False:
        sys.stdout.write("L2:1")
        sys.stdout.flush()
        l2s = 0
    elif l2s < MAX_SIGNAL_FOR_LAP:
        sys.stdout.write("L2:0")
        sys.stdout.flush()
        l2s = l2s + 1

    l3 = IO.input(23)
    if l3 == False:
        sys.stdout.write("L3:1")
        sys.stdout.flush()
        l3s = 0
    elif l3s < MAX_SIGNAL_FOR_LAP:
        sys.stdout.write("L3:0")
        sys.stdout.flush()
        l3s = l3s + 1
    
    l4 = IO.input(24)
    if l4 == False:
        sys.stdout.write("L4:1")
        sys.stdout.flush()
        l4s = 0
    elif l4s < MAX_SIGNAL_FOR_LAP:
        sys.stdout.write("L4:0")
        sys.stdout.flush()
        l4s = l4s + 1

    time.sleep(SLEEP_TIME)
