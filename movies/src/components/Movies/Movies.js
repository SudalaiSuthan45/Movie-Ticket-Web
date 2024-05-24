import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { getAllMovies } from '../../api-helpers/api-helpers';
import MovieItem from './MovieItem';

const Movies = () => {
    const [movies,setMovies] = useState();
    useEffect(() => {
        getAllMovies()
                .then((data) => setMovies(data.movies))
                .catch((err) => console.log(err));
    },[]);

  return (
    
    <Box margin={'auto'} marginTop={4}>

        <Typography variant="h4" margin={'auto'} padding={2} width="40%" textAlign="center" bgcolor="#FEF250" color="black">
            All Movies
        </Typography>

        <Box width={'100%'} margin="auto" marginTop={5} display={'flex'} justifyContent="center" flexWrap={"wrap"}>
            {movies && movies.map((movie,index) => (
                <MovieItem 
                    key={index}

                    id={movie._id}
                    title={movie.title}
                    posterUrl={movie.posterUrl} 
                    releaseDate={movie.releaseDate}
                />
            ))}
        </Box>
    </Box>
  )
}

export default Movies;
