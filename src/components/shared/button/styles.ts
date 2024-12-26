import styled from 'styled-components';
import { darkenColor } from 'utils/colorConverter';

interface Props {
    color: string;
}

export const ButtonContainer = styled.button<Props>`
    display: inline-flex;
    align-items: center;
    height: 38px;
    justify-content: center;
    padding: 8px 16px;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 4px;
    border: 1px solid ${(props) => darkenColor(props.color, 30)};
    background-color: transparent;
    color: #ffffff;
    cursor: pointer;
    transition:
        background-color 0.3s ease,
        color 0.3s ease;

    &:hover {
        background-color: ${(props) => darkenColor(props.color, 30)};
    }

    &:disabled {
        background-color: #d6d6d6;
        cursor: not-allowed;
    }
`;
