import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 280,
    maxHeight:345,
    margin: 3,
    boxShadow:5
  },
  media: {
    width: '100%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const PlaceCard=(props)=> {
  const classes= useStyles();
  return (
    <Box width="100%" boxShadow={5} borderRadius={10}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
          </Avatar>
        }
        title={props.title}
        subheader={props.subtitle}
      />
      <img className={classes.media} alt='Post Picture' src={props.imageUrl}/> 
      <CardContent>
        <Typography paragraph variant={'body'} style={{ wordWrap: "break-word" }}>
          {props.content}
        </Typography>
      </CardContent>
    </Box>
  );
}
export default PlaceCard;