import { Box, Grid } from '@material-ui/core';
import React,{useContext} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import CreatePlace from '../Places/CreatePlace';
import Places from '../Places/Places';
import CreatePost from '../Posts/CreatePost';
import Posts from '../Posts/Posts';
import SideBar from './SideBar';
import Login from '../User/Login';
import { AuthContext } from '../shared/Context/auth-context';
import MyPosts from '../Posts/MyPosts';
import MyPlaces from '../Places/MyPlaces';
import Signup from '../User/Signup';


const Main=(props)=>{
    const auth = useContext(AuthContext);

    let routes;

    if(auth.isLoggedIn){
        routes=(
            <Switch>
                <Route path='/myposts' exact>
                    <MyPosts/>
                </Route>
                <Route path='/myplaces' exact>
                    <MyPlaces/>
                </Route>
                <Route path='/posts' exact>
                    <Posts/>
                </Route>
                <Route path='/places' exact>
                    <Places/>
                </Route>
                <Route path='/createPlace' exact>
                    <CreatePlace/>
                </Route>
                <Route path='/createPost' exact>
                    <CreatePost/>
                </Route>
                <Redirect to='/posts'/>
            </Switch>
        )
    }
    else{
        routes=( 
            <Switch>
                    <Route path='/signup' exact>
                        <Signup/>
                    </Route>
                    <Route path='/posts' exact>
                        <Posts/>
                    </Route>
                    <Route path='/places' exact>
                        <Places/>
                    </Route>
                    <Route path='/createPlace' exact>
                        <Login/>
                    </Route>
                    <Route path='/createPost' exact>
                        <Login/>
                    </Route>
                    <Route path='/login' exact>
                        <Login/>
                    </Route>
                    <Redirect to='/posts'/>
            </Switch>
        )
    }

    return (
        <Box width='100%' minHeight={500} >
            
            <Grid container alignItems="stretch" style={{height:'100%'}}>
                <Grid item md={9} xs={12} >
                    <Box height='100%' display='flex' justifyContent='center' alignItems='center'  > 
                        {routes}
                    </Box>
                </Grid>
                <Grid item md={3} xs={12} style={{height:'100%'}} >
                    <Box  mt={1} width='100%' height='100%'>
                        <SideBar></SideBar>
                    </Box> 
                </Grid>
            </Grid>
            
        </Box>
    );
}

export default Main;

