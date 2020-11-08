import { Button } from '@material-ui/core';
import React from 'react';
import PlaceItem from './PlaceItem'

const Places=(props)=>{

    return (
        <div>
            <Button>
                <PlaceItem/>
            </Button>
        </div>
    );
}

export default Places;