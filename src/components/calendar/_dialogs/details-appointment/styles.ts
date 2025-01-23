import { darken } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DetailsContentContainer = styled('div')<{ color: string }>(
    ({ color }) => ({
        width: '100%',
        color,
        borderRadius: '10px',
    })
);

export const HeaderBox = styled('div')(({ theme, color }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: theme.spacing(1),
    padding: '5px 10px',
    backgroundColor: color || theme.palette.primary.light,
}));

export const IconWrapper = styled('div')(({ theme, color }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: '50%',
    transition: 'background-color 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: color
            ? darken(color, 0.1)
            : darken(theme.palette.primary.main, 0.1),
    },
}));

export const InfoBox = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary,
    fontSize: theme.typography.body2.fontSize,
}));

export const ReminderBox = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: '5px 20px',
}));

export const CalendarBox = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0px 20px 20px 20px',
    gap: theme.spacing(2),
}));

export const TitleBox = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '10px',
    color: theme.palette.text.primary,
    padding: '10px 20px',
}));

export const DateBox = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    gap: theme.spacing(1),
    padding: '10px 20px',
    color: theme.palette.text.primary,
}));

export const TextBox = styled('span')(({ theme }) => ({
    fontSize: '14px',
    color: theme.palette.text.secondary,
    width: '100%',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    gap: theme.spacing(1),
}));

export const TextBoxTitle = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    marginTop: '4px',
}));

export const TimeBoxTitle = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
}));
