import styled from 'styled-components';

export const MonthContainer = styled.div`
    padding: 10px;
`;

export const MonthHeader = styled.div`
    margin-bottom: 10px;

    h3 {
        text-align: center;
        margin-bottom: 5px;
    }

    div {
        display: flex;
        border-bottom: 1px solid #ccc;
    }
`;

export const WeekRow = styled.div`
    display: flex;
    margin-bottom: 5px;
`;

export const WeekNumberCell = styled.div`
    width: 40px;
    text-align: center;
    font-weight: bold;
    background-color: #f9f9f9;
    border-right: 1px solid #ccc;
    line-height: 30px;
`;

export const DayCell = styled.div<{ isToday: boolean; isCurrentWeek: boolean }>`
    flex: 1;
    min-height: 100px;
    padding: 5px;
    border: 1px solid #ccc;
    background-color: ${(props) =>
        props.isToday
            ? '#d4edda'
            : props.isCurrentWeek
              ? '#f0f8ff'
              : '#ffffff'};

    span {
        font-weight: bold;
        display: block;
        margin-bottom: 5px;
    }
`;
