import React, { useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';

import logo from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = function() {

    const handleSubmit = useCallback(function(data): void {
        console.log(data);
    }, []);

    return (
        <Container>

            <Content>
                <img src={ logo } alt="GoBarber"/>

                <Form onSubmit = { handleSubmit }>

                    <h1> Faça seu logon </h1>

                    <Input name = "email" placeholder = "E-mail" icon = { FiMail } />
                    <Input name = "password" type="password" placeholder="Senha" icon = { FiLock } />

                    <Button type="submit"> Entrar </Button>

                    <a href="forgot"> Esqueci minha senha </a>
                </Form>

                <a href="create-account">
                    <FiLogIn size = { 16 } />
                    Criar conta
                </a>
            </Content>

            <Background />
        </Container>
    )
}

export default SignIn;