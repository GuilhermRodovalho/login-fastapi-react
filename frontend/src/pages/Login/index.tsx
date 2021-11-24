import React, { useCallback, useRef, useContext } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { CardContent, Container, Card } from './styles'

import { AuthContext, AuthProvider } from '../../context/AuthContext';

import Input from '../../components/input';
import Button from '../../components/button';
import { FormHandles } from '@unform/core';
import { useCookies } from 'react-cookie';

interface LoginFormData {
  username: string;
  password: string;
}

export const Login: React.FC = () => {
  const [userCookie, setCookie] = useCookies(['user']);
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();

  const { login, user } = useContext(AuthContext);

  const handleSubmit = useCallback(async (data: LoginFormData) => {
    try {
      const schema = Yup.object().shape({
        username: Yup.string().required('Email, PIS ou CPF é obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
      })

      await schema.validate(data, {abortEarly: false});
      
      await login({
        username: data.username,
        password: data.password,
      });

      if (userCookie && user) {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  }, [navigate, login]);

  if (!userCookie.user) {
    return (
      <Container>
        <Card>
          <CardContent>
            <Form onSubmit={handleSubmit} ref={formRef}>
              <h1>Olá, visitante!</h1>
              <Input name="username" type="text" placeholder="Email, CPF ou PIS"/>

              <Input name="password" type="password" placeholder="senha"/>

              <div className="buttons">
                <Button type="submit">Login</Button>

                <Button>
                  <Link to="/signup">
                    criar conta
                  </Link>
                </Button>

              </div>
            </Form>
          </CardContent>
        </Card>
      </Container>
    )
  }
  else {
    return ( <Navigate to='/home' replace /> );
  }
}