import React from 'react';
import SideBarCard from '../shared/UIElements/SideBarCard'
import {Box} from '@material-ui/core';

const contents=[
    {
        title:'About',
        subtitle:'2020/11/7 by author',
        content:`this is a place for everyone to share his/her travel footprint`
    },
    {
        title:'Announcement',
        subtitle:'2020/11/8 by author',
        content:`Most of functions are still not completed`
    }
]

const SideBar=(props)=>{

  return (
    <Box m={1} >
        { contents.map((content,i)=> { return <SideBarCard key={i} title={content.title} subtitle={content.subtitle} content={content.content}/>})
        
        }
    </Box>
  );
}

export default SideBar;