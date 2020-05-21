import styled from 'styled-components/native';
import { Platform } from 'react-native';

function setPaddingForPlatform(): string {
    if (Platform.OS === 'android') {
        return '150px';
    }
    else {
        return '40px';
    }
}

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 30px;
    padding-bottom: ${ setPaddingForPlatform() };
`;

export const Title = styled.Text`
    font-size: 20px;
    color: #f4ede8;
    font-family: 'RobotoSlab-Medium';
    margin-top: 64px;
    margin-bottom: 24px;
`;

export const BtnBackLogon = styled.TouchableOpacity`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #312e38;
    border-top-width: 1px;
    border-top-color: #232129;
    padding: 16px 0;

    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const TxtBack = styled.Text`
    font-family: 'RobotoSlab-Regular';
    font-size: 18px;
    color: #fff;
    margin-left: 16px;
`;