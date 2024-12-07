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
`;

export const WeekDayHeader = styled.div`
    flex: 1;
    text-align: center;
    font-weight: bold;
    padding: 10px 0;
    background-color: #f9f9f9;
    border-left: 1px solid #ccc;

    &:first-child {
        border-left: none;
    }
`;
