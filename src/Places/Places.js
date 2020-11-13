import { Grid,Backdrop,CircularProgress } from '@material-ui/core';
import React,{useEffect,useState} from 'react';
import PlaceItem from './PlaceItem'
import { useHttpClient } from '../shared/hooks/http-hook';

const Places=(props)=>{
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [places, setPlaces] = useState([]);
      
    useEffect(() => {
        const fetchPlaces =async()=>{
            try{
                const response= await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/places/`
                )
                setPlaces(response.places);
                console.log(response.places);
            }catch(err){}
        }
        fetchPlaces();
    },[]);

    return (
        <Grid container >
        <Backdrop  open={isLoading}>
            <CircularProgress color="inherit" />
        </Backdrop>
        {!isLoading && places.length!==0&&
            places.map((place,i)=>{
            
                return(
                    <Grid item key={i} md={4} xs={12}>
                       <PlaceItem content={place}/>
                    </Grid>
                );
            })
        }
        </Grid>
    );
}

export default Places;