import React,{useContext} from 'react';
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import { Box, Button, Card, Container, Paper, Typography } from '@material-ui/core';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import { AuthContext } from '../shared/Context/auth-context';
import { useHttpClient } from '../shared/hooks/http-hook';

const CreatePlace=(props)=>{
    const auth = useContext(AuthContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const onSubmit = async (data) => {
        try{

            const response= await sendRequest(
                process.env.REACT_APP_BACKEND_URL+'/places/createplace',
                'POST',
                JSON.stringify(
                    {
                        title:data.Title,
                        subtitle:data.Subtitle,
                        description:data.Description
                    }
                ),
                {
                    'Content-Type':'application/json',
                     Authorization:'Bearer '+auth.token
                }

            );
            console.log(response);
        }
        catch(err){
            console.log(error);
        }
    }

    return (
        <Box m={2} boxShadow={10} borderColor="secondary.main"  borderRadius="borderRadius" width="100%">
        
            <Box display="flex" alignItems='center'> 
                <GolfCourseIcon fontSize="large" color='secondary'/>
                <Typography variant='h3'  display='inline'  >Create Your Place</Typography>
            </Box>
            <Box p={1} >
            <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField variant="outlined" inputRef={register} margin="normal" fullWidth label="Title" name="Title"/>
                    <TextField variant="outlined"  inputRef={register} margin="dense" fullWidth   label="Subtitle" name="Subtitle"/>
                    <TextField variant="outlined" rows={20} inputRef={register} margin="normal" fullWidth multiline  label="Comment" name="Description"/>
                    <TextField variant="outlined" inputRef={register} fullWidth margin="normal" label="Address/ Name" name="Address"/>
                    {/* <TextField variant="outlined" inputRef={register}   fullWidth margin="normal" label="Image" name="Image"/> */}
                    <Button fullWidth type="submit" variant="contained" color='secondary'>Submit</Button>
            </form>
            </Box>
        </Box>
    );
}

export default CreatePlace;