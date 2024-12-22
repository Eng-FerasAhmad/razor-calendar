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

// view
export const ShortTimerViewWrapper = styled.div`
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    font-size: 13px;
`;

export const ShortLabelViewWrapper = styled.div`
    white-space: wrap;
    overflow: hidden;
    display: inline-block;
    font-size: 13px;
`;

// view1
export const ShortTimerView1Wrapper = styled.div`
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    font-size: 9px;
`;

export const ShortLabelView1Wrapper = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    max-width: 90px;
    font-size: 10px;
`;

// view 2
export const ShortTimerView2Wrapper = styled.div`
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    max-width: 60px;
    font-size: 9px;
`;

export const ShortLabelView2Wrapper = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    max-width: 90px;
    font-size: 10px;
`;
