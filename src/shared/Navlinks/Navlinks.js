import React,{useContext} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../Context/auth-context';

import AccountCircle from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';
require('dotenv').config();


const Navlinks=(props)=>{
    const auth = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history= useHistory();
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = (path, logout) => {
      setAnchorEl(null);
      if(logout){
        auth.logout();
        return;
      }
      console.log(path);
      history.push(path);
    };

    let menuItems;

    if(auth.isLoggedIn){
      menuItems=(
        <div>
          <MenuItem onClick={()=>handleClose('/posts')}>Profile</MenuItem>
          <MenuItem onClick={()=>handleClose('/myplaces')}>My places</MenuItem>
          <MenuItem onClick={()=>handleClose('/myposts')}>My posts</MenuItem>
          <MenuItem onClick={()=>handleClose('/logout',true)}>Logout</MenuItem>
        </div>
      )
    }else{
      menuItems= <MenuItem onClick={()=>handleClose('/login')}>Login</MenuItem>
    }

    return (
        <React.Fragment>
                <Button color="inherit">Posts</Button>
                <Button color="inherit">Places</Button>
                <IconButton onClick={handleClick}> <AccountCircle/> </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                {menuItems}                        
                </Menu>
        </React.Fragment>
    );
}

export default Navlinks;