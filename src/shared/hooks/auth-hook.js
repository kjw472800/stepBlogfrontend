import  { useState, useCallback,useEffect } from 'react';
let logoutTimer;
export const useAuth=()=>{
   

  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [token, setToken] = useState();

  const login = useCallback((token, expirationDate) => {
    setToken(true);
    setTokenExpirationDate(tokenExpirationDate);

  }, []);

  const logout = useCallback(() => {
    setToken(false);
    setTokenExpirationDate(null);
  }, [])

  return {token,login,logout};
}