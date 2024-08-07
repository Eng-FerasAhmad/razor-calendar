import { styled } from 'styled-components';
import { color } from 'style/color';

export const HelpContainer = styled.div`
    width: fit-content;
    height: 28px;
    margin: 0 5px;

    &:hover {
        cursor: pointer;
        color: ${color.green.primary};
    }
`;
