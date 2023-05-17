def on_button_pressed_a():
    global setTimerMode, showWeatherMode, time
    setTimerMode = False
    showWeatherMode = True
    basic.pause(time * 1000)
    music.play_tone(262, music.beat(BeatFraction.WHOLE))
    time = 0
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_received_string(receivedString):
    global weather_data, light2
    if showWeatherMode:
        weather_data = receivedString.split(" ")
        serial.write_line("" + (weather_data[1]))
        if weather_data[0] == "Light":
            light2 = parse_float(weather_data[1])
        if light2 < 600:
            basic.show_string("Low Light!")
            light2 = 999
radio.on_received_string(on_received_string)

def on_button_pressed_b():
    global showWeatherMode, setTimerMode
    showWeatherMode = False
    setTimerMode = True
input.on_button_pressed(Button.B, on_button_pressed_b)

def setTimer():
    global time
    if pins.analog_read_pin(AnalogPin.P0) < 50:
        if time > 0:
            time += -1
            basic.show_number(time)
            basic.pause(100)
    if pins.analog_read_pin(AnalogPin.P0) > 950:
        time += 1
        basic.show_number(time)
        basic.pause(100)
def resetValues():
    pass
pinValue0 = 0
weather_data: List[str] = []
time = 0
setTimerMode = False
showWeatherMode = False
light2 = 0
humidity = 0
water = 999
temperature = 999
light2 = 999
wind = 0
showWeatherMode = True
radio.set_group(23)
led.set_brightness(255)

def on_forever():
    global pinValue0
    pinValue0 = pins.analog_read_pin(AnalogPin.P0)
    while setTimerMode:
        setTimer()
basic.forever(on_forever)
