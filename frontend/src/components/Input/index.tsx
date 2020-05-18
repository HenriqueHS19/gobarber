import React, { InputHTMLAttributes, useRef, useEffect, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = function({icon: Icon, name, ...rest}) {

    const inputRef = useRef<HTMLInputElement>(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);

    const [ focus, setFocus ] = useState(false);
    const [ filled, setFilled ] = useState(false);

    useEffect(function() {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [ fieldName, registerField ]);

    const handleInputFocus = useCallback(function() {
        setFocus(true);
    }, []);

    const handleInputBlur = useCallback(function () {
        setFocus(false);
        setFilled(!! inputRef.current?.value);
    }, []);

    return(
        <Container isFocus = { focus } isFilled = { filled } isError = { !!error }>
            { Icon && <Icon size = {20} /> }
            <input
                ref = { inputRef }
                defaultValue = { defaultValue }
                onFocus = { handleInputFocus }
                onBlur = { handleInputBlur }
                autoComplete="off"
                { ...rest }
            />
            { error &&
                <Error title = { error } background = "#c53030" color = "#f4ede8">
                    <FiAlertCircle color = "#c53030" size = { 20 } />
                </Error>
            }
        </Container>
    );
}

export default Input;