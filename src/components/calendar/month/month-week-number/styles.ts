import { styled } from '@mui/material/styles';

export const MonthWeekNumberContainer = styled('div')(({ theme }) => ({
    width: '40px',
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: theme.palette.background.paper,
    lineHeight: '30px',
    cursor: 'pointer',
    fontSize: '12px',
    borderBottom: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.primary,

    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));
