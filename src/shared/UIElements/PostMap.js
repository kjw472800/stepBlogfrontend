import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Badge } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import PlaceIcon from '@material-ui/icons/Place';
const AnyReactComponent = ({ number }) => {
   return( 
        <div>
            <Badge badgeContent={number+1} color="primary">
            </Badge> 
        </div>);
}

const PostMap=(props)=>{
    if(props.steps===null ||props.steps.length===0){
      return(
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
          defaultCenter={{lat:25.043527599999997,lng:121.50764219999998}}
          defaultZoom={14}
        >
        </GoogleMapReact>
      )
    }
    let steps=props.steps.map((step,i)=>{
      return(
        <AnyReactComponent
        lat={step.location.lat}
        lng={step.location.lng}
        key={i}
        number={i}
      />
      )
    }) ;
    
    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
          defaultCenter={props.steps[0].location}
          defaultZoom={14}
        >
      
          {
            steps
          }
        
          </GoogleMapReact>
        </div>
        );

}

export default PostMap;