import { styled } from '@mui/material/styles';

export const CalendarToolbarContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    background: '#fff',
    width: '100%',
});
