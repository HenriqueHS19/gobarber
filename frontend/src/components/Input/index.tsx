import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = function({icon: Icon, ...rest}) {
    return(
        <Container>
            { Icon && <Icon size = {20} /> }
            <input { ...rest } autoComplete="off"/>
        </Container>
    );
}

export default Input;