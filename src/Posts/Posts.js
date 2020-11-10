import { Grid,Backdrop,CircularProgress } from '@material-ui/core';
import React,{useEffect,useState} from 'react';
import PlaceItem from '../Places/PlaceItem';
import PostItem from './PostItem';
import { useHttpClient } from '../shared/hooks/http-hook';

const Posts=(props)=>{
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // getallposts
        const fetchPost = async ()=>{
            try{
                const response= await sendRequest(
                    process.env.REACT_APP_BACKEND_URL+'/posts/'
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

export default Posts;