import React, { useCallback, useRef } from 'react';
import { FiUser ,FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationError from '../../utils/getValidationError';

import logo from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = function() {

    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async function(data: object): Promise<void> {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().email('E-mail invalido.').required('Email obrigatório.'),
                password: Yup.string().min(6, 'No mínimo seis dígitos'),
            });

            await schema.validate(data, { abortEarly: false });

            console.log(data);
        } catch (error) {
            const errors = getValidationError(error);
            formRef.current?.setErrors(errors);
        }
    }, []);

    return (
        <Container>

            <Background />

            <Content>
                <img src={ logo } alt="GoBarber"/>

                <Form ref = { formRef } onSubmit = { handleSubmit} >

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