import styled from 'styled-components';
import { color } from 'style/color';
import { darkenColor } from 'utils/colorConverter';

interface Props {
    isToday: boolean;
    color: string;
}

interface FullDaysProps {
    fullDaysCount: number;
}

const calculateWidth = (props: FullDaysProps): string => {
    console.log('props.fullDaysCount', props.fullDaysCount);
    return props.fullDaysCount ? `${props.fullDaysCount * 23}px` : '100%';
};

export const WeekHeaderRowContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-bottom: 1px solid ${color.border};
    background-color: #fff;
    position: sticky;
    top: 0;
    z-index: 10;
`;

export const WeekHeaderDaysRowWrapper = styled.div`
    display: flex;
    width: 100%;
    padding-top: 10px;
`;

export const WeekHeaderFullDaysRowWrapper = styled.div<FullDaysProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${calculateWidth};
    width: 100%;
    margin: 2px 0;
`;

export const WidthSpaceWrapper = styled.div`
    width: 70px;
`;

export const GmtWrapper = styled.div`
    width: 75px;
    height: 100%;
    min-width: 70px;
    font-size: 12px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    color: ${color.fontPrimaryLight};
`;

export const DayShortNameWrapper = styled.div`
    font-size: 13px;
    font-weight: normal;
    color: ${color.fontPrimaryLight};
`;

export const DayNumberWrapper = styled.div<Props>`
    font-size: 20px;
    font-weight: normal;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 5px auto;
    background-color: ${(props) =>
        props.isToday ? props.color : 'transparent'};
    color: ${(props) => (props.isToday ? '#fff' : '')};
    &:hover {
        cursor: pointer;
        background-color: ${(props) =>
            props.isToday ? darkenColor(props.color!, 30) : color.hover};
    }
`;

export const WeekDayHeaderWrapper = styled.div`
    flex: 1;
    text-align: center;
    font-weight: bold;
    background-color: #fff;
    padding: 0;
`;
