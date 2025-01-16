import { styled } from '@mui/material/styles';

export const DayContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
});

export const TimeDayWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    overflowY: 'auto',
    zIndex: 20,
});
