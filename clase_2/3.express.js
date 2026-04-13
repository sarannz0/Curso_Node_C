
const express = require('express')
const ditto = require('./pokemon/ditto.js')

const PORT = process.env.PORT ?? 1234

const app = express()
app.disable('x-powered-by') // Deshabilitar el encabezado X-Powered-By para mayor seguridad 

// app.use(express.json()) // Middleware para parsear el cuerpo de las solicitudes JSON

app.use((req, res, next) => {
    if (req.method !== 'POST') return next()
    if (req.headers['content-type'] !== 'application/json') return next()
        
        // solo llegan request que son post y que tienen el header content-type: application/json   
        let body = ''

        // Escuchar el evento data
        req.on('data', chunk => {
            body += chunk.toString()
        })

        req.on('end', () => {
            const data = JSON.parse(body)
            data.timestamp = Date.now()
            // mutar la request y meter la informacion en el req.body
            req.body = data
            next()
        })
    })

    app.get('/pokemon/ditto', (req, res) => {
        res.json(ditto)
    })

    app.post('/pokemon', (req, res) => {
        // con el re.body se deberia guardar en base de datos
        res.status(201).json(req.body)
    })

    // La ultima a la que va a llegar 
    app.use((req, res) => {
        res.status(404).send('404 - Not Found')
    })

    app.listen(PORT, () => {
        console.log('server listening on port http://localhost:${PORT}')
    })
