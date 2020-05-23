import React, { createContext, useContext, useCallback, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface AuthProps {
    user: object;
    signIn(credentials: SignInProps): Promise<void>;
    signOut(): void;
    loading: boolean;
}

interface AuthState {
    token: string;
    user: object;
}

interface SignInProps {
    email: string;
    password: string;
}

const AuthContext = createContext({} as AuthProps);

export const AuthProvider: React.FC = function ({ children }) {

    const [data, setData] = useState<AuthState>({} as AuthState);
    const [loading, setLoading] = useState(true);

    const loadStorage = useCallback(async function () {
        const token = await AsyncStorage.getItem('@GoBarber:token');
        const user = await AsyncStorage.getItem('@GoBarber:user');

        if (token && user) {
            const newData = {
                token,
                user: JSON.parse(user),
            }
            setData(newData);
        }

        setLoading(false);
    }, []);

    useEffect(function() {
        loadStorage();
    }, []);

    const signIn = useCallback(async function ({ email, password }: SignInProps): Promise<void> {
        const response = await api.post('session', {
            email,
            password,
        });

        const { token, user } = response.data;

        await AsyncStorage.multiSet([
            ['@GoBarber:token', token],
            ['@GoBarber:user', JSON.stringify(user)],
        ]);

        setData({ token, user });

    }, []);

    const signOut = useCallback(async function () {
        await AsyncStorage.multiRemove([
            '@GoBarber:token',
            '@GoBarber:user',
        ]);
        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthProps {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}