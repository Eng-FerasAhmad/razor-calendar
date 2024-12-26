import styled from 'styled-components';
import { color } from 'style/color';

export const MonthHeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-bottom: 1px solid ${color.border};
    background-color: #fff;
    position: sticky;
    top: 0;
    z-index: 10;
    color: ${color.fontPrimaryLight};
`;

export const ContentWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
`;

export const SpaceWrapper = styled.div`
    width: 41px;
`;

export const MonthWeekDaysWrapper = styled.div`
    flex: 1;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
`;
