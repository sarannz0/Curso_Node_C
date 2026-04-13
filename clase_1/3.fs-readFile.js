const fs = require('node:fs')

console.log('leyendo el primer archivo...')
fs.readFileSync('./archivo.txt', 'utf-8', (err, text) => {
    console.log('primer texto:', text)
})

console.log('-> Hacer cosas mientras se lee el archivo.....')

console.log('leyendo el segundo archivo...')
fs.readFileSync('./archivo2.txt', 'utf-8', (err, text) => {
    console.log('segundo texto:', text)
})