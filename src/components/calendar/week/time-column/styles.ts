import { styled } from '@mui/material/styles';
import { commonSize } from 'calendar/_config/basicConfig';
import { pixelToRem } from 'utils/common';

export const TimeSlotOffset = 10;

interface Props {
    workTime?: boolean;
    intervalIndex?: number;
}

export const TimeColumnContainer = styled('div')({
    width: '70px',
});

const calcTimeSlotHeight = (props: Props): string => {
    const offset = props.intervalIndex! * TimeSlotOffset;
    return pixelToRem(commonSize.timeSlotHeight - offset);
};

export const TimeLabelWrapper = styled('div', {
    shouldForwardProp: (prop) =>
        prop !== 'workTime' && prop !== 'intervalIndex',
})<Props>(({ theme, workTime, intervalIndex }) => ({
    height: calcTimeSlotHeight({ intervalIndex }),
    minHeight: '20px',
    borderTop: '1px solid transparent',
    width: '60px',
    margin: 'auto',
    paddingLeft: '5px',
    fontSize: '11px',
    backgroundColor: workTime
        ? theme.palette.workTime
        : theme.palette.outOfWork,
    color: theme.palette.text.secondary,
}));

export const TimeLabelTextWrapper = styled('span')({
    position: 'relative',
    top: '-14px',
});
