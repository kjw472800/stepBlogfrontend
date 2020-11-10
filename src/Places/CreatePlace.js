import React,{useContext} from 'react';
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import { Box, Button, Backdrop, CircularProgress, Paper, Typography, Divider } from '@material-ui/core';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import { AuthContext } from '../shared/Context/auth-context';
import { useHttpClient } from '../shared/hooks/http-hook';
import { useHistory } from 'react-router-dom';

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
            console.log(formData);

             const response= await sendRequest(
                 process.env.REACT_APP_BACKEND_URL+'/places',
                 'POST',
                 formData,
                 {
                      Authorization:'Bearer '+auth.token
                 }

             );
             console.log(response);
             history.push('/places');
        }
        catch(err){
            console.log(error);
        }
    }

    return (
        <div>
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
                    <TextField variant="outlined" inputRef={register} margin="normal" fullWidth label="Title" name="title"/>
                    <TextField variant="outlined"  inputRef={register} margin="dense" fullWidth   label="Subtitle" name="subtitle"/>
                    <TextField variant="outlined" rows={20} inputRef={register} margin="normal" fullWidth multiline  label="Comment" name="description"/>
                    <TextField variant="outlined" inputRef={register} fullWidth margin="normal" label="Address/ Name" name="address"/>
                    <input
                        name="image"
                        ref={register}  
                        type="file"
                    />
  
                    <Button fullWidth type="submit" variant="contained" color='secondary'>
                        submit 
                    </Button>
            </form>
            </Box>
        </Box>
        </div>
    );
}

export default CreatePlace;