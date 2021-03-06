import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
    isFocus: boolean;
    isFilled?: boolean;
    isError?: boolean;
}

export const Container = styled.View<ContainerProps>`
    width: 100%;
    height: 60px;
    padding: 0 16px;
    background: #232129;
    border: solid 2px #232129;
    border-radius: 10px;
    margin-bottom: 8px;
    flex-direction: row;
    align-items: center;

    ${ props => props.isError && css`
        border-color: #c53030;
    `}

    ${ props => props.isFocus && css`
        border-color: #ff9000
    `}
`;

export const Icon = styled(FeatherIcon)<ContainerProps>`
    margin-right: 16px;

    ${ props => props.isFocus && css`
        color: #ff9000
    `}

    ${ props => props.isFilled && css`
        color: #ff9000;
    `}
`;

export const TextInput = styled.TextInput`
    flex: 1;
    font-family: 'RobotoSlab-Regular';
    color: #fff;
    font-size: 16px;
`;