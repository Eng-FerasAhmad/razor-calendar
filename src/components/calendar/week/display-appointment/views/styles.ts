import styled from 'styled-components';

// standard view:
export const StandardViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;
`;

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

// interval view:
export const IntervalViewContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    height: 100%;
`;

export const ShortTimerIntervalViewWrapper = styled.div`
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    font-size: 9px;
`;

export const ShortLabelIntervalViewWrapper = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    max-width: 90px;
    font-size: 10px;
`;

// zoom interval view:
export const ZoomIntervalViewContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    height: 100%;
`;

export const ShortTimerZoomIntervalWrapper = styled.div`
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    max-width: 60px;
    font-size: 9px;
`;

export const ShortLabelZoomIntervalWrapper = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    max-width: 90px;
    font-size: 10px;
`;
