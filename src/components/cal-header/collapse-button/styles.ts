import styled from 'styled-components';
import { color } from 'style/color';

export const CollapseButtonContainer = styled.div`
    height: 24px;
    padding: 7px;
    border-radius: 50%;

    &:hover {
        background-color: ${color.borderLight};
        cursor: pointer;
    }
`;
