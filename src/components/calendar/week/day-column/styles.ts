import styled from 'styled-components';

export const DayColumnContainer = styled.div`
    flex: 1;
    border-left: 1px solid #ccc;
    position: relative;
`;

export const DayHeader = styled.div`
    height: 30px;
    text-align: center;
    font-weight: bold;
    background-color: #f9f9f9;
    border-bottom: 1px solid #ddd;
    line-height: 30px;
`;

export const HourSlot = styled.div<{ isWorkingHour: boolean }>`
    height: 30px;
    background-color: ${(props) =>
        props.isWorkingHour ? '#ffffff' : '#f0f0f0'};
    border-bottom: 1px solid #ddd;
`;

export const EventSlot = styled.div`
    position: absolute;
    left: 5px;
    right: 5px;
    background-color: #007bff;
    color: #fff;
    padding: 2px 5px;
    border-radius: 4px;
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
