import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import testImage from '../../testImage/101.jpg'
import { useHistory } from 'react-router-dom';

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
            R
          </Avatar>
        }
        title={props.title}
        subheader={props.subtitle}
      />
      <img className={classes.media} alt='Post Picture' src={process.env.REACT_APP_ASSET_URL+'/'+props.imageUrl}/> 
      <CardContent>
        <Typography paragraph style={{ wordWrap: "break-word" }}>
          {props.content}
        </Typography>
      </CardContent>
    </Box>
  );
}
export default PlaceCard;