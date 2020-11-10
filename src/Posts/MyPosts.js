import { Grid,Backdrop,CircularProgress } from '@material-ui/core';
import React,{useEffect,useState,useContext} from 'react';
import PlaceItem from '../Places/PlaceItem';
import PostItem from './PostItem';
import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../shared/Context/auth-context';

const MyPosts=(props)=>{
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [posts, setPosts] = useState([]);
    const auth = useContext(AuthContext);
    useEffect(() => {
        // getallposts
        const fetchPost = async ()=>{
            try{
                const response= await sendRequest(
                    process.env.REACT_APP_BACKEND_URL+'/posts/user',
                    'GET',
                    null,
                    {
                        'Content-Type':'application/json',
                         Authorization:'Bearer '+auth.token
                    }
                );
                console.log(response.posts);
                setPosts(response.posts);
            }catch(err){
                
            } 
        }
        fetchPost();
    }, [])

    return (
        <Grid container  >
            <Backdrop  open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            {
                posts.map(p=>{
                    console.log(p);
                    return (
                        <Grid key={p.id} item xs={12}>
                            <PostItem content={p}/>
                        </Grid>
                    )
                })
            }  
        </Grid>
    );
}


export default MyPosts;