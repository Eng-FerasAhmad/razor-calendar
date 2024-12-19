import styled from 'styled-components';

export const WeekContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const WeekHeaderRow = styled.div`
    display: flex;
    width: 100%;
    border-bottom: 1px solid #ccc;
    position: fixed;
`;

export const WeekDayHeaderWrapper = styled.div`
    flex: 1;
    text-align: center;
    font-weight: bold;
    background-color: #fff;
    padding: 0;
    &:first-child {
        border-left: none;
    }
`;

export const TimeDayWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

export const WidthSpaceWrapper = styled.div`
    width: 100px;
`;

export const DayShortNameWrapper = styled.div`
    font-size: 12px;
    font-weight: normal;
`;
export const DayNumberWrapper = styled.div`
    font-size: 26px;
    font-weight: normal;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 5px auto;
    &:hover {
        cursor: pointer;
        background-color: #e6e6e6;
    }
`;
