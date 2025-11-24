import express from 'express';
import { deleteMovies, getMovie, getMovieById, saveMovies, updateMovies } from '../controllers/movieController';

const productRouter = express.Router()

productRouter.get('/',getMovie)
productRouter.post('/',saveMovies)
productRouter.delete('/:productId',deleteMovies)
productRouter.put('/:productId', updateMovies)
productRouter.get('/:productId',getMovieById)

export default productRouter;