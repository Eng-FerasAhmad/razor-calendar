import styled from 'styled-components';
import { color } from 'style/color';
import { darkenColor } from 'utils/colorConverter';

interface Props {
    color: string;
}

export const FullDayTitleWrapper = styled.div<{ color: string }>`
    padding: 0 5px;
    display: flex;
    gap: 2px;
    align-items: center;
    justify-content: flex-start;
    background-color: ${color.hover};
    box-sizing: border-box;
    border-radius: 2px;
    white-space: nowrap; /* Prevent text wrapping */
    overflow: hidden; /* Hide overflowing text */
    text-overflow: ellipsis; /* Show ellipsis when text overflows */
    font-size: 10px;
    color: ${color.fontPrimaryLight};
    margin: 0 1px;

    &:hover {
        cursor: pointer;
        background-color: ${darkenColor(color.hover, 40)};
    }
`;

export const FullDaysEventHeaderContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

export const FullDaysEventHeaderWrapper = styled.div`
    position: absolute;
    top: 0;
    height: 100%;
`;

export const PointWrapper = styled.div<Props>`
    height: 5px;
    width: 5px;
    min-height: 5px;
    min-width: 5px;
    background-color: ${(props) => props.color};
    border-radius: 50%;
`;

export const EventTitleWrapper = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    width: auto;
`;
