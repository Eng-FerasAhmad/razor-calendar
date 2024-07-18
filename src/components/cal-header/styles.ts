import styled from 'styled-components';
import { color } from 'style/color';

export const CalHeaderContainer = styled.div`
    color: ${color.fontPrimaryDark};
    padding: 15px 20px;
    width: 100%;
    height: 64px;
    box-sizing: border-box;
    border-bottom: 1px solid ${color.borderLight};
    display: flex;
    justify-content: space-between;
`;

export const NavigatorWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    width: 100%;
    height: 100%;
`;
