import mongoose from "mongoose";    

const movieSchema = mongoose.Schema({
    movieId:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
    },
    altName:[
        {type:String}
    ],
    description:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }

})

const Movie = mongoose.model("movies",movieSchema)

export default Movie;