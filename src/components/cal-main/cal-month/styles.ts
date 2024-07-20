import styled from 'styled-components';
import { color } from 'style/color';

interface Props {
    isCurrentMonth: boolean;
    isToday?: boolean;
}

interface DayProps {
    isLastItem: boolean;
}

export const CalMonthContainer = styled.div`
    flex-grow: 9;
`;

export const WeekRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
`;

// CalMonthDays:
export const DaysRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    font-size: 12px;
`;

export const DayWrapper = styled.div<DayProps>`
    width: 100%;
    height: 155px;
    border-left: 1px solid ${color.borderLight};
    border-right: ${(props) =>
        props.isLastItem ? `1px solid ${color.borderLight}` : ''};
    border-bottom: 1px solid ${color.borderLight};
`;

export const DayContentHeadWrapper = styled.div<Props>`
    width: 25px;
    height: 25px;
    margin: 2px auto 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: ${(props) =>
        props.isCurrentMonth ? color.fontPrimaryDark : color.fontPrimaryLight};
    background-color: ${(props) => (props.isToday ? color.green.primary : '')};
    font-weight: ${(props) => (props.isToday ? 700 : 400)};
`;

export const DayContentContentWrapper = styled.div<Props>`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0 0 0 8px;
    color: ${(props) =>
        props.isCurrentMonth ? color.fontPrimaryDark : color.fontPrimaryLight};
`;

// CalMonthHeader:
export const CalMonthHeaderContainer = styled.div`
    font-size: 14px;
    color: #70757a !important;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

export const DayHeaderWrapper = styled.div<DayProps>`
    width: 100%;
    height: 15px;
    display: flex;
    border-left: 1px solid ${color.borderLight};
    border-right: ${(props) =>
        props.isLastItem ? `1px solid ${color.borderLight}` : ''};
    justify-content: center;
    padding-top: 5px;
`;
