import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
    width: 100%;
    height: 60px;
    background: #ff9000;
    border: 0;
    border-radius: 10px;
    padding: 0 16px;
    color: #312e38;
    font-size: 20px;
    font-weight: 500;
    margin-top: 16px;
    transition: background-color .4s;

    &:hover {
        background: ${ shade(0.2, '#ff9000') };
    }
`;