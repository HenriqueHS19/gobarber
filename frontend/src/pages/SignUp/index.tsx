import React, { useCallback } from 'react';
import { FiUser ,FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';

import logo from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = function() {

    const handleSubmit = useCallback(function(data): void {
        console.log(data);
    }, []);

    return (
        <Container>

            <Background />

            <Content>
                <img src={ logo } alt="GoBarber"/>

                <Form onSubmit = { handleSubmit} >

                    <h1> Faça seu cadastro </h1>

                    <Input name = "name" placeholder = "Nome" icon = { FiUser } />
                    <Input name = "email" placeholder = "E-mail" icon = { FiMail } />
                    <Input name = "password" type="password" placeholder="Senha" icon = { FiLock } />

                    <Button type="submit"> Cadastrar </Button>

                </Form>

                <a href="create-account">
                    <FiArrowLeft size = { 16 } />
                    Voltar para logon
                </a>
            </Content>

        </Container>
    )
}

export default SignUp;