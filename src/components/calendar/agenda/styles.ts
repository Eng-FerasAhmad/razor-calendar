import { styled } from '@mui/material/styles';

export const AgendaContainer = styled('div')({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    fontSize: '16px',
});

export const AgendaRowContainer = styled('div')({
    display: 'flex',
    width: '100%',
    borderBottom: '1px solid #ddd',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '8px',
    gap: '12px',
});

export const DateColumn = styled('div')({
    minWidth: '140px',
    textAlign: 'left',
    fontWeight: 'normal',
    fontSize: '16px',
});

export const DateText = styled('span')(({ theme }) => ({
    color: theme.palette.text.primary,
}));

export const EventColumn = styled('div')({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
});

export const EventList = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: '6px',
});

export const EventItemContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    borderRadius: '10px',
    padding: '0 5px',

    '&:hover': {
        cursor: 'pointer',
        backgroundColor: theme.palette.action.hover,
    },
}));

export const LeftSectionWrapper = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '12px',
});

export const RightSectionWrapper = styled('div')({
    '& > *': {
        '@media (max-width: 900px)': {
            display: 'none',
        },
    },
});

export const EventIndicator = styled('div')<{ color: string }>(({ color }) => ({
    width: '8px',
    minWidth: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: color,
}));

export const EventTime = styled('div')(({ theme }) => ({
    color: theme.palette.text.secondary,
    minWidth: '90px',
}));

export const EventTitle = styled('div')({
    flexGrow: 1,
});
