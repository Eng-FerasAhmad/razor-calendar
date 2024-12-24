import styled from 'styled-components';

interface Props {
    color: string;
}

export const MonthEventContainer = styled.div<Props>`
    font-size: 10px;
    white-space: nowrap;
    height: 24px;
    margin: 1px 0;
    padding: 1px 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
    cursor: grab; /* Default cursor for draggable events */
    user-select: none;

    &:hover {
        cursor: pointer; /* Changes to pointer on hover */
        background-color: #f0f0f0; /* Example hover style */
    }

    &:active {
        cursor: grabbing; /* Changes to grabbing when clicked */
        background-color: #e0e0e0; /* Example active style */
    }
`;

export const MoreEventButtonWrapper = styled.div`
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
        background-color: #e0e0e0;
        width: fit-content;
        margin: auto;
        border-radius: 10px;
        padding: 0 10px;
    }
`;

export const PointWrapper = styled.span<Props>`
    height: 7px;
    width: 7px;
    background-color: ${(props) => props.color};
    border-radius: 50%;
`;

export const DraggableEventContainer = styled.div`
    color: #fff;
    padding: 2px 5px;
    border-radius: 2px;
    font-size: 10px;
    cursor: grab; /* Default draggable cursor */

    &:hover {
        cursor: pointer; /* Pointer cursor on hover */
    }

    &:active {
        cursor: grabbing;
        transform: scale(0.95);
    }
`;
