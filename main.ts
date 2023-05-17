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
    if (weather_data[0] == "Water") {
        moisture = parseFloat(weather_data[1])
    }
}
function checkValues () {
    if (light2 < 600) {
        showAlert("L")
    } else if (humidity > 80) {
        showAlert("H")
    } else if (temperature < 15) {
        showAlert("T")
    } else if (wind > 0) {
        showAlert("W")
    } else if (moisture < 500) {
        showAlert("M")
    }
}
input.onButtonPressed(Button.A, function () {
    setTimerMode = false
    showWeatherMode = true
    basic.showLeds(`
        . . . . .
        . . . . #
        . . . # .
        # . # . .
        . # . . .
        `)
    basic.pause(500)
    basic.clearScreen()
    basic.pause(time * 1000)
    music.playTone(659, music.beat(BeatFraction.Whole))
    time = 0
})
function showAlert (char: string) {
    basic.showString(char)
    pins.digitalWritePin(DigitalPin.P1, 1)
    music.playTone(262, music.beat(BeatFraction.Whole))
    basic.pause(500)
    resetValues()
}
radio.onReceivedString(function (receivedString) {
    if (showWeatherMode) {
        weather_data = receivedString.split(" ")
        setValues()
        checkValues()
    }
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
    pins.digitalWritePin(DigitalPin.P1, 0)
    basic.clearScreen()
}
let pinValue0 = 0
let time = 0
let setTimerMode = false
let moisture = 0
let wind = 0
let temperature = 0
let humidity = 0
let light2 = 0
let weather_data: string[] = []
let showWeatherMode = false
resetValues()
radio.setGroup(23)
led.setBrightness(255)
showWeatherMode = true
basic.forever(function () {
    pinValue0 = pins.analogReadPin(AnalogPin.P0)
    while (setTimerMode) {
        setTimer()
    }
})
