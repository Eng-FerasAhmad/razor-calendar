import { styled } from '@mui/material/styles';
import { commonSize } from 'calendar/_config/basicConfig';

interface Props {
    timSlotsCount?: number;
    intervalIndex?: number;
}

const calcColumnHeight = (props: Props): string => {
    const baseSlotHeight = commonSize.timeSlotHeight;

    // Define slot height adjustments based on interval index
    const slotHeight =
        props.intervalIndex === 3 || props.intervalIndex === 4 // 10 and 5 minutes case
            ? 20
            : baseSlotHeight - props.intervalIndex! * 10; // 1 and half hour & 15 min case

    const height = props.timSlotsCount! * slotHeight;
    return `${height}px`;
};

export const DaysColumnsContainer = styled('div', {
    shouldForwardProp: (prop) =>
        prop !== 'timSlotsCount' && prop !== 'intervalIndex',
})<Props>(({ theme, timSlotsCount, intervalIndex }) => ({
    flex: 1,
    position: 'relative',
    borderLeft: `1px solid ${theme.palette.divider}`,
    height: calcColumnHeight({ timSlotsCount, intervalIndex }),
}));
