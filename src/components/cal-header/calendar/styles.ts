import { styled } from 'styled-components';
import { color } from 'style/color';

export const CalendarContainer = styled.div`
    height: 24px;
    width: 24px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        cursor: pointer;
        background-color: ${color.green.light};
    }
`;
