import { Grid,Backdrop,CircularProgress } from '@material-ui/core';
import React,{useEffect,useState,useContext} from 'react';
import PlaceItem from './PlaceItem'
import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../shared/Context/auth-context';

const MyPlaces=(props)=>{
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [places, setPlaces] = useState([]);
    const auth = useContext(AuthContext);

    useEffect(() => {
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
                console.log(response);
                console.log(response.places);
                setPlaces(response.places);
            }catch(err){}
        }
        fetchUserPlaces();
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

export default MyPlaces;