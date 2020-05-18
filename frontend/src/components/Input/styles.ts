import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface InputProps {
    isFocus: boolean;
    isFilled: boolean;
    isError: boolean;
}

export const Container = styled.div<InputProps>`
        width: 100%;
        background: #232129;
        color: #666360;
        border: 2px solid #232129;
        border-radius: 10px;
        padding: 16px;
        display: flex;
        align-items: center;
        transition: border-color .4s;

        & + div {
            margin-top: 8px;
        }

        > svg {
            margin-right: 16px;
            transition: color .4s;
        }

        input {
            flex: 1;
            background: transparent;
            color: #f4ede8;
            border: 0;

            &::placeholder {
                color: #666360;
            }
        }

        /* Error input validation */
        ${ props => props.isError && css`
            border-color: #c53030;
        `}

        /* Input focus */
        ${ props => props.isFocus && css`
            border-color: #ff9000;
            color: #ff9000;
        `}

        /* Input filled */
        ${ props => props.isFilled && css`
            color: #ff9000;
        `}
`;

export const Error = styled(Tooltip)`
    height: 20px;
    margin-left: 10px;

    svg {
        margin: 0;
    }
`