import React, { useCallback, useRef } from 'react';
import { FiUser ,FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import getValidationError from '../../utils/getValidationError';
import api from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/Toats';

import logo from '../../assets/logo.svg';
import { Container, Content, AnimationContent, Background } from './styles';

interface FormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = function() {

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(async function(data: FormData): Promise<void> {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().email('E-mail invalido.').required('Email obrigatório.'),
                password: Yup.string().min(6, 'No mínimo seis dígitos'),
            });

            await schema.validate(data, { abortEarly: false });

            await api.post('users', data);

            history.push('/');

            addToast({
                type: 'success',
                title: 'Cadastro realizado!',
                description: 'Você já pode fazer logon no GoBarber!'
            });

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationError(error);
                formRef.current?.setErrors(errors);
            }

            addToast({
                type: 'error',
                title: 'Erro no cadastro.',
                description: 'Erro ao fazer o cadastro, tente novamente.'
            });

        }
    }, [ addToast, history ]);

    return (
        <Container>

            <Background />

            <Content>
                <AnimationContent>
                    <img src={ logo } alt="GoBarber"/>

                    <Form ref = { formRef } onSubmit = { handleSubmit} >

                        <h1> Faça seu cadastro </h1>

                        <Input name = "name" placeholder = "Nome" icon = { FiUser } />
                        <Input name = "email" placeholder = "E-mail" icon = { FiMail } />
                        <Input name = "password" type="password" placeholder="Senha" icon = { FiLock } />

                        <Button type="submit"> Cadastrar </Button>

                    </Form>

                    <Link to="/">
                        <FiArrowLeft size = { 16 } />
                        Voltar para logon
                    </Link>
                </AnimationContent>
            </Content>

        </Container>
    )
}

export default SignUp;