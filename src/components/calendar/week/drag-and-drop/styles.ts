import { styled } from '@mui/material/styles';
import { commonSize } from 'calendar/_config/basicConfig';
import { pixelToRem } from 'utils/common';
import { TimeSlotOffset } from 'week/time-column/styles';

interface Props {
    workTime?: boolean;
    timSlotsCount?: number;
    isFullHour?: boolean;
    intervalIndex?: number;
    isFirstRow?: boolean;
    isLastRow?: boolean;
}

interface AppointmentProps {
    backgroundColor: string;
}

const calcTimeSlotHeight = (props: Props): string => {
    const offset = props.intervalIndex! * TimeSlotOffset;
    return pixelToRem(commonSize.timeSlotHeight - offset);
};

const calcBorder = (props: Props): string => {
    const currColor = props.isFullHour ? '#ddd' : '#f0f0f0';
    return !props.isFirstRow ? `1px solid ${currColor}` : 'none';
};

const calcBorderBottom = (props: Props): string => {
    return props.isLastRow ? `1px solid #ddd` : 'none';
};

export const AppointmentWrapper = styled('div', {
    shouldForwardProp: (prop) => prop !== 'backgroundColor',
})<AppointmentProps>(({ backgroundColor }) => ({
    position: 'absolute',
    left: '1px',
    right: '1px',
    color: '#fff',
    borderRadius: '4px',
    padding: '4px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: '12px',
    zIndex: 1,
    backgroundColor,
    '&:hover': {
        cursor: 'pointer',
    },
    '&:active': {
        cursor: 'grabbing',
    },
}));

export const DroppableSlotWrapper = styled('div', {
    shouldForwardProp: (prop) =>
        ![
            'workTime',
            'timSlotsCount',
            'isFullHour',
            'intervalIndex',
            'isFirstRow',
            'isLastRow',
        ].includes(prop.toString()),
})<Props>(
    ({
        theme,
        workTime,
        intervalIndex,
        isFirstRow,
        isLastRow,
        isFullHour,
    }) => ({
        height: calcTimeSlotHeight({ intervalIndex }),
        minHeight: pixelToRem(20),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTop: calcBorder({ isFirstRow, isFullHour }),
        borderBottom: calcBorderBottom({ isLastRow }),
        backgroundColor: workTime
            ? theme.palette.success.light // Example: use success for workTime
            : theme.palette.error.light, // Example: use error for outOfWork
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
            cursor: 'pointer',
        },
    })
);

export const PopupAreaWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});
