import React from 'react';
import SideBarCard from '../shared/UIElements/SideBarCard'
import {Box} from '@material-ui/core';

const contents=[
    {
        title:'About',
        subtitle:'2020/11/7 by author',
        content:`this is a place for everyone to share his/her travel footprint.\nCreate your places, link them to create a post, and share them with others.`
    },
    {
        title:'Features',
        subtitle:'2020/11/11 by author',
        content:`Features: signup, login, creating places/posts, uploading image, viewing all posts/places, delete posts. Security: JSON Web Tokens`
    },
    {
      title:'Development',
      subtitle:'2020/11/11by author',
      content:`Frontend: react, react-hook-form, material-ui, Google API,  Backend: express, Google API, AWS s3  DB: MonogoDB, AWS s3`
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