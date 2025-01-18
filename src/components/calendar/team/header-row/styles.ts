import { styled } from '@mui/material/styles';

export const TeamDayNumberWrapper = styled('div')({
    fontSize: '14px',
    fontWeight: 'normal',
    borderRadius: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 5px auto',
    gap: '4px',
});

export const TeamDayHeaderWrapper = styled('div')(({ theme }) => ({
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: theme.palette.background.paper,
    padding: 0,
}));
