import React from 'react';
import { RouteProps, Route as RouteDOM, Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/Auth';

interface RoutesProps extends RouteProps {
    isPrivate?: boolean;
    component: React.ComponentType;
}

const Route: React.FC<RoutesProps> = function({ isPrivate = false, component: Component, ...rest }) {

    const { user } = useAuth();

    return(
        <RouteDOM
            {...rest}
            render = { function({ location }) {
                // rota privata e usuario autenticado
                if (isPrivate === !!user) {
                    return <Component />
                }
                else {
                    // rota autenticada e usuario não autenticado => login
                    // rota não autenticada => dashboard
                    let target = '/';
                    if (!isPrivate){
                        target = '/dashboard';
                    }

                    return <Redirect to = {{ pathname: target, state: { from: location } }} />
                }
            }}
        />
    );
};

export default Route;