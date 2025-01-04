import { styled } from '@mui/material/styles';

export const MonthHeaderContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    position: 'sticky',
    top: 0,
    zIndex: 10,
    color: theme.palette.text.primary,
}));

export const ContentWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '50px',
});

export const SpaceWrapper = styled('div')({
    width: '41px',
});

export const MonthWeekDaysWrapper = styled('div')(({ theme }) => ({
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
    color: theme.palette.text.secondary,
}));
