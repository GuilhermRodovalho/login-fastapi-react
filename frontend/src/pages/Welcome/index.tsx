import React, {  useCallback, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { CardContent, Container, Card } from './styles'
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/button';

export const Welcome: React.FC = () => {
  const [userCookie, setCookie] = useCookies(['user']);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleLogout = useCallback(() => {
    logout();

    navigate("/");
  }, [logout, navigate]);

  return (
    <Container>
      <Card>
        <CardContent>
          <h1>Olá, {user}!</h1>

          <div className="buttons" >
            <Button type="button" onClick={handleLogout} >Logout</Button>

            <Button>
              <Link to="/update">
                Editar dados
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}