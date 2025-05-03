import { Box, darken, lighten } from '@mui/material';
import { styled, SxProps, Theme } from '@mui/material/styles';
import { commonFontColor, inputHoverColor } from 'src/theme/theme';

interface Props {
    color?: string;
    backgroundColor?: string;
    today?: boolean;
}

export const ToolbarContainer = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    color: commonFontColor,
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

export const ViewWrapper = styled('div')({
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '15px',
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
        backgroundColor: darken(theme.palette.action.hover, 0.1),
        color: theme.palette.common.white,
    },
}));

export const DateIconsCompactWrapper = styled('div', {
    shouldForwardProp: (prop) => prop !== 'color',
})<Props>(({ theme }) => ({
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: darken(theme.palette.action.hover, 0.1),
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
        : lighten(theme.palette.warning.light, 0.6),
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: today
            ? darken(theme.palette.action.hover, 0.2)
            : lighten(theme.palette.warning.light, 0.4),
        color: theme.palette.common.white,
    },
}));

export const CalendarButtonWrapper = styled('div')(() => ({
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
    backgroundColor: '#ccc',
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: { inputHoverColor },
    },
}));

export const TitleCompactWrapper = styled('div')(() => ({
    fontSize: '17px',
    margin: 0,
}));

// staffer menu:
export const StaffDialogContentContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '440px',
    height: '450px',
    margin: '0 auto',
    gap: '5px',
});
export const chipBoxSx: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    fontSize: 16,
};
