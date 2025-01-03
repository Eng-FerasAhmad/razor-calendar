import styled from 'styled-components';
import { color } from 'style/color';
import { darkenColor } from 'utils/colorConverter';

interface Props {
    color: string;
}

const calcHoverColor = (props: Props): string => {
    return props.color
        ? darkenColor(props.color, 30)
        : darkenColor(color.hover, 30);
};

const calcFontColor = (props: Props): string => {
    return props.color ? '#fff' : color.fontPrimaryLight;
};

export const FullDaysCellContainer = styled.div``;

export const FullDayTitleWrapper = styled.div<Props>`
    width: 100%;
    padding: 0 5px;
    display: inline-block;
    background-color: ${(props) => (props.color ? props.color : color.hover)};
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
