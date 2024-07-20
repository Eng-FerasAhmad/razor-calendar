import { styled } from 'styled-components';
import { color } from 'style/color';

export const UserProfileContainer = styled.div`
    width: fit-content;
    height: fit-content;

    &:hover {
        cursor: pointer;
        color: ${color.green.dark};
    }
`;
