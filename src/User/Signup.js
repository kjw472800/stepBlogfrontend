import React ,{useContext,useState}from 'react';
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Avatar, Box, Button, Backdrop, CircularProgress, Paper, Typography } from '@material-ui/core';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { useHttpClient } from '../shared/hooks/http-hook'
import { AuthContext } from '../shared/Context/auth-context';
import ErrorIcon from '@material-ui/icons/Error';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    rounded: {
      color: '#fff',
      backgroundColor: theme.palette.secondary.dark,
    }
  }));

const Signup=(props)=>{
    const classes= useStyles();
    const auth = useContext(AuthContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [openSnacker, setopenSnacker] = useState(false);
    const handleClose=()=>setopenSnacker(false);

    const onLoginSubmit = async (data) => {
        try{
            const response= await sendRequest(
                process.env.REACT_APP_BACKEND_URL+'/users/signup',
                'POST',
                JSON.stringify(
                    {
                        email:data.Email,
                        password:data.Password,
                        userName:data.UserName
                    }
                ),
                {
                    'Content-Type':'application/json'
                }

            );
            auth.login(response.token);    
        }
        catch(err){
            setopenSnacker(true);
        }
    
    }


    return (
        <Box m={1} width='60%'>
        <Backdrop   open={isLoading}>
            <CircularProgress color="inherit" />
        </Backdrop>
        <Box m={2} boxShadow={10}  borderRadius="borderRadius" >
            <Box display="flex" mt={1} pt={1} alignItems='center' justifyContent='center'> 
                <Avatar className={classes.rounded}>
                    <LockOpenOutlinedIcon />
                </Avatar>
            </Box>
            <Box display="flex" alignItems='center' justifyContent='center'> 
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
            </Box>
            <Box p={1} >
            <form onSubmit={handleSubmit(onLoginSubmit)}>
                    <TextField variant="outlined" fullWidth inputRef={register({ required: true,pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} margin="normal"  label="Email" name="Email"/>
                    {errors.Email && <Typography variant='body'> <ErrorIcon color='primary'/> email is required and should match pattern</Typography>}
                    <TextField variant="outlined"  fullWidth inputRef={register({ required: true, minLength: 6 })} margin="normal"    label="Password" name="Password"/>
                    {errors.Password && <Typography variant='body'> <ErrorIcon color='primary'/> length of a password is at least 6</Typography>}
                    <TextField variant="outlined" fullWidth inputRef={register({ required: true, minLength: 3 })} margin="normal"  label="UserName" name="UserName"/>
                    {errors.UserName && <Typography variant='body' ><ErrorIcon color='primary'/> length of a userName is at least 3</Typography>}
                    <Button fullWidth type="submit" variant="contained" color={'secondary'}>Submit</Button>
            </form>
            </Box>
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                open={!!error&&openSnacker}
                onClick={handleClose}
                message={error}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </Box>
        </Box>
    );
}

export default Signup;