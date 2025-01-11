import { darken } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Props {
    color?: string;
    backgroundColor?: string;
}

export const ToolbarCompactContainer = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    color: theme.palette.text.primary,
}));

export const NavigationCompactWrapper = styled('div')({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '8px',
});

export const ViewCompactWrapper = styled('div')({
    width: '140px',
});

export const NavigationIconsCompactWrapper = styled('div', {
    shouldForwardProp: (prop) => prop !== 'color',
})<Props>(({ theme }) => ({
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
        backgroundColor: darken(theme.palette.action.hover, 0.1),
        color: theme.palette.common.white,
    },
}));

export const TitleCompactWrapper = styled('div')(() => ({
    fontSize: '18px',
    margin: 0,
}));
