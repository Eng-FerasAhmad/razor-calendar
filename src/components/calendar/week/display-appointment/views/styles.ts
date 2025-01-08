import { lighten } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';

const getBackgroundColor = (theme: Theme, color?: string): string => {
    const baseColor = color || theme.palette.primary.light;
    return lighten(baseColor, 0.8);
};

const getHoverColor = (theme: Theme, color?: string): string => {
    const baseColor = color || theme.palette.primary.light;
    return lighten(baseColor, 0.6);
};

// Standard view
export const StandardViewContainer = styled('div')<{
    color?: string;
}>(({ theme, color }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100%',
    fontSize: '12px',
    overflow: 'hidden',
    padding: 0,
    backgroundColor: getBackgroundColor(theme, color),
    color: theme.palette.text.primary,
    transition: 'opacity 0.2s ease',
    '&:hover': {
        backgroundColor: getHoverColor(theme, color),
    },
}));

export const ShortTimerViewWrapper = styled('div')({
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    height: '18px',
    minHeight: '18px',
    fontSize: '10px',
    fontWeight: 600,
    paddingLeft: '5px',
    paddingTop: '2px',
});

export const ShortLabelViewWrapper = styled('div')({
    whiteSpace: 'wrap',
    overflow: 'hidden',
    display: 'inline-block',
    fontSize: '13px',
    paddingLeft: '5px',
});

export const IntervalViewContainer = styled('div')<{
    color?: string;
}>(({ theme, color }) => ({
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    padding: 0,
    backgroundColor: getBackgroundColor(theme, color),
    color: theme.palette.text.primary,
    transition: 'opacity 0.2s ease',
    '&:hover': {
        backgroundColor: getHoverColor(theme, color),
    },
}));

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
export const ZoomIntervalViewContainer = styled('div')<{
    color?: string;
}>(({ theme, color }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    color: theme.palette.text.primary,
    backgroundColor: getBackgroundColor(theme, color),
    transition: 'opacity 0.2s ease',
    '&:hover': {
        backgroundColor: getHoverColor(theme, color),
    },
}));

export const ShortTimerZoomIntervalWrapper = styled('div')({
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'inline-block',
    maxWidth: '70px',
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
