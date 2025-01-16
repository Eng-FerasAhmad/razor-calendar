import { darken } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';

interface Props {
    color: string;
}

interface FullDaysCellProps {
    width: number;
    left: number;
}

const calcBackgroundHoverColor = (props: Props, theme: Theme): string =>
    props.color ? props.color : darken(theme.palette.action.hover, 0.1);

const calcHoverColor = (props: Props, theme: Theme): string =>
    props.color
        ? darken(props.color, 0.3)
        : darken(theme.palette.action.hover, 0.3);

const calcFontColor = (props: Props, theme: Theme): string =>
    props.color ? theme.palette.common.white : theme.palette.text.primary;

export const FullDaysCellContainer = styled('div')<FullDaysCellProps>(
    ({ width, left }) => ({
        height: '23px',
        width: `calc(${width}% - 2px)`,
        left: `${left}%`,
        position: 'absolute',
    })
);

export const FullDayTitleWrapper = styled('div', {
    shouldForwardProp: (prop) => prop !== 'color',
})<Props>(({ theme, color }) => ({
    width: '100%',
    padding: '0 5px',
    display: 'inline-block',
    backgroundColor: calcBackgroundHoverColor({ color }, theme),
    boxSizing: 'border-box',
    borderRadius: '2px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '10px',
    color: calcFontColor({ color }, theme),
    margin: '0 1px',
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: calcHoverColor({ color }, theme),
    },
}));
