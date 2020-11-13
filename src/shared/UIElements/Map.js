import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Badge } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import PlaceIcon from '@material-ui/icons/Place';
const AnyReactComponent = ({ number }) => {

   return( 
        <div>
            <Badge badgeContent={number} color="primary">
                {/* <PlaceIcon fontSize='large' color='secondary'/> */}
            </Badge>
        </div>);
}

const Map=(props)=>{
    
    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
          defaultCenter={props.location}
          defaultZoom={14}
        >
          <AnyReactComponent
            lat={props.location.lat}
            lng={props.location.lng}
            number={'P'}
          />
            </GoogleMapReact>
        </div>
        );

}

export default Map;