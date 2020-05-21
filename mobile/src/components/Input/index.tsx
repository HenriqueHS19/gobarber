import React, { useEffect, useRef } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}

interface InputValueReference {
    value: string;
}

const Input: React.FC<InputProps> = function ({ name, icon, ...rest }) {

    const {fieldName, defaultValue = '', registerField, error } = useField(name);
    const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
    const inputElementRef = useRef<any>(null);

    useEffect(function() {
        registerField({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',

            setValue(ref: any, value: string) {
                inputValueRef.current.value = value;
                inputElementRef.current.setNativeProps({ text: value });
            },
            clearValue() {
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
            },
        });
    }, [ registerField, fieldName ]);

    return (
        <Container>
            <Icon name={icon} size={20} color="#666360" />

            <TextInput
                ref = { inputElementRef }
                defaultValue = { defaultValue }
                placeholderTextColor="#666360"
                onChangeText = { function(value) {
                    inputValueRef.current.value = value;
                }}
                {...rest}
            />
        </Container>
    )
};

export default Input;