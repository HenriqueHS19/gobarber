import styled from 'styled-components';

export const Container = styled.div`
        width: 100%;
        background: #232129;
        border: 2px solid #232129;
        border-radius: 10px;
        padding: 16px;
        display: flex;
        align-items: center;

        & + div {
            margin-top: 8px;
        }

        svg {
            margin-right: 16px;
            color: #666360;
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


`;