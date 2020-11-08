import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { blueGrey, grey } from '@material-ui/core/colors';




const SideBarCard=(props)=>{
  
  return (
    <Box bgcolor={blueGrey[300]} mb={1} minHeight={250} borderRadius={8} boxShadow={3}  textAlign="center">
      
        <Typography variant="h4" component="h1" >
          {props.title}
        </Typography>
        <Typography variant="caption" component="h2" gutterBottom>
          {props.subtitle}
        </Typography>
        <Typography variant="body1" paragraph>
          {props.content}
        </Typography>
      
      </Box>
  );
}

export default SideBarCard;