import styled from 'styled-components';

export const FullDaysEventHeaderWrapper = styled.div`
    text-align: center;
    font-weight: bold;
    padding: 0;
`;

export const FullDaysEventHeaderContainer = styled.div`
    display: flex;
    width: 100%;
    font-size: 10px;
    color: #fff;
`;

export const FullDayTitleWrapper = styled.div<{ color: string }>`
    height: 18px;
    padding: 5px;
    background-color: ${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
`;

export const WeekDayHeaderWrapper = styled.div`
    flex: 1;
    text-align: center;
    font-weight: bold;
    background-color: #fff;
    padding: 0;
`;
