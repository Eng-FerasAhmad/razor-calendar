import styled from 'styled-components';
import { color } from 'style/color';

export const CalHeaderContainer = styled.div`
    color: ${color.fontPrimaryDark};
    padding: 15px 20px;
    width: 100%;
    height: 64px;
    box-sizing: border-box;
    border-bottom: 1px solid ${color.borderLight};
    display: flex;
    justify-content: space-between;
`;

export const NavigatorWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    width: 100%;
    height: 100%;
`;

export const ProfileWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
`;

export const TaskCalendarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    border: 1px solid ${color.borderLight};
    margin: 0 15px;
    overflow: hidden;
`;

export const SearchHelpWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 15px;
    padding: 5px 0px;
`;
