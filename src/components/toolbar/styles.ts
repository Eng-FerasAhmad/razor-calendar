import { darken } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Props {
    color?: string;
    backgroundColor?: string;
}

export const ToolbarContainer = styled('div', {
    shouldForwardProp: (prop) => prop !== 'backgroundColor',
})<Props>(({ theme, backgroundColor }) => ({
    width: '100%',
    height: '54px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    boxSizing: 'border-box',
    backgroundColor: backgroundColor || theme.palette.background.paper,
}));

export const NavigationWrapper = styled('div')({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '10px',
});

export const ViewWrapper = styled('div')({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
});

export const NavigationIconsWrapper = styled('div', {
    shouldForwardProp: (prop) => prop !== 'color',
})<Props>(({ theme, color }) => ({
    width: '35px',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    borderRadius: '50%',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
    backgroundColor: 'transparent',
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: darken(color || theme.palette.action.hover, 0.3),
        color: theme.palette.common.white,
    },
}));

export const TitleWrapper = styled('div')(({ theme }) => ({
    color: theme.palette.common.white,
    fontSize: '18px',
    margin: 0,
}));
