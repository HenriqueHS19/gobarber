import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    width: 100%;
    height: 60px;
    background-color: #ff9000;
    border: 0;
    border-radius: 10px;
    margin-top: 8px;

    justify-content: center;
    align-items: center;
`;

export const TextButton = styled.Text`
    font-family: 'RobotoSlab-Medium'
    font-size: 18px;
    color: #312e38;
`;