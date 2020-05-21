import React, { useCallback, useRef } from 'react';
import { Image, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

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

    const navigation = useNavigation();

    const platform = useCallback(function () {
        if (Platform.OS === 'ios') {
            return 'padding';
        }
        return undefined;
    }, []);

    const handleSubmit = useCallback(function(data: FormData) {
        console.log(data);
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
                            <Input name="email" icon="mail" placeholder="E-mail" />
                            <Input name="password" icon="lock" placeholder="Senha" />

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