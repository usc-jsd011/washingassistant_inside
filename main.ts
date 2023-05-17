function setValues () {
    if (weather_data[0] == "Light") {
        light2 = parseFloat(weather_data[1])
    }
    if (weather_data[0] == "Humidity") {
        humidity = parseFloat(weather_data[1])
    }
    if (weather_data[0] == "Temperature") {
        temperature = parseFloat(weather_data[1])
    }
    if (weather_data[0] == "Wind") {
        wind = parseFloat(weather_data[1])
    }
    if (weather_data[0] == "Moisture") {
        moisture = parseFloat(weather_data[1])
    }
}
function checkValues () {
    if (light2 < 600) {
        basic.showString("L")
        basic.pause(500)
    }
    if (humidity > 80) {
        basic.showString("H")
        basic.pause(500)
    }
    if (temperature < 15) {
        basic.showString("T")
        basic.pause(500)
    }
    if (wind > 0) {
        basic.showString("W")
        basic.pause(500)
    }
    if (moisture < 500) {
        basic.showString("M")
        basic.pause(500)
    }
}
input.onButtonPressed(Button.A, function () {
    setTimerMode = false
    showWeatherMode = true
    basic.pause(time * 1000)
    music.playTone(262, music.beat(BeatFraction.Whole))
    time = 0
})
radio.onReceivedString(function (receivedString) {
    if (showWeatherMode) {
        weather_data = receivedString.split(" ")
        serial.writeLine("" + (weather_data[1]))
    }
    setValues()
    checkValues()
    resetValues()
})
input.onButtonPressed(Button.B, function () {
    showWeatherMode = false
    setTimerMode = true
})
function setTimer () {
    if (pins.analogReadPin(AnalogPin.P0) < 50) {
        if (time > 0) {
            time += -1
            basic.showNumber(time)
            basic.pause(100)
        }
    }
    if (pins.analogReadPin(AnalogPin.P0) > 950) {
        time += 1
        basic.showNumber(time)
        basic.pause(100)
    }
}
function resetValues () {
    humidity = 0
    moisture = 999
    temperature = 999
    light2 = 999
    wind = 0
    basic.clearScreen()
}
let pinValue0 = 0
let time = 0
let setTimerMode = false
let weather_data: string[] = []
let showWeatherMode = false
let wind = 0
let light2 = 0
let temperature = 0
let moisture = 0
let humidity = 0
humidity = 0
moisture = 999
temperature = 999
light2 = 999
wind = 0
showWeatherMode = true
radio.setGroup(23)
led.setBrightness(255)
basic.forever(function () {
    pinValue0 = pins.analogReadPin(AnalogPin.P0)
    while (setTimerMode) {
        setTimer()
    }
})
