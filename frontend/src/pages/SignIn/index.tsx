import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = function() {

    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async function(data): Promise<void> {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().email('E-mail invalido.').required('E-mail obrigatório.'),
                password: Yup.string().required('Senha obrigatória.'),
            });

            await schema.validate(data, { abortEarly: false });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <Container>

            <Content>
                <img src={ logo } alt="GoBarber"/>

                <Form ref = { formRef } onSubmit = { handleSubmit }>

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