import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom'
import React,{ useState } from 'react';
import {useAuth} from './shared/hooks/auth-hook';

import Main from './Layout/Main';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import { AuthContext } from './shared/Context/auth-context';



function App() {
  const {token,login,logout}= useAuth();


  const theme = React.useMemo (()=>createMuiTheme({
    palette: {
      primary: {
        light: '#7953d2',
        main: '#4527a0',
        dark: '#000070',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff867c',
        main: '#ef5350',
        dark: '#b61827',
        contrastText: '#000',
      },
    },
  }),[]);
  return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <AuthContext.Provider value={{ isLoggedIn: !!token, token:token, login: login, logout: logout }}>
            <Header/>
            <Main/>
            <Footer/>
        </AuthContext.Provider>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
