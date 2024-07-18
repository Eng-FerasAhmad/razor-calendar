import { styled } from 'styled-components';
import { color } from 'style/color';

export const CalNavigatorContainer = styled.div`
    width: fit-content;
    height: fit-content;
    display: flex;
    justify-content: center;
    margin: 0 40px;
`;

export const TodayButtonWrapper = styled.div`
    border: 1px solid ${color.borderLight};
    border-radius: 5px;
    padding: 5px 15px;
    height: fit-content;
    margin: 0 10px;

    &:hover {
        background-color: ${color.borderLight};
        cursor: pointer;
    }
`;

export const CurrentDateWrapper = styled.div`
    margin-left: 15px;
    display: flex;
    align-items: center;
    font-size: 22px;
`;

export const LeftButtonWrapper = styled.div`
    margin: 0 8px;
    border-radius: 50%;
    padding: 8px;
    height: 18px;

    &:hover {
        background-color: ${color.borderLight};
        cursor: pointer;
    }
`;

export const RightButtonWrapper = styled.div`
    margin: 0 8px;
    border-radius: 50%;
    padding: 8px;
    height: 18px;

    &:hover {
        background-color: ${color.borderLight};
        cursor: pointer;
    }
`;
