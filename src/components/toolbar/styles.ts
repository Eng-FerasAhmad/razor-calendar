import styled from 'styled-components';
import { darkenColor } from 'utils/colorConverter';

interface Props {
    color?: string;
    backgroundColor?: string;
}

export const ToolbarContainer = styled.div<Props>`
    width: 100%;
    height: 54px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    background-color: ${(props) => props.backgroundColor};
`;

export const NavigationWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
`;

export const ViewWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`;

export const NavigationIconsWrapper = styled.div<Props>`
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 50%;
    transition:
        background-color 0.3s ease,
        border-color 0.3s ease;
    background-color: transparent;

    &:hover {
        cursor: pointer;
        background-color: ${(props) => darkenColor(props.color!, 30)};
        color: #fff;
    }
`;

export const TitleWrapper = styled.div`
    color: #fff;
    font-size: 18px;
    margin: 0;
`;
