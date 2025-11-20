import Movie from "../models/movie";

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
            message:"Error fetching products"
        })
    }
}

export function saveMovies(req,res){
    if(!isAdmin(req)){
        
        return res.status(403).json({
            message:"Unauthorized you need to be an admin to create a product"
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
        message: "Error adding product",
        error: err.message
    });
    })

}