import React from 'react';
import SideBarCard from '../shared/UIElements/SideBarCard'
import {Box} from '@material-ui/core';

const contents=[
    {
        title:'About',
        subtitle:'2020/11/7 by author',
        content:`this is a place for everyone to share his/her travel footprint.\nCreate your places, link them to form a post, and share them with others.\n This website is just deployed for demo of UI. `
    },
    {
        title:'Functions',
        subtitle:'2020/11/11 by author',
        content:`support functions: signup, login, creating places, creating posts, viewing all posts/places, delete own places\n Security by JSON Web Tokens`
    },
    {
      title:'Development',
      subtitle:'2020/11/11by author',
      content:`Frontend: react react-hook-form material-ui, Backend: express, DB: MonogoDB`
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