import { darken } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Props {
    isToday: boolean;
    color: string;
}

export const DayHeaderRowContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    position: 'sticky',
    top: 0,
    zIndex: 10,
}));

export const DayHeaderDaysRowWrapper = styled('div')({
    display: 'flex',
    width: '100%',
    paddingTop: '10px',
});

export const DayHeaderFullDaysRowWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    width: '100%',
    margin: '2px 0',
});

export const DayWidthSpaceWrapper = styled('div')({
    width: '70px',
});

export const DayGmtWrapper = styled('div')(({ theme }) => ({
    width: '75px',
    height: '100%',
    minWidth: '70px',
    fontSize: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: theme.palette.text.secondary,
}));

export const DayIconDownWrapper = styled('div', {
    shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>(({ theme, isOpen }) => ({
    fontSize: '10px',
    marginLeft: '8px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '50%',
    padding: '5px',
    justifyContent: 'space-between',
    transition: 'transform 0.3s ease',
    transform: `rotate(${isOpen ? '180deg' : '0deg'})`,
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: theme.palette.action.hover,
    },
}));

export const DayShortNameWrapper = styled('div')(({ theme }) => ({
    fontSize: '13px',
    fontWeight: 'normal',
    color: theme.palette.text.secondary,
}));

export const DayNumberWrapper = styled('div', {
    shouldForwardProp: (prop) => prop !== 'isToday' && prop !== 'color',
})<Props>(({ theme, isToday, color }) => ({
    fontSize: '19px',
    fontWeight: 'normal',
    width: '37px',
    height: '37px',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 5px auto',
    backgroundColor: isToday ? color : darken(theme.palette.action.hover, 0.1),
    color: isToday ? theme.palette.common.white : '',
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: isToday
            ? darken(color, 0.3)
            : darken(theme.palette.action.hover, 0.1),
    },
}));

export const DayHeaderWrapper = styled('div')(({ theme }) => ({
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: theme.palette.background.paper,
    padding: 0,
}));
