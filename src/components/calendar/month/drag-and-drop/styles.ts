import { darken } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Props {
    color: string;
    isToday?: boolean;
}

export const DraggableEventContainer = styled('div', {
    shouldForwardProp: (prop) => prop !== 'color' && prop !== 'isToday',
})<Props>(({ theme }) => ({
    fontSize: '12px',
    whiteSpace: 'nowrap',
    height: '24px',
    margin: '2px',
    padding: '1px 3px 1px 5px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '4px',
    cursor: 'grab',
    userSelect: 'none',
    borderRadius: '6px',
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: theme.palette.action.hover,
    },
    '&:active': {
        cursor: 'grabbing',
    },
}));

export const PointWrapper = styled('span', {
    shouldForwardProp: (prop) => prop !== 'color',
})<Props>(({ color }) => ({
    height: '7px',
    width: '7px',
    minHeight: '7px',
    minWidth: '7px',
    backgroundColor: color,
    borderRadius: '50%',
    position: 'static',
    top: 0,
    left: 0,
    cursor: 'move',
    zIndex: 2,
}));

export const EventTitleWrapper = styled('div')(({ theme }) => ({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'inline-block',
    width: 'auto',
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
}));

export const EventStartWrapper = styled('span')({
    marginRight: '5px',
});

// Droppable
export const DroppableDayContainer = styled('div')(({ theme }) => ({
    flex: 1,
    minWidth: '50px',
    minHeight: '100px',
    padding: 0,
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    height: '130px',
}));

export const DayNumberContainer = styled('div')({
    height: '25px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
});

export const DayNumberButtonContainer = styled('div', {
    shouldForwardProp: (prop) => prop !== 'color' && prop !== 'isToday',
})<Props>(({ theme, color, isToday }) => ({
    borderRadius: '50%',
    padding: '5px',
    fontSize: '12px',
    width: '24px',
    height: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    backgroundColor: isToday ? color : 'transparent',
    color: isToday ? '#fff' : theme.palette.text.primary,
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: isToday
            ? darken(color, 0.3)
            : theme.palette.action.hover,
    },
}));
