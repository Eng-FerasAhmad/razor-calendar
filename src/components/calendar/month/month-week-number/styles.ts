import styled from 'styled-components';
import { color } from 'style/color';

export const MonthWeekNumberContainer = styled.div`
    width: 40px;
    text-align: center;
    font-weight: bold;
    background-color: #fff;
    line-height: 30px;
    cursor: pointer;
    font-size: 12px;
    border-bottom: 1px solid ${color.border};
    color: ${color.fontPrimaryLight};

    &:hover {
        background-color: ${color.hover};
    }
`;
