import React, {useCallback, useContext, useEffect, useRef} from 'react';
import * as Yup from 'yup';

import { CardContent, Container, Card } from './styles'

import { AuthContext } from '../../context/AuthContext';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Input from '../../components/input';
import Button from '../../components/button';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useCookies } from 'react-cookie';

export const Update: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();
  const [userCookie, setCookie] = useCookies(["user"]);
  const [tokenCookie, setTokenCookie] = useCookies(["token"]);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    api.get("/users/me", {
      headers: {"Authorization" : `Bearer ${tokenCookie.token}`}
    }).then(res => {
      formRef.current?.setData(res.data);
      formRef.current?.setData({
        numero: Number(res.data.numero)
      })
    });
  }, []);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      const schema = Yup.object().shape({
        nome: Yup.string(),
        email: Yup.string().nullable(),
        cpf: Yup.string(),
        pis: Yup.string(),
        senha: Yup.string(),
        pais: Yup.string(),
        estado: Yup.string(),
        municipio: Yup.string(),
        rua: Yup.string(),
        numero: Yup.number().nullable(true),
        cep: Yup.string(),
        complemento: Yup.string(),
      })

      await schema.validate(data, {abortEarly: false});

      await api.put("/users/me", data, { 
        headers: {"Authorization" : `Bearer ${tokenCookie.token}`}
      });

      // Opções:
      // [ ] - gerar um novo token no backend e setar no cookie quando alterar os dados
      // [X] - deslogar o usuário depois das alterações

      logout();

      navigate("/");
      
    } catch (error) {
      console.log(error);
    }
  }, [navigate]);

  return (
    <Container>
      <Card>
        <CardContent>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Atualize seus dados</h1>
            <Input name="nome" type="text" placeholder="Nome"/>
            <Input name="email" type="text" placeholder="Email"/>
            <Input name="senha" type="password" placeholder="senha"/>
            <Input name="cpf" type="text" placeholder="CPF"/>
            <Input name="pis" type="text" placeholder="PIS"/>
            <Input name="pais" type="text" placeholder="Pais"/>
            <Input name="estado" type="text" placeholder="Estado"/>
            <Input name="municipio" type="text" placeholder="Municipio"/>
            <Input name="rua" type="text" placeholder="Rua"/>
            <Input name="numero" type="number" placeholder="Número"/>
            <Input name="complemento" type="text" placeholder="Complemento"/>
            <Input name="cep" type="text" placeholder="CEP"/>

            <div className="buttons">
              <Button type="submit">Atualizar dados</Button>
              <Button type="button">
                <Link to="/">Voltar</Link>
              </Button>
            </div>


          </Form>

        </CardContent>
      </Card>
    </Container>
  )
}


export default Update;
