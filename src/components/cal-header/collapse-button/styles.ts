import styled from 'styled-components';
import { color } from 'style/color';

export const CollapseButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const CollapseButtonIcon = styled.div`
    height: 24px;
    padding: 7px;
    margin-right: 5px;
    border-radius: 50%;

    &:hover {
        background-color: ${color.green.light};
        cursor: pointer;
    }
`;

export const CollapseButtonTitle = styled.span`
    font-size: 20px;
`;
