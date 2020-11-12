import React,{useContext} from 'react';
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import { Box, Button, Backdrop, CircularProgress, Typography } from '@material-ui/core';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import { AuthContext } from '../shared/Context/auth-context';
import { useHttpClient } from '../shared/hooks/http-hook';
import { useHistory } from 'react-router-dom';
import ErrorIcon from '@material-ui/icons/Error';

const CreatePlace=(props)=>{
    const auth = useContext(AuthContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const history= useHistory();
    const onSubmit = async (data) => {
        try{
            const formData= new FormData();
            formData.append('title',data.title);
            formData.append('subtitle',data.subtitle);
            formData.append('description',data.description);
            formData.append('address',data.address);
            //formData.append('creator',auth.userId);
            formData.append('image',data.image[0]);

             const response= await sendRequest(
                 process.env.REACT_APP_BACKEND_URL+'/places',
                 'POST',
                 formData,
                 {
                      Authorization:'Bearer '+auth.token
                 }

             );
             history.push('/places');
        }
        catch(err){
        }
    }

    return (
        <Box width='90%'>
        <Backdrop  open={isLoading}>
            <CircularProgress color="inherit" />
        </Backdrop>
        <Box m={2} boxShadow={10} borderColor="secondary.main"  borderRadius="borderRadius" width="100%">
        
            <Box display="flex" alignItems='center'> 
                <GolfCourseIcon fontSize="large" color='secondary'/>
                <Typography variant='h3'  display='inline'  >Create Your Place</Typography>
            </Box>
            <Box p={1} >
            <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField variant="outlined" inputRef={register({ required: true, minLength: 2 })} margin="normal" fullWidth label="Title" name="title"/>
                    {errors.title && <Typography> <ErrorIcon color='primary'/> length of a title is at least 2</Typography>}
                    <TextField variant="outlined"  inputRef={register({ required: true, minLength: 2 })} margin="dense" fullWidth   label="Subtitle" name="subtitle"/>
                    {errors.subtitle && <Typography> <ErrorIcon color='primary'/> length of a subtitle is at least 2</Typography>}
                    <TextField variant="outlined" rows={20} inputRef={register({ required: true, minLength: 5 })} margin="normal" fullWidth multiline  label="Comment" name="description"/>
                    {errors.description && <Typography> <ErrorIcon color='primary'/> length of a comment is at least 5</Typography>}
                    <TextField variant="outlined" inputRef={register({ required: true, minLength: 2 })} fullWidth margin="normal" label="Address/ Name" name="address"/>
                    {errors.address && <Typography> <ErrorIcon color='primary'/> length of an address is at least 5</Typography>}
                    <input
                        style={{margin:10}}
                        name="image"
                        ref={register({required:true})}
                        type="file"
                    />

                    <Button fullWidth type="submit" variant="contained" color='secondary'>
                        submit 
                    </Button>
            </form>
            </Box>
        </Box>
        </Box>
    );
}

export default CreatePlace;