import styled from 'styled-components';

export const CalMonthContainer = styled.div`
    flex-grow: 9;
`;

export const WeekRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
`;

// CalMonthDays:
export const DaysRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    font-size: 12px;
`;

export const DayWrapper = styled.div`
    width: 100%;
    height: 155px;
`;

export const DayContentHeadWrapper = styled.div`
    width: fit-content;
    height: 25px;
    margin: auto;
`;

export const DayContentContentWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

// CalMonthHeader:
export const CalMonthHeaderContainer = styled.div`
    font-size: 14px;
    color: #70757a !important;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

export const DayHeaderWrapper = styled.div`
    width: auto;
    height: 30px;
`;
