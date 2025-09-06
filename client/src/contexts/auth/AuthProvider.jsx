import { useState,  useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import AuthContext from './AuthContext';
import { login, register } from '../../api/auth';
import { darkToast } from '../../libs/react-hot-toast/custom-toates';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(window.localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const loginMutation = useMutation({ mutationFn: login });
  const registerMutation = useMutation({ mutationFn: register }) ;

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    darkToast('Logged out successfully');
  };


  useEffect(() => {
    if (token) {
      try {
          const decoded = jwtDecode(token) ;

          if (decoded.exp * 1000 < Date.now()) {
            setToken(null);
            setUser(null);
            localStorage.removeItem('token');
            darkToast('Session expired. Please login again');
          } else {
            setUser(decoded);
          }
      } catch {
          setToken(null);
          setUser(null);
          localStorage.removeItem('token');
          darkToast('Session expired. Please login again');
      }
    } else {
      setUser(null);
    }
  }, [token]);



  useEffect(() => {
    if ( registerMutation.isSuccess ) {
      darkToast(registerMutation.data.data.message, '✅');
      navigate('/login', { replace: true });
    }
  }, [registerMutation.isSuccess, registerMutation.isError]);

  useEffect(() => {
    if(loginMutation.isSuccess) {
      darkToast(loginMutation.data.data.message, '✅');
      const token = loginMutation.data.data.token;
      setToken(token);
      window.localStorage.setItem('token', token);

      navigate('/', { replace: true });
    }
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