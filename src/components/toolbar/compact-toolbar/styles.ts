import { darken } from '@mui/material';
import { styled } from '@mui/material/styles';

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
    paddingBottom: '10px',
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
