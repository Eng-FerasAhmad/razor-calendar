import { styled } from 'styled-components';
import { color } from 'style/color';

interface Props {
    isTask: boolean;
}

export const CalTaskViewContainer = styled.div<Props>`
    height: 24px;
    width: 24px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => (props.isTask ? color.green.light : '')};

    &:hover {
        cursor: pointer;
        background-color: ${color.green.light};
    }
`;
