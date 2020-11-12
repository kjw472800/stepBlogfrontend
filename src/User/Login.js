import React ,{useContext,useState}from 'react';
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Avatar, Box, Button, Snackbar, IconButton, Typography } from '@material-ui/core';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { useHttpClient } from '../shared/hooks/http-hook'
import { AuthContext } from '../shared/Context/auth-context';
import CloseIcon from '@material-ui/icons/Close';



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
    const [openSnacker, setopenSnacker] = useState(false);
    const handleClose=()=>setopenSnacker(false);

    const onLoginSubmit = async (data) => {
        console.log(data);
        auth.login();
        setopenSnacker(true); 
    }


    return (
        <Box m={2} boxShadow={10}  borderRadius="borderRadius" height={300} width='60%'>
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
                    <TextField variant="outlined" type='password'  fullWidth inputRef={register} margin="normal"    label="Password" name="Password"/>
                    <Button fullWidth type="submit" variant="contained" color='secondary'>Submit</Button>
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
    );
}

export default Login;