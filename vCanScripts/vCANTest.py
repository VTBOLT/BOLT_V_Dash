import time
import can


bustype = 'socketcan'
channel = 'vcan0'

def sendLoop():
    bus = can.interface.Bus(channel=channel, bustype=bustype)

    rpmHigh = 0
    rpmLow = 0
    while 1:
        rpmLow += 50

        if (rpmLow >= 255):
            rpmLow = 0
            rpmHigh += 1

        if (rpmHigh == 31):
            rpmLow = 0
            rpmHigh = 0

        msg = can.Message(arbitration_id = 0x0a5, data = [0, 0, rpmLow, rpmHigh], is_extended_id = False)
        bus.send(msg)
        time.sleep(0.01)

sendLoop()