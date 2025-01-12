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
    width: 'fit-content',
});

export const NavigationIconsCompactWrapper = styled('div', {
    shouldForwardProp: (prop) => prop !== 'color',
})<Props>(({ theme }) => ({
    width: '34px',
    height: '34px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
    backgroundColor: theme.palette.action.hover,
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: darken(theme.palette.action.hover, 0.2),
        color: theme.palette.common.white,
    },
}));

export const TitleCompactWrapper = styled('div')(() => ({
    fontSize: '18px',
    margin: 0,
}));
