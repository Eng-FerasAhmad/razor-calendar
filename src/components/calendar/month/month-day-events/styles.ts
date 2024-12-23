import styled from 'styled-components';

interface Props {
    color: string;
}

export const MonthEventContainer = styled.div<Props>`
    background-color: ${(props) => props.color};
    color: #fff;
    padding: 2px 5px;
    border-radius: 7px;
    font-size: 10px;
    height: 20px;
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
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

export const DraggableEventContainer = styled.div`
    color: #fff;
    padding: 2px 5px;
    border-radius: 7px;
    font-size: 10px;
    cursor: grab; /* Default draggable cursor */

    &:hover {
        cursor: pointer; /* Pointer cursor on hover */
    }

    &:active {
        cursor: grabbing; /* Hand cursor on active click */
        transform: scale(0.95); /* Example active style */
    }
`;
