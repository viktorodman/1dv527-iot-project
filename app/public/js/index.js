import '../socket.io/socket.io.js'

const socket = window.io()

socket.on('sensor-data', arg => {
    const humidity = document.querySelector('#humidity')
    const temp = document.querySelector('#temperature')
    const date = document.querySelector('#date')

    humidity.textContent = `${arg.humidity}%`
    temp.textContent = `${arg.temperature}°C`
    date.textContent = `${arg.date}`
})
