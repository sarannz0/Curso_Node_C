import express, { json } from 'express' // require -> commonJs 
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

// como leer un json en ESmodules
//import fs from 'node:fs'
//const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8')) 

const app = express()
app.use(json()) // middleware para parsear el body de las peticiones como JSON  
app.use(corsMiddleware())
// middleware para habilitar CORS en todas las rutas
app.disable('x-powered-by') // deshabilitar el header x-powered-by


// Todos loos recursos que sean movies se identifica con /movies

app.use('/movies', moviesRouter)

app.get('/movies/:id', todo)

app.post('/movies', todo)

app.post('/movies', todo)

app.delete('/movies/:id', todo)


app.patch('/movies/:id', todo)



const PORT = process.env.PORT ?? 1234


app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})

