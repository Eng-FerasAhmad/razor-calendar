import styled from 'styled-components';
import { color } from 'style/color';
import { darkenColor } from 'utils/colorConverter';

interface Props {
    color: string;
}

interface FullDaysCellProps {
    width: number;
    left: number;
}

const calcBackgroundHoverColor = (props: Props): string => {
    return props.color ? props.color : darkenColor(color.hover, 10);
};

const calcHoverColor = (props: Props): string => {
    return props.color
        ? darkenColor(props.color, 30)
        : darkenColor(color.hover, 30);
};

const calcFontColor = (props: Props): string => {
    return props.color ? '#fff' : color.fontPrimaryLight;
};

export const FullDaysCellContainer = styled.div<FullDaysCellProps>`
    height: 23px;
    width: ${(props) => `calc(${props.width}% - 2px)`};
    left: ${(props) => `${props.left}%`};
    position: absolute;
`;

export const FullDayTitleWrapper = styled.div<Props>`
    width: 100%;
    padding: 0 5px;
    display: inline-block;
    background-color: ${calcBackgroundHoverColor};
    box-sizing: border-box;
    border-radius: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 10px;
    color: ${calcFontColor};
    margin: 0 1px;

    &:hover {
        cursor: pointer;
        background-color: ${calcHoverColor};
    }
`;

export const ArrowWrapper = styled.div<{ position: 'left' | 'right' }>`
    display: flex;
    align-items: center;
    justify-content: ${({ position }) =>
        position === 'left' ? 'flex-start' : 'flex-end'};
    position: absolute;
    top: 50%;
    ${({ position }) => (position === 'left' ? 'left: 0;' : 'right: 0;')}
    transform: translateY(-50%);
    width: 15px; /* Adjust width as needed */
    height: 15px; /* Adjust height as needed */
    pointer-events: none;
`;
