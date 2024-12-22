import styled from 'styled-components';

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

export const TimeDayWrapper = styled.div`
    display: flex;
    flex-direction: row;
    overflow-y: auto;
`;

export const WidthSpaceWrapper = styled.div`
    width: 80px;
`;

export const GmtWrapper = styled.div`
    width: 80px;
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
        background-color: #e6e6e6;
    }
`;
