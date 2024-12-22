import styled from 'styled-components';

export const DisplayAppointmentContainer = styled.div`
    position: absolute;
    left: 1px;
    right: 3px;
    color: #fff;
    border-radius: 2px;
    font-size: 12px;
    padding: 0 8px;
    box-sizing: border-box;
    overflow: hidden;
`;

export const TimerWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 20px;
`;

export const LabelWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
`;

export const FullViewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const FullViewOneHourWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 40px;
`;

export const ShortViewWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20px;
`;

export const ShortLabelWrapper = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    max-width: 100px;
    font-size: 11px;
    height: 20px;
`;

export const ShortTimerWrapper = styled.div`
    font-size: 10px;
    height: 20px;
    padding-top: 4px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
`;
