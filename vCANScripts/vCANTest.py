import time
import can


bustype = 'socketcan'
channel = 'vcan0'
#let soc = ((msg['data'][1] << 8) + msg['data'][0]) * 0.5;

def sendLoop():
    bus = can.interface.Bus(channel=channel, bustype=bustype)

    rpmHigh = 0
    rpmLow = 0
    socHigh = 0
    socLow = 200
    while 1:
        rpmLow += 50
        socLow -= 1

        if (rpmLow >= 255):
            rpmLow = 0
            rpmHigh += 1

        if (rpmHigh == 31):
            rpmLow = 0
            rpmHigh = 0
        
        if (socLow == 0):
            socLow = 200

        rpmMsg = can.Message(arbitration_id = 0x0a5, data = [0, 0, rpmLow, rpmHigh], is_extended_id = False)
        socMsg = can.Message(arbitration_id=0x6b2, data = [socLow, socHigh, 0, 0], is_extended_id = False)
        bus.send(rpmMsg)
        bus.send(socMsg)
        time.sleep(0.01)
        

sendLoop()