import { Grid,Backdrop,CircularProgress,Button, Divider } from '@material-ui/core';
import React,{useEffect,useState,useContext} from 'react';
import MyPostItem from './MyPostItem';
import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../shared/Context/auth-context';
import { useHistory } from 'react-router-dom';

const MyPosts=(props)=>{
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [posts, setPosts] = useState([]);
    const auth = useContext(AuthContext);
    const history= useHistory();
    const handleDelete=async (pid)=>{
        
        try{
            const response= await sendRequest(
                process.env.REACT_APP_BACKEND_URL+'/posts/'+pid,
                'DELETE',
                null,
                {
                     Authorization:'Bearer '+auth.token
                }
            );
            setPosts( preposts=> preposts.filter(p=>p.id!==pid) );
        }
        catch(err){
        }

    }

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
                setPosts(response.posts);
            }catch(err){
                
            } 
        }
        fetchPost();
    }, [])

    return (
        <div>
        { isLoading?
        <Backdrop  open={isLoading}>
            <CircularProgress color="inherit" />
        </Backdrop>:
        <Grid container  >
            {
                posts.map(p=>{
                    return (
                        <Grid key={p.id} item xs={12}>
                            <MyPostItem content={p} handleDelete={handleDelete}/>
                        </Grid>
                    )
                })
            }  
        </Grid>
        }
        </div>
    );
}


export default MyPosts;