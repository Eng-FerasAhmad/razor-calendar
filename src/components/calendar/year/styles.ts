import { darken, lighten } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Props {
    color: string;
    isToday?: boolean;
}

export const YearContainer = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    padding: '16px',
    justifyContent: 'center',

    '& > *': {
        flex: '1 1 calc(25% - 16px)', // 4 columns

        '@media (max-width: 1200px)': {
            flex: '1 1 calc(33.33% - 16px)', // 3 columns
        },
        '@media (max-width: 900px)': {
            flex: '1 1 calc(50% - 16px)', // 2 columns
        },
        '@media (max-width: 690px)': {
            flex: '1 1 100%', // 1 column
        },
    },
});

export const MonthContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #ddd',
    padding: '8px',
    borderRadius: '8px',
    background: '#fff',
    maxWidth: '300px',
});

export const MonthTitle = styled('div')(({ theme }) => ({
    fontSize: '16px',
    marginBottom: '8px',
    color: lighten(theme.palette.text.primary, 0.2),
}));

export const DaysGrid = styled('div')({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '4px',
    width: '100%',
});

export const DayBox = styled('div', {
    shouldForwardProp: (prop) => prop !== 'color' && prop !== 'isToday',
})<Props>(({ theme, color, isToday }) => ({
    borderRadius: '50%',
    padding: '5px',
    fontSize: '12px',
    width: '34px',
    height: '34px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    boxSizing: 'border-box',
    backgroundColor: isToday ? color : 'transparent',
    color: isToday ? '#fff' : theme.palette.text.primary,
    transition: 'background 0.2s',

    '&:hover': {
        cursor: 'pointer',
        backgroundColor: isToday
            ? darken(color, 0.3)
            : theme.palette.action.hover,
    },
}));

export const AppointmentDot = styled('div')<{ color: string }>(({ color }) => ({
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: color,
}));
