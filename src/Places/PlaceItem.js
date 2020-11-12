import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
  root: {
    margin:20,
  },
  media: {
   // 16:9
    width:'100%'
  },
  
  avatar: {
    backgroundColor: red[500],
  },
}));
const PlaceItem= (props)=> {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

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
        title={props.content.creator}
        subheader={props.content.createdAt.slice(0,10)}
        
      />
       
       <img className={classes.media} src={props.content.imageUrl}/>  
      <CardContent>
        <Typography variant="h5"  component="h2">
          {props.content.title}
          
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.content.subtitle}
        </Typography>
      </CardContent>
      <Box display='flex' >
        <Box flexGrow={1}>
          <IconButton aria-label="Like">
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
          <Typography paragraph>Comment:</Typography>
          <Typography paragraph style={{ wordWrap: "break-word" }}>
            {props.content.description} 
          </Typography>
          
        </CardContent>
      </Collapse>
    </Card>
  );
}


export default  PlaceItem;