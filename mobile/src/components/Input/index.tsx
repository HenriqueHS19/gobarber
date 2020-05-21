import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from 'react';
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

interface InputRef {
    focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = function ({ name, icon, ...rest }, ref) {

    const {fieldName, defaultValue = '', registerField, error } = useField(name);
    const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
    const inputElementRef = useRef<any>(null);

    const [ isFocus, setIsFocus ] = useState(false);
    const [ isFilled, setIsFilled ] = useState(false);

    const handleFocus = useCallback(function() {
        setIsFocus(true);
    }, []);

    const handleBlur = useCallback(function() {
        setIsFocus(false);
        setIsFilled(!!inputValueRef.current.value);
    }, []);

    // hook que permite enviar informações do componente filho para o componente pai
    useImperativeHandle(ref, function() {
        return ( { focus() {
            inputElementRef.current.focus();
        }});
    });

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
        <Container isFocus = { isFocus } isError = { !!error }>
            <Icon name={icon} size={20} color="#666360" isFocus = { isFocus } isFilled = { isFilled }/>

            <TextInput
                ref = { inputElementRef }
                defaultValue = { defaultValue }
                placeholderTextColor="#666360"
                onFocus = { handleFocus }
                onBlur = { handleBlur }
                onChangeText = { function(value) {
                    inputValueRef.current.value = value;
                }}
                {...rest}
            />
        </Container>
    )
};

export default forwardRef(Input);