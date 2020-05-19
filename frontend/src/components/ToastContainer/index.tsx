import React from 'react';
import { useTransition } from 'react-spring';

import { Container } from './styles';

import Toast from './Toast';

import { Messages } from '../../hooks/Toats';

interface ToastProps {
    messages: Messages[];
};

const ToastContainer: React.FC<ToastProps> = function({ messages }) {

    const transations = useTransition(
        messages,
        function(message) {
            return message.id;
        },
        {
            from: { right: '-120%', opacity: 0 },
            enter: { right: '0%', opacity: 1 },
            leave: { right: '-120%', opacity: 0 },
        }
    );

    return (
        <Container>

            { transations.map(function({ item, key, props }) {
                return (
                    <Toast key = { key } message = { item } styles = { props } />
                );
            })}

        </Container>
    );
}

export default ToastContainer;