import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const MovieItem = ({title,releaseDate,posterUrl,id}) => {
  return (

    <Card sx={{ margin:2, width: 250, height:320, borderRadius:5, 
                    ":hover": {
                        boxShadow :"10px 10px 20px #ccc",
                        },        
      }}>

        <img height="150vh" width="100%" src={posterUrl} alt={title} />

    <CardContent>

      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {new Date(releaseDate).toDateString()}
      </Typography>

    </CardContent>

    <CardActions>

      <Button 
        sx={{ margin: "auto"}} 
        size="small" 
        variant="contained"
        
        LinkComponent={Link}
        to={`/booking/${id}`} >
        Book
      </Button> 

    </CardActions>
  </Card>

  )
}

export default MovieItem
