import React ,{useContext}from 'react';
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Avatar, Box, Button, Card, Container, Paper, Typography } from '@material-ui/core';
import { deepOrange, green } from '@material-ui/core/colors';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { useHttpClient } from '../shared/hooks/http-hook'
import { AuthContext } from '../shared/Context/auth-context';




const useStyles = makeStyles((theme) => ({
    rounded: {
      color: '#fff',
      backgroundColor: theme.palette.secondary.dark,
    }
  }));

const Login=(props)=>{
    const classes= useStyles();
    const auth = useContext(AuthContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    

    const onLoginSubmit = async (data) => {
        try{

            const response= await sendRequest(
                process.env.REACT_APP_BACKEND_URL+'/users/login',
                'POST',
                JSON.stringify(
                    {
                        email:data.Email,
                        password:data.Password
                    }
                ),
                {
                    'Content-Type':'application/json'
                }

            );
            console.log(response);
            auth.login(response.token);    
        }
        catch(err){
            console.log(error);
        }
    
    }


    return (
        <Box m={2} boxShadow={10}  borderRadius="borderRadius" height={300} >
            <Box display="flex" mt={1} alignItems='center' justifyContent='center'> 
                <Avatar className={classes.rounded}>
                    <LockOpenOutlinedIcon />
                </Avatar>
            </Box>
            <Box display="flex" alignItems='center' justifyContent='center'> 
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
            </Box>
            <Box p={1} >
            <form onSubmit={handleSubmit(onLoginSubmit)}>
                    <TextField variant="outlined" fullWidth inputRef={register} margin="normal"  label="Email" name="Email"/>
                    <TextField variant="outlined"  fullWidth inputRef={register} margin="normal"    label="Password" name="Password"/>
                    <Button fullWidth type="submit" variant="contained" color='secondary'>Submit</Button>
            </form>
            </Box>
        </Box>
    );
}

export default Login;