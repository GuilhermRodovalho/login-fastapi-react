import React, { useContext }  from "react";
import { useCookies } from "react-cookie";
import { 
  RouteProps,
  Navigate,
  Outlet
} from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";


// Provavelmente não tá muito legal (em termos de segurança)

export function PrivateRoute () {
  const [userCookie, setCookie] = useCookies(['user']);
  const { user } = useContext(AuthContext);

  if (userCookie.user && user) {
    return <Outlet />
  }
  else {
    return <Navigate to="/" />
  }

  // return userCookie ? <Outlet /> : <Navigate to="/signup" />;
}

