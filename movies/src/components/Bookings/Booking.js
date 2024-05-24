import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMovieDetails, newBooking } from '../../api-helpers/api-helpers';
import { Box } from '@mui/system';
import { Button, FormLabel, TextField, Typography } from '@mui/material';

const Booking = () => {

    const navigate = useNavigate();

    const [movie, setMovie] = useState();

    const [inputs, setInputs] = useState({ seatNumber: "", date: "" });

    const id = useParams().id;
    console.log(id);
    
    useEffect(() => {

        getMovieDetails(id)
            .then((res) => setMovie(res.movie))
            .catch((err) => console.log(err));

    },[id]);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);

        newBooking({ ...inputs, movie: movie._id })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

        navigate("/user");
    };

  return (
    <Box>
        { movie && 
            <Fragment>

                <Typography padding={3} fontFamily="fantasy" variant="h4" textAlign={"center"} color="coral">

                    Book Tickets of Movie : { movie.title }

                </Typography>

                <Box display={'flex'} justifyContent={"center"}>

                    <Box display={'flex'} justifyContent="column" flexDirection="column" 
                            paddingTop={3} width="50%"  marginRight={"auto"}>

                        <img width="80%" height={"300px"} src={movie.posterUrl} alt={movie.title} />

                        <Box width={"80%"} marginTop={3} padding={2}>

                            <Typography fontWeight={"bold"}  textAlign={"center"}>
                                { movie.title}  
                            </Typography>

                            <Typography paddingTop={2}> {movie.description} </Typography>

                            <Typography fontWeight={"bold"} marginTop={1}>
                                Starrer : 
                                { movie.actors.map((actor) => " " + actor + ",") }    
                             </Typography>

                            <Typography fontWeight={"bold"} marginTop={2}> 
                                 Release Date : 
                                    { " " + new Date(movie.releaseDate).toDateString() } 
                            </Typography>

                        </Box>

                    </Box>

                    <Box width={"50%"} paddingTop={3}>

                        <form onSubmit={handleSubmit}>
                            <Box padding={5} margin={"auto"} display={"flex"} flexDirection="column">

                                <FormLabel>Seat Number</FormLabel>
                                <TextField type={"number"} name="seatNumber" margin="normal" variant="standard" 
                                    value={inputs.seatNumber} onChange={handleChange} />

                                <FormLabel>Booking Date</FormLabel>
                                <TextField type={"date"} name="date" margin="normal" variant="standard" 
                                    value={inputs.date} onChange={handleChange} />

                                <Button type={"submit"} sx={{mt:3}} fullWidth variant="contained"> Book Now </Button>
                            </Box>

                        </form>

                    </Box>

                </Box>
            </Fragment>
        }
    </Box>
  )
}

export default Booking
