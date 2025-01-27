import { styled } from '@mui/material/styles';
import { TimeSlotOffset } from 'calendar/_atomic/time-column/styles';
import { commonSize } from 'calendar/_config/basicConfig';
import { pixelToRem } from 'utils/common';

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
    shouldForwardProp: (prop) =>
        prop !== 'backgroundColor' &&
        prop !== 'isDragging' &&
        prop !== 'isOverlay',
})<AppointmentProps & { isDragging?: boolean; isOverlay?: boolean }>(
    ({ backgroundColor, isDragging, isOverlay }) => ({
        position: 'absolute',
        left: '1px',
        right: '1px',
        color: '#fff',
        paddingLeft: '6px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontSize: '12px',
        zIndex: 1,
        backgroundColor,
        border: isDragging && isOverlay ? `2px solid gray` : 'none',
        borderRadius: isDragging && isOverlay ? `5px` : '5px',
        '&:hover': {
            cursor: 'pointer',
        },
        '&:active': {
            cursor: 'grabbing',
        },
    })
);

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
            ? theme.palette.workTime
            : theme.palette.outOfWork,
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
            cursor: 'pointer',
        },
    })
);

export const DraggableZone = styled('div')`
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    cursor: move;
    z-index: 2; /* Ensure it's above other elements */
`;
