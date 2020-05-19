import React, { useEffect } from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi';

import { Container } from './styles';

import { Messages, useToast } from '../../../hooks/Toats';

interface ToastProps {
    message: Messages;
    styles: object;
}

const icons = {
    info: <FiInfo size = { 25 } />,
    success: <FiCheckCircle size = { 25 } />,
    error: <FiAlertCircle size = { 25 } />
}

const Toast: React.FC<ToastProps> = function ({ message, styles }){

    const { removeToast } = useToast();

    useEffect(function() {
        const timer = setTimeout(function() {
            removeToast(message.id);
        }, 3000);

        return function() {
            clearTimeout(timer);
        }

    }, [removeToast, message.id]);

    return (
        <Container type = { message.type } hasDescription = { !!message.description } style = { styles }>
            { icons[message.type || 'info'] }

            <div>
                <strong> { message.title } </strong>

                { message.description &&
                    <p> { message.description } </p>
                }

            </div>

            <button
                type="button"
                onClick = { function() {
                    removeToast(message.id);
                }}
            >
                <FiXCircle size = { 18 } />
            </button>
        </Container>
    );
};

export default Toast;