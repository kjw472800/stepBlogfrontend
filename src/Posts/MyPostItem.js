import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';

import PostPlaceItem from './PostPlaceItem';
import PostMap from '../shared/UIElements/PostMap';

const useStyles = makeStyles((theme) => ({
  root: {
    margin:20,
  },
  media: {
    width:'100%'
  },
  iconColor:{
      
  }
  ,
  avatar: {
    backgroundColor: red[500],
  },
}));
const MyPostItem= (props)=> {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [currentPlace, setCurrentPlace] = useState(0);
  const [place, setPlace] = useState(0);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="place" className={classes.avatar}>
          </Avatar>
        }
        action={
            <IconButton aria-label="delete" onClick={()=>props.handleDelete(props.content.id)}>
                <DeleteIcon  color="error" />
            </IconButton>
        }
     
        title={props.content.creator}
        subheader={props.content.createdAt.slice(0,10)}
        >
        </CardHeader>
        <img className={classes.media} alt='Post Picture' src={process.env.REACT_APP_ASSET_URL+'/'+props.content.imageUrl}/> 
      <CardContent>
        <Typography variant="h4"  component="h2">
          {props.content.title}
        </Typography>
        <Typography paragraph>
            {props.content.description}
        </Typography>
      </CardContent>
      <Box display='flex' >
        <Box flexGrow={1}>
          <IconButton disabled aria-label="Like">
            <FavoriteIcon />
          </IconButton>
        </Box>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            {
                // places.map(el=> <Button key={el} onClick={ ()=>setCurrentPlace(el) }>{el}</Button>)
            }
            <Stepper alternativeLabel nonLinear activeStep={currentPlace}>
            {
                props.content.steps.map((step,i)=> {
                    return (
                        <Step key={i} >
                          <StepButton
                           onClick={()=>{setCurrentPlace(i);setPlace(i);}}
                          >
                          </StepButton>
                        </Step>
                      );
                
                })
            }
            </Stepper>
            {props.content.steps.length>0&& <PostPlaceItem content={props.content.steps[currentPlace]}/>}
        </CardContent>
        <Box width="100%" height="60vh">
            <PostMap steps={props.content.steps}></PostMap>
        </Box>
      </Collapse>
    </Card>
  );
}



export default MyPostItem;