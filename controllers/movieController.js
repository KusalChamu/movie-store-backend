import Movie from "../models/movie";
import { isAdmin } from "./userController";

export async function getMovie(req,res){
    try{
        if(isAdmin(req)){
            const movies = await Movie.find();
            res.status(200).json(movies);
        }
        else{
            const movies = await Movie.find({isAvailable : true})
            res.json(movies)
        }
    }catch(err){
        res.json({
            message:"Error fetching movies"
        })
    }
}

export function saveMovies(req,res){
    if(!isAdmin(req)){
        
        return res.status(403).json({
            message:"Unauthorized you need to be an admin to create a movie"
        })
    }

    const movie = new Movie(req.body)

    movie.save()

    .then(()=>{
        res.json({
            message:"Product added successfully"
        })
    })
    .catch((err)=>{
         res.status(500).json({
        message: "Error adding movie",
        error: err.message
    });
    })
}

export async function deleteMovies(req,res) {
    if(!isAdmin(req)){
        res.status(403).json({
            message:"Unauthorized you need to be an admin to update a movie"
        })
        return
    }

    try{
        await Movie.deleteOne({movieId:req.params.movieId})

        res.json({
            message:"Product deleted successfully"
        })
    }catch(err) {
        res.status(500).json({
            message: "Error deleting movie",
            error: err.message
        });
    }
}

export async function updateMovies(req,res) {
    if(!isAdmin(req)){
        res.status(403).json({
            message:"Unauthorized you need to be an admin to update a movie"
        })
        return
    }
    const movieId = req.params.movieId
    const updatingData = req.body

    try{
        await Movie.updateOne(
            {movieId:movieId},
            updatingData
        )
        res.json({
            message:"product updated successfully"
        })
    }
    catch{
        res.status(500).json({
            message: "Error updating product",
            error: err.message
        }); 
    }
}

