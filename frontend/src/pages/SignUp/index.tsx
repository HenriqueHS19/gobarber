import React from 'react';
import { FiUser ,FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = function() {
    return (
        <Container>

            <Background />

            <Content>
                <img src={ logo } alt="GoBarber"/>

                <form>

                    <h1> Faça seu cadastro </h1>

                    <Input name = "name" placeholder = "Nome" icon = { FiUser } />
                    <Input name = "email" placeholder = "E-mail" icon = { FiMail } />
                    <Input name = "password" type="password" placeholder="Senha" icon = { FiLock } />

                    <Button type="submit"> Cadastrar </Button>

                </form>

                <a href="create-account">
                    <FiArrowLeft size = { 16 } />
                    Voltar para logon
                </a>
            </Content>

        </Container>
    )
}

export default SignUp;