import React, { useCallback, useRef } from 'react';
import { Image, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.png';

import { Container, Title, BtnBackLogon, TxtBack } from './styles';

interface FormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = function () {

    const formRef = useRef<FormHandles>(null);

    const navigation = useNavigation();

    const platform = useCallback(function () {
        if (Platform.OS === 'ios') {
            return 'padding';
        }
        return undefined;
    }, []);

    const handleSubmit = useCallback(function (data: FormData) {
        console.log(data);
    }, []);

    return (
        <>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={platform()} enabled >

                <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }} >
                    <Container>
                        <Image source={logo} />

                        <View>
                            <Title> Crie sua conta </Title>
                        </View>

                        <Form ref = { formRef } onSubmit = { handleSubmit }>
                            <Input name="name" icon="user" placeholder="Nome" />
                            <Input name="email" icon="mail" placeholder="E-mail" />
                            <Input name="password" icon="lock" placeholder="Senha" />

                            <Button onPress = { function() {
                                formRef.current?.submitForm();
                            }}> Cadastrar </Button>
                        </Form>

                    </Container>
                </ScrollView>

            </KeyboardAvoidingView>

            <BtnBackLogon
                onPress={function () {
                    navigation.navigate('SignIn');
                }}
            >
                <Icon name="arrow-left" size={20} color="#fff" />
                <TxtBack> Voltar para logon </TxtBack>
            </BtnBackLogon>
        </>
    );
}

export default SignUp;