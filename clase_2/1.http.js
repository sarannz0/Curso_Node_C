const http = require('node:http') // protocolo HTTP

const desiredPort = process.env.PORT ?? 1234

const processRequest = http.createServer((req, res) => {
    if (req.url === '/') {
        res.statusCode = 200 //OK
        res.setHeader('Content-Type', 'application/json')
        res.end('HBienvenido a mi pagina de Inicio')
    } else if (req.url === '/contacto') {
        res.statusCode = 200 //OK   
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('<h1>Contacto</h1>')
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
        console.log('server listening on port http://localhost:${desiredPort}')
})
