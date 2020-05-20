import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import background from '../../assets/sign-in-background.png';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    /* Flex items herdem a altura do elemento pai */
    align-items: stretch;
`;

export const Content = styled.div`
    width: 100%;
    max-width: 700px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const animation = keyframes`
    from {
        opacity: 0;
        transform: translateX(-50px);
    }
    to {
        opacity: 1;
        transform: translateX(0px);
    }
`;

export const AnimationContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    animation: ${ animation } 1s;

    form {
        margin: 80px 0;
        width: 380px;
        text-align: center;

        h1 {
            margin-bottom: 25px;
        }

        a {
            text-decoration: none;
            color: #f4ede8;
            display: block;
            margin-top: 25px;
            transition: color .4s;

            &:hover {
                color: ${ shade(0.2, '#f4ede8') }
            }
        }
    }

    > a {
        text-decoration: none;
        color: #ff9000;
        display: block;
        margin-top: 25px;
        transition: color .4s;

        display: flex;
        align-items: center;

        svg {
            margin-right: 16px;
        }

        &:hover {
            color: ${ shade(0.2, '#ff9000') }
        }
    }
`;

export const Background = styled.div`
    flex: 1;
    background: url(${ background }) no-repeat center;
    background-size: cover;
`;

