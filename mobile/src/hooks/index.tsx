import React from 'react';

import { AuthProvider } from './Auth';

const AppProvider: React.FC = function({ children }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
};

export default AppProvider;