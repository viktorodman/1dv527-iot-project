import '../socket.io/socket.io.js'

const socket = window.io()

socket.on('test', arg => {
    console.log(arg)
})

socket.on('sensor-data', arg => {
    console.log(arg)

    /* const device = document.querySelector('.device') */
    const humidity = document.querySelector('#humidity')
    const temp = document.querySelector('#temperature')
    const date = document.querySelector('#date')

    console.log(humidity, temp, date)


    /* device.textContent = `Device: ${arg.device}` */
    humidity.textContent = `${arg.humidity}%`
    temp.textContent = `${arg.temperature}°C`
    date.textContent = `${arg.date}`
})
