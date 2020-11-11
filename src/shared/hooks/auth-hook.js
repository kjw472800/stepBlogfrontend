import  { useState, useCallback,useEffect } from 'react';
let logoutTimer;
export const useAuth=()=>{
   

  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [token, setToken] = useState();

  const login = useCallback((token, expirationDate) => {
    setToken(token);
    const tokenExpirationDate= new Date( new Date().getTime()+1000*60*60);
    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem('userData', JSON.stringify({ token:token,expiration:tokenExpirationDate.toISOString()}));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, [])


  // keep logged in
  useEffect(() => {
    const storeData=JSON.parse(localStorage.getItem('userData'));
    
    if(storeData &&storeData.token && new Date(storeData.expiration)> new Date()){
      login(storeData.token,new Date(storeData.expiration));
    }
  }, []);

  //delete timeout when logout
  useEffect(() => {
    if(token&&tokenExpirationDate){
      logoutTimer=setTimeout(logout,tokenExpirationDate.getTime()-new Date().getTime());
    }else{
      clearTimeout(logoutTimer);
    }
  }, [token,logout,tokenExpirationDate]);


  return {token,login,logout};
}