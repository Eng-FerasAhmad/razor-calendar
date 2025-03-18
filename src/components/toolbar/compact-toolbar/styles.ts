import { darken } from '@mui/material';
import { styled, SxProps, Theme } from '@mui/material/styles';

interface Props {
    color?: string;
    backgroundColor?: string;
    today?: boolean;
}

export const ToolbarCompactContainer = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    color: theme.palette.text.primary,
    borderBottom: `1px solid ${theme.palette.borderLight}`,
    height: '60px',
    padding: '0 20px',
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '20px',
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

export const TodayButtonWrapper = styled('div', {
    shouldForwardProp: (prop) => prop !== 'today' && prop !== 'color',
})<Props>(({ theme, today }) => ({
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
    backgroundColor: today
        ? theme.palette.action.hover
        : theme.palette.primary.light,
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: today
            ? darken(theme.palette.action.hover, 0.2)
            : darken(theme.palette.primary.main, 0.2),
        color: theme.palette.common.white,
    },
}));

export const TitleCompactWrapper = styled('div')(() => ({
    fontSize: '18px',
    margin: 0,
}));

export const buttonStyles = (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    fontSize: '15px',
    height: '33px',
    padding: '0 40px',
    border: `1px solid ${theme.palette.borderLight}`,
    '&:hover': {
        backgroundColor: darken(theme.palette.action.hover, 0.1),
    },
});
