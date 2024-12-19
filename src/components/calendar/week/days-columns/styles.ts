import styled from 'styled-components';

interface Props {
    workTime: boolean;
}
export const DaysColumnsContainer = styled.div`
    flex: 1;
    position: relative;
    border-left: 1px solid #ccc;
`;

export const TimeSlotWrapper = styled.div<Props>`
    height: 30px;
    border-bottom: 1px solid #ddd;
    background-color: ${(props) => (props.workTime ? '#fff' : '#f0f0f0')};
`;
