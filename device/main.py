import time
from machine import Pin
import json
import machine
from mqtt import MQTTClient
from dht import DHT # https://github.com/JurassicPork/DHT_PyCom
from network import WLAN


led = Pin('P9', mode=Pin.OUT)

def sub_cb(topic, msg):
    print(msg)
    for i in range(0,3):
        led.value(1)
        time.sleep_ms(100)
        led.value(0)
        time.sleep_ms(100)

wlan = WLAN(mode=WLAN.STA)

wlan.connect(ssid='TN_wifi_B213B9', auth=(WLAN.WPA2, ''))

while not wlan.isconnected():
    machine.idle()
print('WIFI Connected')

client = MQTTClient("moistly", "iot-edu-lab.lnu.se", user="", password="", port=1883)

client.set_callback(sub_cb)
client.connect()
client.subscribe(topic="moist_moist/temp_moist")
th = DHT(Pin('P23', mode=Pin.OPEN_DRAIN), 0)




while True:
    result = th.read()
    data = {
    "device": {
        "id": "pycom-lopy4",
        "name": "My WOT lopy",
        "sensor": {
            "id": "dht11",
            "name": "My temperature and humidity sersor",
            "description": "Measures temperature in celsius and humidity in percentage",
            "values": {
                "temperature": result.temperature,
                "humidity": result.humidity
                }
            }
        }
    }

    print('Sending ON')
    toJson = json.dumps(data)
    client.publish(topic="moist_moist/temp_moist", msg=toJson)
    time.sleep(40)
    client.check_msg()

# Type 0 = dht11
# Type 1 = dht22


#time.sleep(2)

#while True:
#    result = th.read()
#    while not result.is_valid():
#        time.sleep(.5)
#        result = th.read()
#        print('Temp:', result.temperature)
#        print('RH:', result.humidity)
    #pybytes.send_signal(1,result.temperature)
    #pybytes.send_signal(2,result.humidity)

#    time.sleep(1)
