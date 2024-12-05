import styled from 'styled-components';

export const TimeColumnContainer = styled.div`
    width: 120px;
    border-right: 1px solid #ccc;
`;

export const TimeColumnControls = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border-bottom: 1px solid #ddd;

    button {
        padding: 5px 10px;
        font-size: 12px;
    }
`;

export const TimeSlot = styled.div<{ isWorkingHour: boolean }>`
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) =>
        props.isWorkingHour ? '#ffffff' : '#f0f0f0'};
    border-bottom: 1px solid #ddd;
`;
