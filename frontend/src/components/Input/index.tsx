import React, { InputHTMLAttributes, useRef, useEffect } from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = function({icon: Icon, name, ...rest}) {

    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);

    useEffect(function() {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [ fieldName, registerField ]);

    return(
        <Container>
            { Icon && <Icon size = {20} /> }
            <input ref = { inputRef } defaultValue = { defaultValue } autoComplete="off" { ...rest }/>
        </Container>
    );
}

export default Input;