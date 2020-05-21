import React, { useCallback, useRef } from 'react';
import { Image, View, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationError from '../../utils/getValidationError';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.png';

import { Container, Title, BtnForgot, TxtForgot, BtnCreateAccount, TxtCreate } from './styles';

interface FormData {
    email: string;
    password: string;
}

const SignIn: React.FC = function () {

    const formRef = useRef<FormHandles>(null);
    const inputPasswordRef = useRef<TextInput>(null);

    const navigation = useNavigation();

    const platform = useCallback(function () {
        if (Platform.OS === 'ios') {
            return 'padding';
        }
        return undefined;
    }, []);

    const handleSubmit = useCallback(async function(data: FormData) {
        try {

            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().email('E-mail inválido.').required('E-mail é obrigatório.'),
                password: Yup.string().required('Senha é obrigatória'),
            });

            await schema.validate(data, { abortEarly: false });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationError(error);
                formRef.current?.setErrors(errors);
                return;
            }

            Alert.alert('Erro na autenticação.', 'Ocorreu um erro na autenticação, tente novamente.');
        }
    }, []);

    return (
        <>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={platform()} enabled >

                <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }} >
                    <Container>
                        <Image source={logo} />

                        <View>
                            <Title> Faça seu logon </Title>
                        </View>

                        <Form ref = { formRef } onSubmit = { handleSubmit } >
                            <Input
                                keyboardType = "email-address"
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                autoCapitalize = "none"
                                autoCorrect = { false }
                                returnKeyType = "next"
                                onSubmitEditing = {function() {
                                    inputPasswordRef.current?.focus();
                                }}
                            />
                            <Input
                                ref = { inputPasswordRef }
                                secureTextEntry
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                returnKeyType="done"
                                onSubmitEditing = { function() {
                                    formRef.current?.submitForm();
                                }}
                            />

                            <Button onPress = { function() {
                                formRef.current?.submitForm();
                            }}>
                                Entrar
                            </Button>
                        </Form>

                        <BtnForgot>
                            <TxtForgot> Esqueci minha senha </TxtForgot>
                        </BtnForgot>
                    </Container>
                </ScrollView>

            </KeyboardAvoidingView>

            <BtnCreateAccount
                onPress={function () {
                    navigation.navigate('SignUp');
                }}
            >
                <Icon name="log-in" size={20} color="#ff9000" />
                <TxtCreate> Criar uma conta </TxtCreate>
            </BtnCreateAccount>
        </>
    );
}

export default SignIn;