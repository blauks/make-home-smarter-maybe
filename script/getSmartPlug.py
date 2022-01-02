import tinytuya
import json
import datetime
import time

# Devices file is generated with python -m tinytuya wizard
devicesFile = open("devices.json", "r")
devices = json.load(devicesFile)
devicesFile.close()

device = tinytuya.OutletDevice(devices[0]["id"], "0.0.0.0", devices[0]["key"])
device.set_version(3.3)
device.set_socketPersistent(True)

historicData = {}
readHistoricDataFile = open("historic.json", "r")

try:
    historicData = json.loads(readHistoricDataFile.read())
except: pass

payload = device.generate_payload(tinytuya.DP_QUERY)
data = {}

while True:
    device.send(payload)
    response = device.receive()

    if not response == None: 
        data.update(response.get('dps', {}))

    date = datetime.datetime.now()
    energyData = {"date": str(date), "mA": data['18'], "W": float(data['19']/10)}
    
    year = date.strftime("%Y")
    month = date.strftime("%B")
    day = date.strftime("%d")

    # :|
    if historicData.get(year) == None:
        historicData[date.strftime("%Y")] = {}

    # :)
    if historicData[year].get(month) == None:
        historicData[year][month] = {"days": {}}

    # :D
    if historicData[year][month]["days"].get(day) == None:
        historicData[year][month]["days"][day] = []

    historicData[year][month]["days"][day].append(energyData)

    if not historicData.get(str(int(year)-1), {}).get(month) == None:
        del historicData[str(int(year)-1)][month]
        if len(historicData[str(int(year)-1)]) < 1:
            del historicData[str(int(year)-1)]

    writeHistoricDataFile = open("historic.json", "w")
    writeHistoricDataFile.write(json.dumps(historicData, indent=4, sort_keys=True))
    writeHistoricDataFile.close()

    print("------- CURRENT DATA -------")
    print("Time: " + str(datetime.datetime.now()))
    print("Current: " + str(data['18']))
    print("Power: " + str(float(data['19']/10)))
    print("----------------------------")
    
    time.sleep(5)

    payload = device.generate_payload(tinytuya.DP_QUERY)
