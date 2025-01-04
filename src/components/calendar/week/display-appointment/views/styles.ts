import { styled } from '@mui/material/styles';

// Standard view
export const StandardViewContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100%',
});

export const ShortTimerViewWrapper = styled('div')({
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    display: 'inline-block',
    fontSize: '13px',
});

export const ShortLabelViewWrapper = styled('div')({
    whiteSpace: 'wrap',
    overflow: 'hidden',
    display: 'inline-block',
    fontSize: '13px',
});

// Interval view
export const IntervalViewContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
});

export const ShortTimerIntervalViewWrapper = styled('div')({
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    display: 'inline-block',
    fontSize: '9px',
});

export const ShortLabelIntervalViewWrapper = styled('div')({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'inline-block',
    maxWidth: '90px',
    fontSize: '10px',
});

// Zoom interval view
export const ZoomIntervalViewContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
});

export const ShortTimerZoomIntervalWrapper = styled('div')({
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'inline-block',
    maxWidth: '60px',
    fontSize: '9px',
});

export const ShortLabelZoomIntervalWrapper = styled('div')({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'inline-block',
    maxWidth: '90px',
    fontSize: '10px',
});
