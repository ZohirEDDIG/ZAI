import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import AuthContext from './AuthContext';
import { login, register } from '../../api/auth';
import darkToast from '../../utils/darkToast';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const loginMutation = useMutation({ mutationFn: login });
  const registerMutation = useMutation({ mutationFn: register }) ;

  const logout = (notification) => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    darkToast(notification);
  };


  useEffect(() => {
    if (token) {
      try {
          const decoded = jwtDecode(token) ;

          if (decoded.exp * 1000 < Date.now()) {
            logout('Session expired. Please login again')
          } else {
            setUser(decoded);
          }
      } catch {
        logout('Session expired. Please login again')
      }
    } 
  }, [token]);


  useEffect(() => {
    if ( registerMutation.isSuccess ) {
      darkToast(registerMutation.data.data.message, '✅');
      navigate('/login', { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerMutation.isSuccess, registerMutation.isError]);

  useEffect(() => {
    if(loginMutation.isSuccess) {
      darkToast(loginMutation.data.data.message, '✅');
      const token = loginMutation.data.data.token;
      setToken(token);
      window.localStorage.setItem('token', token);

      navigate('/', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginMutation.isSuccess]);

  const value = { 
    token, setToken,
    user, setUser,
    registerMutation,
    loginMutation,
    logout, 
  };
 
  return (
    <AuthContext.Provider value={value}>  
      {children}
    </AuthContext.Provider> 
  );
};

export default AuthProvider;