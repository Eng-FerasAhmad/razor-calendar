import styled from 'styled-components';
import { color } from 'style/color';

export const MoreEventsButtonWrapper = styled.div`
    font-size: 10px;
    white-space: nowrap;
    height: 22px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    padding: 0 10px;

    &:hover {
        cursor: pointer;
        background-color: ${color.hover};
        width: fit-content;
        margin: auto;
        border-radius: 10px;
        padding: 0 10px;
    }
`;

export const DraggableEventContainer = styled.div`
    color: #fff;
    padding: 2px 5px;
    border-radius: 2px;
    font-size: 10px;
    cursor: grab;

    &:hover {
        cursor: pointer;
    }

    &:active {
        cursor: grabbing;
        transform: scale(0.95);
    }
`;
