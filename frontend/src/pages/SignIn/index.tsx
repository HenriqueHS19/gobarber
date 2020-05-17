import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = function() {
    return (
        <Container>

            <Content>
                <img src={ logo } alt="GoBarber"/>

                <form>

                    <h1> Faça seu logon </h1>

                    <Input name = "email" placeholder = "E-mail" icon = { FiMail } />
                    <Input name = "password" type="password" placeholder="Senha" icon = { FiLock } />

                    <Button type="submit"> Entrar </Button>

                    <a href="forgot"> Esqueci minha senha </a>
                </form>

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