import React, {useCallback, useRef} from 'react';
import * as Yup from 'yup';

import { CardContent, Container, Card } from './styles'

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Input from '../../components/input';
import Button from '../../components/button';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

export const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (data: object) => {
    try {
      const schema = Yup.object().shape({
        nome: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Insira email válido'),
        cpf: Yup.string().required('CPF obrigatório'),
        pis: Yup.string().required('PIS obrigatório'),
        senha: Yup.string().min(6, "No minimo 6 digitos"),
        pais: Yup.string().required('país obrigatório'),
        estado: Yup.string().required('estado obrigatório'),
        municipio: Yup.string().required('municipio obrigatório'),
        rua: Yup.string().required('rua obrigatório'),
        numero: Yup.number().required('numero obrigatório'),
        cep: Yup.string().required('cep obrigatório'),
        complemento: Yup.string().required('complemento obrigatório'),
      })

      await schema.validate(data, {abortEarly: false});

      await api.post("/users", data);

      navigate("/");
      
    } catch (error) {
      console.log(error);
    }
  }, [navigate]);

  return (
    <Container>
      <Card>
        <CardContent>
          <Form ref={formRef} onSubmit={handleSubmit} >
            <h1>Cadastro</h1>
            <Input name="nome" type="text" placeholder="Nome"/>
            <Input name="email" type="text" placeholder="Email"/>
            <Input name="senha" type="password" placeholder="senha"/>
            <Input name="cpf" type="text" placeholder="CPF"/>
            <Input name="pis" type="text" placeholder="PIS"/>
            <Input name="pais" type="text" placeholder="Pais"/>
            <Input name="estado" type="text" placeholder="Estado"/>
            <Input name="municipio" type="text" placeholder="Municipio"/>
            <Input name="rua" type="text" placeholder="Rua"/>
            <Input name="numero" type="text" placeholder="Número"/>
            <Input name="complemento" type="text" placeholder="Complemento"/>
            <Input name="cep" type="text" placeholder="CEP"/>

            <div className="buttons">
              <Button type="submit">Fazer cadastro</Button>
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


export default SignUp;
