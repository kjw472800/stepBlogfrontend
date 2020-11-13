import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog';
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
import RoomIcon from '@material-ui/icons/Room';
import Map from '../shared/UIElements/Map'

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
  const [expanded, setExpanded] = useState(false);
  const [openMap, setopenMap] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDialogOpen = () => {
    setopenMap(true);
  };
  const handleDialogClose = () => {
    setopenMap(false);
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
       
       <img className={classes.media} alt="place image" src={process.env.REACT_APP_ASSET_URL+'/'+props.content.imageUrl}/>  
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
          <IconButton disabled aria-label="Like">
            <FavoriteIcon />
          </IconButton>
          <IconButton onClick={handleDialogOpen} aria-label="Map">
            <RoomIcon color='secondary' />
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
      <Dialog fullWidth onClose={handleDialogClose} aria-labelledby="customized-dialog-title" open={openMap}>
            <Box width="100%" height="60vh">
                <Map location={props.content.location}></Map>
            </Box>
      </Dialog> 
    </Card>
  );
}


export default  PlaceItem;