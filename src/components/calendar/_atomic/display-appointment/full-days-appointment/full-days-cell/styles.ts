import { darken, lighten } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';

interface Props {
    color: string;
}

interface FullDaysCellProps {
    width: number;
    left: number;
    fullWidth: boolean;
}

const calcBackgroundHoverColor = (props: Props, theme: Theme): string =>
    props.color
        ? lighten(props.color, 0.7)
        : darken(theme.palette.action.hover, 0.1);

const calcHoverColor = (props: Props, theme: Theme): string =>
    props.color
        ? lighten(props.color, 0.6)
        : darken(theme.palette.action.hover, 0.3);

export const FullDaysCellContainer = styled('div')<FullDaysCellProps>(
    ({ width, left, fullWidth }) => ({
        height: '23px',
        width: fullWidth ? `calc(100% - 2px)` : `calc(${width}% - 2px)`,
        left: `${left}%`,
        position: 'absolute',
    })
);

export const FullDayTitleWrapper = styled('div', {
    shouldForwardProp: (prop) => prop !== 'color',
})<Props>(({ theme, color }) => ({
    width: '100%',
    padding: '1px 5px',
    display: 'inline-block',
    backgroundColor: calcBackgroundHoverColor({ color }, theme),
    boxSizing: 'border-box',
    borderRadius: '2px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '12px',
    color: theme.palette.text.primary,
    margin: '0 1px',
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: calcHoverColor({ color }, theme),
    },
}));
