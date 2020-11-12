import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import testImage from '.././testImage/101.jpg'
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 280,
    maxHeight:345,
    margin: 3,
    boxShadow:5
  },
  media: {
    width: "100%" // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const PostPlaceItem=(props)=> {
  const classes= useStyles();
  return (
    <Box width="100%" boxShadow={5} borderRadius={10}>
        <Grid container >
            <Grid item xs={12} md={6}>
              <img className={classes.media} alt='Post Picture' src={props.content.imageUrl}/> 
            </Grid>    
            <Grid item xs={12} md={6}>
                <Typography variant='h5' component='h1'>{props.content.title}</Typography>
                <Typography variant='subtitle1' component='h2'>{props.content.subtitle}</Typography>
                <Typography variant='body1' paragraph>{ props.content.description}</Typography>
                {/* <Typography variant='body2'>Address:{props.content.address}</Typography> */}
                <Typography variant='caption'>created at:{props.content.createdAt.slice(0,10)}</Typography>
            </Grid>
        </Grid>
    </Box>
  );
}
export default PostPlaceItem;