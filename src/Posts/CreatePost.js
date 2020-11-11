import React, { useState,useContext,useEffect} from 'react';
import { useForm } from "react-hook-form";
import PlaceCard from '../shared/UIElements/PlaceCard';
import { Backdrop, CircularProgress,Box, Button, Divider, StepButton, Step, Stepper, Grid, TextField, Typography,Dialog } from '@material-ui/core';
import { AuthContext } from '../shared/Context/auth-context';
import { useHttpClient } from '../shared/hooks/http-hook';
import StreetviewIcon from '@material-ui/icons/Streetview';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';
import ErrorIcon from '@material-ui/icons/Error';

const CreatePost=(props)=>{
    const [steps, setSteps] = useState([]);
    const auth = useContext(AuthContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [places, setPlaces] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogPlace, setDialogPlace] = useState(null);
    const [currentPlace, setCurrentPlace] = useState(-1);
    const history= useHistory();

    const handleOpen  = (i) => {
        setOpenDialog(true);
        setDialogPlace(i);
      };
      const handleClose = () => {
        setOpenDialog(false);
      };

    const onSubmit = async (data) => {
        try{
            let dsteps=[];

            if( steps.length>0){
                steps.forEach((index)=>{
                    
                    dsteps.push(places[index].id);
                })
            }
            const formData= new FormData();
            formData.append('title',data.title);
            formData.append('subtitle',data.subtitle);
            formData.append('description',data.description);
            formData.append('steps',dsteps);
            formData.append('image',data.image[0]);

            const response= await sendRequest(
                process.env.REACT_APP_BACKEND_URL+'/posts/',
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

    useEffect(() => {
        const fetchPlaces =async()=>{
            try{
                const response= await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/places/`
                )
                setPlaces(response.places);
            }catch(err){}
        }
        const fetchUserPlaces =async()=>{
            try{
                const response= await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/places/user`,
                    'GET',
                    null,
                    {
                        'Content-Type':'application/json',
                         Authorization:'Bearer '+auth.token
                    }
                )
                setPlaces(response.places);
            }catch(err){}
        }
        fetchUserPlaces();
    },[]);

    
    return (
        <Box width="90%">
       
        <Backdrop  open={isLoading}>
            <CircularProgress color="inherit" />
        </Backdrop>
        <Box m={2} boxShadow={10} borderColor="secondary.main"  borderRadius="borderRadius" >
        
            <Box display="flex" alignItems='center'> 
                <StreetviewIcon fontSize="large" color='secondary'/>
                <Typography variant='h3'  display='inline'  >Create Your Post</Typography>
            </Box>
            <Box p={1} >
            <form style={{margin:20}} onSubmit={handleSubmit(onSubmit)}>
                    <TextField variant="outlined" inputRef={register({ required: true, minLength: 5 })} margin="normal" fullWidth label="Post Name" name="title"/>
                    {errors.title && <Typography> <ErrorIcon color='primary'/> length of a title is at least 5</Typography>}
                    <TextField variant="outlined"  inputRef={register({ required: true, minLength: 5 })} margin="dense" fullWidth   label="Subtitle" name="subtitle"/>
                    {errors.subtitle && <Typography > <ErrorIcon color='primary'/> length of a subtitle is at least 5 </Typography>}
                    <TextField variant="outlined" rows={5} inputRef={register({ required: true, minLength: 10 })} margin="normal" fullWidth multiline  label="Comment" name="description"/>      
                    {errors.description && <Typography > <ErrorIcon color='primary'/> length of a comment is at least 10</Typography>}
                    <input
                        name="image"
                        ref={register({ required: true })}  
                        type="file"
                    />
                    <Stepper  nonLinear  activeStep={currentPlace}>
                    {
                        steps.map((el,i)=> {
                            return (
                                <Step key={i} >
                                <StepButton
                                onClick={()=>{
                                    handleOpen(el)
                                    setCurrentPlace(i);
                                }}
                                >
                                </StepButton>
                                <Button
                                onClick={()=>{
                                    handleOpen(el)
                                    setCurrentPlace(i);
                                }}
                                >
                                </Button>
                                
                                </Step>
                            );
                        
                        })
                    }
                    </Stepper>  
                    <Button fullWidth type="submit" variant="contained" color='secondary'>Submit</Button>
            </form>
            <Divider/>
            <SearchIcon color='secondary'/>
            <Typography variant='h5'  display='inline'  >Pick Your Places</Typography>
            <Grid container >
                {!isLoading && places.length!==0&&
                    places.map((place,i)=>{
                    
                        return(
                            <Grid item key={i} md={4} xs={6}>
                                <Button fullWidth  onClick={()=>( setSteps(preSteps=>[...preSteps,i]))}>
                                    <PlaceCard title={place.title} subtitle={place.subtitle} content={place.description} imageUrl={place.imageUrl}/> 
                                </Button>
                            </Grid>
                        );
                    })
                }
            </Grid>
            </Box>
        </Box>
            { !isLoading&& dialogPlace!=null &&
                <Dialog fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={openDialog}>
                {/* <PlaceItem content={places[dialogPlace]}/>  */}
                <PlaceCard title={places[dialogPlace].title} subtitle={places[dialogPlace].subtitle} content={places[dialogPlace].description} imageUrl={places[dialogPlace].imageUrl}/> 
                </Dialog>
            }
        </Box>
    );
    
}

export default CreatePost;