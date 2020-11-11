import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Navlinks from '../shared/Navlinks/Navlinks';
import { useHistory } from 'react-router-dom';


const Header=(props)=>{ 
    const history=useHistory();
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Box flexGrow={1}>
                    <Button  color="inherit"   onClick={()=>(history.push('/'))}>
                        <Typography variant='h5'>Footprint</Typography>
                    </Button>
                </Box>
                <Navlinks/>
            </Toolbar>
        </AppBar>
    );
}

export default Header;

