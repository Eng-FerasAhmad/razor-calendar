import styled from 'styled-components';
import { color } from 'style/color';
import { darkenColor } from 'utils/colorConverter';

interface ValueWrapperProps {
    isOpen: boolean;
    color: string;
}

export const SelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100px;
    position: relative;
`;

export const ValueWrapper = styled.div<ValueWrapperProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid
        ${({ isOpen, color }) => (isOpen ? darkenColor(color, 30) : '#ccc')};
    border-radius: 4px;
    padding: 7px 12px;
    cursor: pointer;
    font-size: 16px;
    transition: border-color 0.3s;
    background-color: transparent;
    border-color: ${(props) => darkenColor(props.color, 30)};
    color: #fff;
    box-sizing: border-box;
    &:hover {
        box-sizing: border-box;
        background-color: ${(props) => darkenColor(props.color, 10)};
    }
`;

export const IconWrapper = styled.div`
    font-size: 10px;
    margin-left: 8px;
    color: #888;
`;

export const OptionsWrapper = styled.ul`
    list-style: none;
    padding: 0;
    margin: 38px 0 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    max-height: 200px;
    overflow-y: auto;
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: absolute;
    width: 100%;
    z-index: 1000;
`;

export const OptionItem = styled.li`
    padding: 8px 12px;
    cursor: pointer;
    font-size: 16px;
    color: #595959;

    &:hover {
        background-color: ${color.hover};
    }
`;
