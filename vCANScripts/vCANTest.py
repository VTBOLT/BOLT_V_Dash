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
    mtrTempHigh = 0
    mtrTempLow = 0
    lowCell = 90
    highCell = 110

    while 1:
        rpmLow += 50
        socLow -= 1
        mtrTempLow += 1
        lowCell += 1
        highCell += 1

        if (rpmLow >= 255):
            rpmLow = 0
            rpmHigh += 1

        if (rpmHigh == 31):
            rpmLow = 0
            rpmHigh = 0
        
        if (socLow == 0):
            socLow = 200

        if (mtrTempLow >= 255):
            mtrTempLow = 0
            mtrTempHigh += 1

        if (mtrTempHigh == 3 and mtrTempLow == 32):
            mtrTempLow = 0
            mtrTempHigh = 0

        if (lowCell > 130):
            lowCell = 90
        
        if (highCell > 150):
            highCell = 110
            
        rpmMsg = can.Message(arbitration_id = 0x0a5, data = [0, 0, rpmLow, rpmHigh], is_extended_id = False)
        socMsg = can.Message(arbitration_id=0x6b2, data = [socLow, socHigh, 0, 0], is_extended_id = False)
        mtrTempMsg = can.Message(arbitration_id=0x0a2, data = [0, 0, 0, 0, mtrTempLow, mtrTempHigh], is_extended_id = False)
        bmsTempsMsg = can.Message(arbitration_id=0x6b4, data = [highCell, 0, lowCell, 0], is_extended_id=False)

        bus.send(rpmMsg)
        bus.send(socMsg)
        bus.send(mtrTempMsg)
        bus.send(bmsTempsMsg)
        # time.sleep(0.01)
        time.sleep(5)
        

sendLoop()