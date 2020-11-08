import React, { useState,useContext,useEffect} from 'react';
import { useForm } from "react-hook-form";
import PlaceCard from '../shared/UIElements/PlaceCard';
import { Box, Button, Card, Container, Grid, TextField, Typography,Dialog } from '@material-ui/core';
import { AuthContext } from '../shared/Context/auth-context';
import { useHttpClient } from '../shared/hooks/http-hook';
import StreetviewIcon from '@material-ui/icons/Streetview';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const CreatePost=(props)=>{
    const k=[0,1,2,3,4,5,6,7,8];
    const [steps, setSteps] = useState([]);
    const auth = useContext(AuthContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [places, setPlaces] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogPlace, setDialogPlace] = useState(null);

    const handleOpen  = (i) => {
        setOpenDialog(true);
        setDialogPlace(i);
      };
      const handleClose = () => {
        setOpenDialog(false);
      };

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

    console.log(places);
    useEffect(() => {
        const fetchPlaces =async()=>{
            try{
                const response= await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/places/getallplaces`
                )
                console.log(response.places);
                setPlaces(response.places);
            }catch(err){}
        }
        const fetchUserPlaces =async()=>{
            try{
                const response= await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/places/getplacesbyuserid`,
                    'GET',
                    null,
                    {
                        'Content-Type':'application/json',
                         Authorization:'Bearer '+auth.token
                    }
                )
                console.log(response.places);
                setPlaces(response.places);
            }catch(err){}
        }
        fetchUserPlaces();
    },[]);
    return (
        <Box width="100%">
        <Box m={2} boxShadow={10} borderColor="secondary.main"  borderRadius="borderRadius" >
        
            <Box display="flex" alignItems='center'> 
                <StreetviewIcon fontSize="large" color='secondary'/>
                <Typography variant='h3'  display='inline'  >Create Your Post</Typography>
            </Box>
            <Box p={1} >
            <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField variant="outlined" inputRef={register} margin="normal" fullWidth label="Title" name="Title"/>
                    <TextField variant="outlined"  inputRef={register} margin="dense" fullWidth   label="Subtitle" name="Subtitle"/>
                    <TextField variant="outlined" rows={5} inputRef={register} margin="normal" fullWidth multiline  label="Comment" name="Description"/>      
                    
                    <Box display='flex'  alignItems="center">
                    <StreetviewIcon/>
                   
                    {
                        steps.map((el,i)=>{
                            return <Button key={el.id} onClick={()=>handleOpen(steps[i])}><GolfCourseIcon color='primary'/></Button>;
                        })
                    }

                    <StreetviewIcon/>
                    </Box>    
                    <Button fullWidth type="submit" variant="contained" color='secondary'>Submit</Button>
            </form>
            </Box>
        </Box>
        <Grid container >
    
            {
                places.map((place,i)=>{
                
                    return(
                        <Grid item key={i} md={4} xs={6}>
                            <Button fullWidth  onClick={()=>( setSteps(preSteps=>[...preSteps,i]))}>
                                <PlaceCard title={place.title} subtitle={place.subtitle} content={place.description}/>
                            </Button>
                        </Grid>
                    );
                })
            }
        </Grid>

        <Dialog fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={openDialog}>
        { <PlaceCard title="test subtitle="test content="test"/>  }
        </Dialog>
        </Box>
    );
    
}

export default CreatePost;