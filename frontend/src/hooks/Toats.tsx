import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

interface Toast {
    addToast(message: Omit<Messages, 'id'>): void;
    removeToast(id: string): void;
}

export interface Messages {
    id: string;
    type?: 'info' | 'success' | 'error';
    title: string;
    description?: string;
}

const ToastContext = createContext({} as Toast);

export const ToastProvider: React.FC = function ({ children }) {

    const [ messages, setMessages ] = useState<Messages[]>([]);

    const addToast = useCallback(function({ type, title, description }: Omit<Messages, 'id'>) {
        const id = uuid();

        const toast = {
            id,
            type,
            title,
            description,
        };

        setMessages(function(state) {
            return [...state, toast];
        });


    }, []);

    const removeToast = useCallback(function(id: string) {
        setMessages(function(state) {
            const newState = state.filter(function(message) {
                if (message.id !== id) {
                    return message;
                }
                return null;
            });

            return newState;
        });
    }, []);

    return (
        <ToastContext.Provider value = {{ addToast, removeToast }}>
            { children }
            <ToastContainer messages = { messages } />
        </ToastContext.Provider>
    );
};

export function useToast() {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used within an ToastProvider.');
    }

    return context;
}