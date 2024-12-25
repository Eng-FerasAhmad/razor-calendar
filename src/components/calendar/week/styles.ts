import styled from 'styled-components';
import { darkenColor } from 'utils/colorConverter';

interface Props {
    isToday: boolean;
    primaryColor: string;
}

export const WeekContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

export const WeekHeaderRow = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    position: sticky;
    top: 0;
    z-index: 10;
`;

export const WeekHeaderDaysRow = styled.div`
    display: flex;
    width: 100%;
`;

export const WeekHeaderFullDaysRow = styled.div`
    display: flex;
    width: 100%;
`;

export const WeekDayHeaderWrapper = styled.div`
    flex: 1;
    text-align: center;
    font-weight: bold;
    background-color: #fff;
    padding: 0;
`;

export const FullDaysEventHeaderWrapper = styled.div`
    text-align: center;
    font-weight: bold;
    padding: 0;
`;

export const FullDaysEventHeaderContainer = styled.div`
    display: flex;
    width: 100%;
    font-size: 10px;
    color: #fff;
`;

export const FullDayTitleWrapper = styled.div<{ color: string }>`
    height: 18px;
    padding: 5px;
    background-color: ${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
`;

export const TimeDayWrapper = styled.div`
    display: flex;
    flex-direction: row;
    overflow-y: auto;
`;

export const WidthSpaceWrapper = styled.div`
    width: 80px;
`;

export const GmtWrapper = styled.div`
    width: 87px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const DayShortNameWrapper = styled.div`
    font-size: 12px;
    font-weight: normal;
`;

export const DayNumberWrapper = styled.div<Props>`
    font-size: 26px;
    font-weight: normal;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 5px auto;
    background-color: ${(props) =>
        props.isToday ? props.primaryColor : 'transparent'};
    color: ${(props) => (props.isToday ? '#fff' : '')};
    &:hover {
        cursor: pointer;
        background-color: ${(props) =>
            props.isToday ? darkenColor(props.primaryColor!, 30) : '#e0e0e0'};
    }
`;
