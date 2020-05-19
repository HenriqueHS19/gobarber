import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface AuthInterface {
    user: object;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
};

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthState {
    token: string;
    user: object;
}

const AuthContext = createContext<AuthInterface>({} as AuthInterface);

export const AuthProvider: React.FC = function({ children }) {

    const [ data, setData ] = useState<AuthState>(function () {
        const token = localStorage.getItem('@GoBarber:token');
        const user = localStorage.getItem('@GoBarber:user');

        if (token && user) {
            const newData = {
                token,
                user: JSON.parse(user),
            }
            return newData;
        }

        return {} as AuthState;
    });

    const signIn = useCallback(async function({ email, password }): Promise<void> {
        const response = await api.post('session', {
            email,
            password,
        });

        const { token, user } = response.data;

        localStorage.setItem('@GoBarber:token', token);
        localStorage.setItem('@GoBarber:user', JSON.stringify(user));

        setData({ token, user });
    }, []);

    const signOut = useCallback(function() {
        localStorage.removeItem('@GoBarber:token');
        localStorage.removeItem('@GoBarber:user');

        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider value = {{ user: data.user, signIn, signOut }}>
            { children }
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthInterface {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider.');
    }

    return context;
}