import { Button, Dialog, FormLabel, IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Link } from 'react-router-dom';

const labelStyle = { mt:1,mb:1,mr:"auto" };

const AuthForm = ({onSubmit, isAdmin }) => {

    const [ inputs,setInputs ] = useState({
        name : "",
        email : "",
        password : "",
    });

    const [ isSignup, setIsSignup ] = useState(false);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value,
        }))

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({inputs, signup: isAdmin ? false : isSignup });
    };

  return (

        <Dialog PaperProps={{style:{borderRadius:20 }}} open={true}>
            <Box sx={{ ml:"auto", padding:1 }}>
                <IconButton LinkComponent={Link} to="/">
                    <CloseRoundedIcon />
                </IconButton>
            </Box>
            <Typography variant="h4" textAlign={"center"}>
                {isSignup?"Signup":"Login"}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box 
                    display={"flex"} 
                    justifyContent={"center"} 
                    flexDirection="column" 
                    width="400" 
                    margin="auto" 
                    alignItems={"center"}
                    padding={6}
                >
                        { !isAdmin && isSignup && ( 
                            <>
                                {""}
                                <FormLabel sx={labelStyle}>Name</FormLabel>
                                <TextField margin="normal" variant="standard" type={'text'} name="name" value={inputs.name}
                                    onChange={handleChange} fullWidth />
                            </>
                        )}

                        <FormLabel sx={labelStyle}>Email</FormLabel>
                            <TextField margin="normal" variant="standard" type={'email'} name="email" value={inputs.email}
                                    onChange={handleChange} fullWidth />

                        <FormLabel sx={labelStyle}>Password</FormLabel>
                            <TextField margin="normal" variant="standard" type={'password'} name="password" value={inputs.password}
                                    onChange={handleChange} fullWidth />

                        <Button sx={{mt:2,borderRadius:10,bgcolor:"#43C6DB"}} type="submit" fullWidth variant="contained">
                            {isSignup?"Signup":"Login"}
                        </Button>

                        { !isAdmin && (
                            <Button onClick={() => setIsSignup(!isSignup)} sx={{mt:2,borderRadius:10 }}  fullWidth >
                                Switch To {isSignup?"Login":"Signup"}
                            </Button>
                        )}
                </Box>
            </form>
        </Dialog>
  )
}

export default AuthForm;
