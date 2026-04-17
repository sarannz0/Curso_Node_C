import { MovieModel } from "../models/movie"

export class MovieController {
    static async getAll(re, res) {
        const { genre } = req.query
        const movies = await MovieModel.getAll({ genre})
        // que es lo que renderiza la vista? -> los datos, en este caso, las peliculas
        res.render(movies)

    }
}
