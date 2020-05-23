import React, { useCallback, useRef } from 'react';
import { Image, View, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationError from '../../utils/getValidationError';
import api from '../../services/api';

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
    const inputEmailRef = useRef<TextInput>(null);
    const inputPasswordRef = useRef<TextInput>(null);

    const navigation = useNavigation();

    const platform = useCallback(function() {
        if (Platform.OS === 'ios') {
            return 'padding';
        }
        return undefined;
    }, []);

    const handleSubmit = useCallback(async function(data: FormData) {
        try {

            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().min(3, 'Nome é obrigatório.'),
                email: Yup.string().email('E-mail inválido.').required('E-mail é obrigatório.'),
                password: Yup.string().min(6, 'No minimo seis digitos.'),
            });

            await schema.validate(data, { abortEarly: false });

            await api.post('/users', data);

            Alert.alert(
                'Cadastro realizado com sucesso',
                'Você já pode fazer logon no GoBarber'
            );

            navigation.goBack();

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationError(error);
                formRef.current?.setErrors(errors);
                return;
            }

            Alert.alert(
                'Erro no cadastro',
                'Ocorreu um erro no cadastro, tente novamente.'
            );
        }
    }, [ navigation ]);

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
                            <Input
                                name="name"
                                icon="user"
                                placeholder="Nome"
                                autoCapitalize = "words"
                                returnKeyType = "next"
                                onSubmitEditing = { function() {
                                    inputEmailRef.current?.focus();
                                }}
                            />

                            <Input
                                ref = { inputEmailRef }
                                keyboardType = "email-address"
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                autoCapitalize = "none"
                                autoCorrect = { false }
                                returnKeyType = "next"
                                onSubmitEditing = { function() {
                                    inputPasswordRef.current?.focus();
                                }}
                            />

                            <Input
                                ref = { inputPasswordRef }
                                secureTextEntry
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                returnKeyType = "done"
                                onSubmitEditing = { function() {
                                    formRef.current?.submitForm();
                                }}
                            />

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