import { styled } from '@mui/material/styles';
import { commonSize } from 'calendar/_config/basicConfig';

interface Props {
    timSlotsCount?: number;
    intervalIndex?: number;
}

const calcColumnHeight = (props: Props): string => {
    let offset = 0;
    let slotHeight = commonSize.timeSlotHeight;
    switch (props.intervalIndex) {
        case 0:
            offset = 24;
            break;
        case 1:
            offset = props.intervalIndex * 24 + 24;
            slotHeight = commonSize.timeSlotHeight - props.intervalIndex * 10;
            break;
        case 2:
            offset = props.intervalIndex * 36 + 24;
            slotHeight = commonSize.timeSlotHeight - props.intervalIndex * 10;
            break;
        case 3:
            offset = props.intervalIndex * 40 + 24;
            slotHeight = 20;
            break;
        case 4:
            offset = props.intervalIndex * 66 + 24;
            slotHeight = 20;
            break;
        default:
            offset = 0;
            break;
    }

    const height = props.timSlotsCount! * slotHeight + offset;
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
