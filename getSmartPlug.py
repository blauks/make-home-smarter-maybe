import tinytuya
import json
import datetime
import time

devicesFile = open("devices.json", "r")
devices = json.load(devicesFile)
devicesFile.close()

device = tinytuya.OutletDevice(devices[0]["id"], "0.0.0.0", devices[0]["key"])
device.set_version(3.3)

historicData = []
historicDataFile = open("historic.json", "w+")

if not historicDataFile.read() == "":
    historicData = json.loads(historicDataFile)


while True:
    data = device.status()
    energyData = {str(datetime.datetime.now()) : {"mA": data['dps']['18'], "W": data['dps']['19']}}
    historicData.append(energyData)
    historicDataFile.write(json.dumps(historicData))

    print("------- CURRENT DATA -------")
    print("Time: " + str(datetime.datetime.now()))
    print("Current: " + str(data['dps']['18']))
    print("Power: " + str(data['dps']['19']))
    print("----------------------------")
    time.sleep(5)
