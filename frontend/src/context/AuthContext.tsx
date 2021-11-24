import axios, { AxiosRequestConfig } from 'axios';
import React, { createContext, useCallback, useState } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';
import api from '../services/api';


interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthState {
  token: string;
  user: string;
}


interface AuthContextData {
  user: string;

  login(credentials: LoginCredentials): Promise<void>;
  logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [tokenCookie, setTokenCookie, removeTokenCookie] = useCookies(['token']);
  const [userCookie, setUserCookie, removeUserCookie] = useCookies(['user']);

  const [data, setData] = useState<AuthState>(() => {
    const token = tokenCookie.token; 
    const user = userCookie.user;

    if (token && user) {
      return { token, user };
    }
    
    return {} as AuthState;
  });


  const logout = useCallback(() => {
    removeTokenCookie('token');
    removeUserCookie('user');

    setData({} as AuthState);
  }, []);

  const login = useCallback(async ({username, password}) => {
    const payload = new FormData();
    payload.append('username', username);
    payload.append('password', password);

    const response = await api.post('login', payload);

    const { access_token, user_name } = response.data;
    
    setTokenCookie("token", access_token, {
      path: '/'
    });

    setUserCookie('user', user_name, {
      path: '/'
    });

    setData({ token: access_token, user: user_name });

  }, [setTokenCookie, setUserCookie, data]);

  return (
    <CookiesProvider>
      <AuthContext.Provider value={{ login, logout, user: data.user }}>
        {children}
      </AuthContext.Provider> 
    </CookiesProvider>
  );

}

export { AuthContext, AuthProvider };