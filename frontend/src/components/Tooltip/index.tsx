import React from 'react';

import { Container } from './styles';

interface TooltipProps {
    title: string;
    className?: string;
    background?: string;
    color?: string;
}

const Tooltip: React.FC<TooltipProps> = function({ title, className, background, color, children }) {
    return (
        <Container isBackground = { background } isColor = { color }>
            { children }
            <span> {title } </span>
        </Container>
    );
}

export default Tooltip;